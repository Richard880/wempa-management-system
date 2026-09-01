// src/features/admin/services/adminMemberService.js
import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";
import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";
import MEMBERSHIP_STATUS from "../../../constants/membershipStatus";

/* ==========================================================================
   Collection Reference
   ========================================================================== */

const membersCollection = collection(db, FIREBASE_COLLECTIONS.MEMBERS);

/* ==========================================================================
   Validation Helpers (Hardened for Dynamic Audit Inputs)
   ========================================================================== */

function validateMembershipStatus(status) {
  const allowedStatuses = Object.values(MEMBERSHIP_STATUS);

  if (!allowedStatuses.includes(status)) {
    throw new Error(`Invalid membership status parameter: "${status}".`);
  }
}

function validateStatusChange(member, newStatus) {
  if (!member) {
    throw new Error("Member profile not discovered inside database snapshot registries.");
  }

  if (member.applicationStatus !== "approved") {
    throw new Error(
      "Only approved applications can have an active membership status assigned."
    );
  }

  if (member.membershipStatus === newStatus) {
    throw new Error(`The member profile status is already explicitly flagged as ${newStatus}.`);
  }
}

/**
 * 🟢 FIREFIGHTING AUTHCATCH FIX: Safe-guards against auth context packaging variations
 * Dynamically resolves admin parameters from flat rows or nested .currentUser properties
 */
function buildAdminAuditData(admin) {
  const adminUser = admin?.currentUser || admin || {};
  const activeUid = adminUser.uid || adminUser.id;

  if (!activeUid) {
    throw new Error(
      "Unable to identify the administrator performing this action. Missing secure user session token."
    );
  }

  return {
    changedBy: activeUid,
    changedByName:
      adminUser.displayName ||
      adminUser.fullName ||
      adminUser.name ||
      adminUser.email ||
      "System Administrator",
    changedByEmail: adminUser.email || null,
  };
}

function normalizeReason(reason) {
  return reason?.trim() || null;
}

/* ==========================================================================
   Admin Member Service Engine
   ========================================================================== */

const adminMemberService = {

  /* ==========================================
     Get Members List
     ========================================== */
  async getMembers(status = "all") {
    try {
      let membersQuery;

      if (status === "all") {
        membersQuery = query(
          membersCollection,
          where("applicationStatus", "==", "approved"),
          orderBy("updatedAt", "desc")
        );
      } else {
        validateMembershipStatus(status);

        membersQuery = query(
          membersCollection,
          where("applicationStatus", "==", "approved"),
          where("membershipStatus", "==", status),
          orderBy("updatedAt", "desc")
        );
      }

      const snapshot = await getDocs(membersQuery);

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    } catch (error) {
      console.error("Failed to fetch verified members roster:", error);
      throw error;
    }
  },

  /* ==========================================
     Get Single Member Profile
     ========================================== */
  async getMemberById(memberId) {
    try {
      if (!memberId) {
        throw new Error("Member ID is required.");
      }

      const memberRef = doc(db, FIREBASE_COLLECTIONS.MEMBERS, memberId);
      const snapshot = await getDoc(memberRef);

      if (!snapshot.exists()) {
        return null;
      }

      const member = snapshot.data();

      // Prevent applications that have not been approved from being treated as members
      if (member.applicationStatus !== "approved") {
        return null;
      }

      return {
        id: snapshot.id,
        ...member,
      };
    } catch (error) {
      console.error("Failed to fetch single member profile snap:", error);
      throw error;
    }
  },

  /* ==========================================
     Update Membership Status (Core Write Pipeline)
     ========================================== */
  async updateMembershipStatus(memberId, status, admin, reason) {
    try {
      if (!memberId) {
        throw new Error("Member ID is required.");
      }

      validateMembershipStatus(status);

      const memberRef = doc(db, FIREBASE_COLLECTIONS.MEMBERS, memberId);

      // Always read the latest member state before changing membership status
      const snapshot = await getDoc(memberRef);

      if (!snapshot.exists()) {
        throw new Error("Member record not found inside database registry.");
      }

      const member = snapshot.data();

      validateStatusChange(member, status);

      // Resolve the audit logs without dropping properties on structure changes
      const adminAudit = buildAdminAuditData(admin);
      const normalizedReason = normalizeReason(reason);

      await updateDoc(memberRef, {
        membershipStatus: status,
        membershipStatusAudit: {
          // 🟢 DEFENSIVE DEFAULTS: Fallback explicitly to active or clean placeholder states
          previousStatus: member.membershipStatus || MEMBERSHIP_STATUS.PENDING || "pending",
          newStatus: status,
          reason: normalizedReason,
          ...adminAudit,
          changedAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to execute membership status update transaction:", error);
      throw error;
    }
  },

  /* ==========================================
     Activate Member Status
     ========================================== */
  async activateMember(memberId, admin, reason) {
    return this.updateMembershipStatus(
      memberId,
      MEMBERSHIP_STATUS.ACTIVE || "active",
      admin,
      reason
    );
  },

  /* ==========================================
     Suspend Member Status
     ========================================== */
  async suspendMember(memberId, admin, reason) {
    return this.updateMembershipStatus(
      memberId,
      MEMBERSHIP_STATUS.SUSPENDED || "suspended",
      admin,
      reason
    );
  },

  /* ==========================================
     Deactivate Member Status
     ========================================== */
  async deactivateMember(memberId, admin, reason) {
    return this.updateMembershipStatus(
      memberId,
      MEMBERSHIP_STATUS.INACTIVE || "inactive",
      admin,
      reason
    );
  },
};

export default adminMemberService;
