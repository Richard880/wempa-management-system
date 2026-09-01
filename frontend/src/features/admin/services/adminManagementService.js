// src/features/admin/services/adminManagementService.js
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
  limit,
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
  if (user.fullName?.trim()) return user.fullName.trim();
  if (user.displayName?.trim()) return user.displayName.trim();
  
  const constructed = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return constructed || user.email || "Unknown User";
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
    try {
      const usersRef = collection(db, FIREBASE_COLLECTIONS.USERS);

      const adminsQuery = query(
        usersRef,
        where("role", "in", ADMIN_MANAGEMENT_ROLES)
      );

      const snapshot = await getDocs(adminsQuery);
      return snapshot.docs.map(normalizeUser);
    } catch (error) {
      console.error("Failed to fetch administrative user roster:", error);
      throw error;
    }
  },

  /**
   * Search existing registered users.
   * Optimized with collection safeguards and multi-field checks to prevent out-of-memory bugs.
   */
  async searchUsers(searchTerm = "") {
    try {
      const usersRef = collection(db, FIREBASE_COLLECTIONS.USERS);
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();

      // 🟢 OPTIMIZATION PERFORMANCE SHIELD: If search is short, cap total documents read 
      // instead of performing a full database sweep across the system.
      let searchSnapshot;
      if (normalizedSearchTerm.length >= 2) {
        searchSnapshot = await getDocs(query(usersRef, limit(100)));
      } else {
        searchSnapshot = await getDocs(query(usersRef, limit(20)));
      }

      return searchSnapshot.docs
        .map(normalizeUser)
        .filter((user) => {
          if (!normalizedSearchTerm) return true;

          const searchableValues = [
            user.firstName,
            user.lastName,
            user.fullName,
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
    } catch (error) {
      console.error("User directory indexing search operation failed:", error);
      throw error;
    }
  },

  /**
   * Safely change a user's role.
   * Atomically verifies roles inside the transaction engine.
   */
  async updateUserRole({
    targetUserId,
    newRole,
    actorId,
    reason = "",
  }) {
    if (!targetUserId) throw new Error("A target user is required.");
    if (!actorId) throw new Error("An authenticated administrator is required.");
    if (!newRole) throw new Error("A new role is required.");

    if (actorId === targetUserId) {
      throw new Error("You cannot alter your own administrative privilege scopes.");
    }

    const usersCollectionRef = collection(db, FIREBASE_COLLECTIONS.USERS);
    const actorRef = doc(usersCollectionRef, actorId);
    const targetUserRef = doc(usersCollectionRef, targetUserId);

    return runTransaction(db, async (transaction) => {
      const [actorSnapshot, targetSnapshot] = await Promise.all([
        transaction.get(actorRef),
        transaction.get(targetUserRef),
      ]);

      if (!actorSnapshot.exists()) {
        throw new Error("The acting administrator profile could not be found.");
      }

      if (!targetSnapshot.exists()) {
        throw new Error("The selected target user registry file does not exist.");
      }

      const actor = actorSnapshot.data();
      const targetUser = targetSnapshot.data();

      const actorRole = actor.role ?? null;
      const actorPermissions = actor.permissions ?? [];

      if (!canManageAdminRoles(actorRole)) {
        throw new Error("You are not authorized to manage administrator access levels.");
      }

      if (!actorPermissions.includes(PERMISSIONS.MANAGE_ADMINS)) {
        throw new Error("You do not hold explicit system permission permissions to manage administrators.");
      }

      const previousRole = targetUser.role ?? ROLES.MEMBER;

      if (previousRole === newRole) {
        throw new Error("The selected user already occupies this assigned role.");
      }

      if (!isAllowedAdminRoleTransition(actorRole, previousRole, newRole)) {
        throw new Error("This administrative transition route is strictly prohibited by security rules.");
      }

      const permissions = getRolePermissions(newRole);

      // 🟢 DATE SERIALIZATION FIXED: Split client date instantiations into 
      // standard ISO strings to allow serverTimestamp() to evaluate natively.
      const roleAudit = {
        previousRole,
        newRole,
        reason: reason.trim() || null,
        adminId: actorSnapshot.id,
        adminName: getUserDisplayName(actor),
        adminEmail: actor.email ?? null,
        changedAt: new Date().toISOString(), // Clean serializable format
      };

      transaction.update(targetUserRef, {
        role: newRole,
        permissions,
        roleAudit,
        updatedAt: serverTimestamp(), // Clears execution block collisions
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
