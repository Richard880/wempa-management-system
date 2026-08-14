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


/* ==========================================
   Collection Reference
========================================== */

const membersCollection = collection(
  db,
  FIREBASE_COLLECTIONS.MEMBERS
);


/* ==========================================
   Validation Helpers
========================================== */

function validateMembershipStatus(status) {
  const allowedStatuses = Object.values(
    MEMBERSHIP_STATUS
  );

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      "Invalid membership status."
    );
  }
}


function validateStatusChange(
  member,
  newStatus
) {
  if (!member) {
    throw new Error(
      "Member not found."
    );
  }

  if (
    member.applicationStatus !== "approved"
  ) {
    throw new Error(
      "Only approved applications can have a membership status."
    );
  }

  if (
    member.membershipStatus === newStatus
  ) {
    throw new Error(
      `The member is already ${newStatus}.`
    );
  }
}


function buildAdminAuditData(admin) {
  if (!admin?.uid) {
    throw new Error(
      "Unable to identify the administrator performing this action."
    );
  }

  return {
    changedBy: admin.uid,

    changedByName:
      admin.displayName ||
      admin.name ||
      admin.email ||
      "Administrator",

    changedByEmail:
      admin.email || null,
  };
}


function normalizeReason(reason) {
  return reason?.trim() || null;
}


/* ==========================================
   Admin Member Service
========================================== */

const adminMemberService = {

  /* ==========================================
     Get Members
  ========================================== */

  async getMembers(status = "all") {
    try {
      let membersQuery;

      if (status === "all") {
        membersQuery = query(
          membersCollection,
          where(
            "applicationStatus",
            "==",
            "approved"
          ),
          orderBy("updatedAt", "desc")
        );
      } else {
        validateMembershipStatus(status);

        membersQuery = query(
          membersCollection,
          where(
            "applicationStatus",
            "==",
            "approved"
          ),
          where(
            "membershipStatus",
            "==",
            status
          ),
          orderBy("updatedAt", "desc")
        );
      }

      const snapshot = await getDocs(
        membersQuery
      );

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    } catch (error) {
      console.error(
        "Failed to fetch members:",
        error
      );

      throw error;
    }
  },


  /* ==========================================
     Get Single Member
  ========================================== */

  async getMemberById(memberId) {
    try {
      if (!memberId) {
        throw new Error(
          "Member ID is required."
        );
      }

      const memberRef = doc(
        db,
        FIREBASE_COLLECTIONS.MEMBERS,
        memberId
      );

      const snapshot = await getDoc(
        memberRef
      );

      if (!snapshot.exists()) {
        return null;
      }

      const member = snapshot.data();

      /*
       * Prevent applications that have not been
       * approved from being treated as members.
       */
      if (
        member.applicationStatus !== "approved"
      ) {
        return null;
      }

      return {
        id: snapshot.id,
        ...member,
      };
    } catch (error) {
      console.error(
        "Failed to fetch member:",
        error
      );

      throw error;
    }
  },


  /* ==========================================
     Update Membership Status
  ========================================== */

  async updateMembershipStatus(
    memberId,
    status,
    admin,
    reason
  ) {
    try {
      if (!memberId) {
        throw new Error(
          "Member ID is required."
        );
      }

      validateMembershipStatus(status);

      const memberRef = doc(
        db,
        FIREBASE_COLLECTIONS.MEMBERS,
        memberId
      );

      /*
       * Always read the latest member state
       * before changing membership status.
       */
      const snapshot = await getDoc(
        memberRef
      );

      if (!snapshot.exists()) {
        throw new Error(
          "Member not found."
        );
      }

      const member = snapshot.data();

      validateStatusChange(
        member,
        status
      );

      const adminAudit =
        buildAdminAuditData(admin);

      const normalizedReason =
        normalizeReason(reason);

      await updateDoc(memberRef, {
        membershipStatus: status,

        membershipStatusAudit: {
          previousStatus:
            member.membershipStatus || null,

          newStatus: status,

          reason: normalizedReason,

          ...adminAudit,

          changedAt: serverTimestamp(),
        },

        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(
        "Failed to update membership status:",
        error
      );

      throw error;
    }
  },


  /* ==========================================
     Activate Member
  ========================================== */

  async activateMember(
    memberId,
    admin,
    reason
  ) {
    return this.updateMembershipStatus(
      memberId,
      MEMBERSHIP_STATUS.ACTIVE,
      admin,
      reason
    );
  },


  /* ==========================================
     Suspend Member
  ========================================== */

  async suspendMember(
    memberId,
    admin,
    reason
  ) {
    return this.updateMembershipStatus(
      memberId,
      MEMBERSHIP_STATUS.SUSPENDED,
      admin,
      reason
    );
  },


  /* ==========================================
     Deactivate Member
  ========================================== */

  async deactivateMember(
    memberId,
    admin,
    reason
  ) {
    return this.updateMembershipStatus(
      memberId,
      MEMBERSHIP_STATUS.INACTIVE,
      admin,
      reason
    );
  },
};


export default adminMemberService;