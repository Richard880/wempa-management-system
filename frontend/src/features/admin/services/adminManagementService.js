import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../../../firebase";
import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";
import ROLES from "../../../constants/roles";
import PERMISSIONS from "../../../constants/permissions";

import { getRolePermissions } from "../../auth/utils/rolePermissions";

import {
  ADMIN_MANAGEMENT_ROLES,
  canManageAdminRoles,
  isAllowedAdminRoleTransition,
} from "../shared/utils/adminRoleConfig";

const getUserDisplayName = (user = {}) => {
  return (
    user.displayName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.email ||
    "Unknown User"
  );
};

const normalizeUser = (documentSnapshot) => ({
  id: documentSnapshot.id,
  ...documentSnapshot.data(),
});

const adminManagementService = {
  /**
   * Get all users who currently have an administrative role.
   */
  async getAdmins() {
    const usersRef = collection(db, FIREBASE_COLLECTIONS.USERS);

    const adminsQuery = query(
      usersRef,
      where("role", "in", ADMIN_MANAGEMENT_ROLES)
    );

    const snapshot = await getDocs(adminsQuery);

    return snapshot.docs.map(normalizeUser);
  },

  /**
   * Search existing registered users.
   *
   * Current implementation performs filtering after retrieving
   * user documents. This keeps search flexible across multiple
   * fields without assuming additional Firestore indexes.
   */
  async searchUsers(searchTerm = "") {
    const usersRef = collection(db, FIREBASE_COLLECTIONS.USERS);
    const snapshot = await getDocs(usersRef);

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return snapshot.docs
      .map(normalizeUser)
      .filter((user) => {
        if (!normalizedSearchTerm) {
          return true;
        }

        const searchableValues = [
          user.firstName,
          user.lastName,
          user.displayName,
          user.email,
          user.membershipNumber,
        ];

        return searchableValues.some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(normalizedSearchTerm)
        );
      });
  },

  /**
   * Safely change a user's role.
   *
   * Authorization is revalidated against Firestore inside
   * the transaction instead of trusting the frontend state.
   */
  async updateUserRole({
    targetUserId,
    newRole,
    actorId,
    reason = "",
  }) {
    if (!targetUserId) {
      throw new Error("A target user is required.");
    }

    if (!actorId) {
      throw new Error("An authenticated administrator is required.");
    }

    if (!newRole) {
      throw new Error("A new role is required.");
    }

    if (actorId === targetUserId) {
      throw new Error(
        "You cannot change your own administrator role."
      );
    }

    const usersCollectionRef = collection(
      db,
      FIREBASE_COLLECTIONS.USERS
    );

    const actorRef = doc(
      usersCollectionRef,
      actorId
    );

    const targetUserRef = doc(
      usersCollectionRef,
      targetUserId
    );

    return runTransaction(db, async (transaction) => {
      /**
       * Read the actor and target inside the transaction so that
       * authorization and role data are based on current Firestore
       * values rather than potentially stale frontend state.
       */
      const [actorSnapshot, targetSnapshot] = await Promise.all([
        transaction.get(actorRef),
        transaction.get(targetUserRef),
      ]);

      if (!actorSnapshot.exists()) {
        throw new Error(
          "The acting administrator profile could not be found."
        );
      }

      if (!targetSnapshot.exists()) {
        throw new Error(
          "The selected user does not exist."
        );
      }

      const actor = actorSnapshot.data();
      const targetUser = targetSnapshot.data();

      const actorRole = actor.role ?? null;
      const actorPermissions = actor.permissions ?? [];

      /**
       * Validate the actor's current role.
       */
      if (!canManageAdminRoles(actorRole)) {
        throw new Error(
          "You are not authorized to manage administrator access."
        );
      }

      /**
       * Validate the actor's current permissions.
       */
      if (!actorPermissions.includes(PERMISSIONS.MANAGE_ADMINS)) {
        throw new Error(
          "You do not have permission to manage administrator access."
        );
      }

      const previousRole = targetUser.role ?? ROLES.MEMBER;

      if (previousRole === newRole) {
        throw new Error(
          "The selected user already has this role."
        );
      }

      /**
       * Validate the requested role transition using the centralized
       * Admin Management role configuration.
       */
      if (
        !isAllowedAdminRoleTransition(
          actorRole,
          previousRole,
          newRole
        )
      ) {
        throw new Error(
          "This role transition is not allowed."
        );
      }

      /**
       * Permissions are always synchronized with the new role from
       * the centralized role-permission configuration.
       */
      const permissions = getRolePermissions(newRole);

      const roleAudit = {
        previousRole,
        newRole,
        reason: reason.trim() || null,

        adminId: actorSnapshot.id,
        adminName: getUserDisplayName(actor),
        adminEmail: actor.email ?? null,

        changedAt: new Date(),
      };

      /**
       * Update the target user's authorization data and latest audit
       * record atomically.
       */
      transaction.update(targetUserRef, {
        role: newRole,
        permissions,
        roleAudit,
        updatedAt: serverTimestamp(),
      });

      return {
        id: targetSnapshot.id,
        ...targetUser,
        role: newRole,
        permissions,
        roleAudit,
      };
    });
  },
};

export default adminManagementService;