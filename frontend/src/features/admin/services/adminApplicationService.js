// src/features/admin/services/adminApplicationService.js
import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  doc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

import { db } from "../../../firebase";
import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";

const applicationsCollection = collection(db, FIREBASE_COLLECTIONS.MEMBERS);

/* ==========================================================================
   Validation Helpers (Hardened with Payment Verifications)
   ========================================================================== */

const REVIEWABLE_STATUS = "submitted";

function validateApplicationDecision(application, decision) {
  if (!application) {
    throw new Error("Membership application not found.");
  }

  // 1. Ensure application is explicitly submitted
  if (application.applicationStatus !== REVIEWABLE_STATUS) {
    throw new Error(
      "This application has already been processed and cannot be reviewed again."
    );
  }

  // 2. 🟢 CRITICAL FINANCIAL GUARD: Stop approval transactions if payment is unverified
  if (decision === "approved") {
    const paymentNode = application.payment || {};
    if (paymentNode.paymentStatus !== "SUCCESS" && paymentNode.paymentStatus !== "VERIFIED") {
      throw new Error(
        `Cannot approve application. The associated M-Pesa transaction (${paymentNode.mpesaReceipt || "N/A"}) is currently pending verification.`
      );
    }
  }

  if (!["approved", "rejected"].includes(decision)) {
    throw new Error("Invalid application decision.");
  }
}

function buildReviewerData(admin) {
  // Check both direct attributes and inner context fields returned by customized hooks
  const adminUser = admin?.currentUser || admin || {};
  const activeUid = adminUser.uid || adminUser.id;

  if (!activeUid) {
    throw new Error(
      "Unable to identify the administrator performing this action. Ensure session token is active."
    );
  }

  return {
    reviewedBy: activeUid,
    reviewedByName:
      adminUser.displayName ||
      adminUser.fullName ||
      adminUser.name ||
      adminUser.email ||
      "Administrator",
    reviewedByEmail: adminUser.email || null,
  };
}

/* ==========================================================================
   Admin Application Service Engine
   ========================================================================== */

const adminApplicationService = {
  /* ==========================================
     Get Applications Roster
     ========================================== */
  async getApplications(status = "all") {
    try {
      let applicationsQuery;

      if (status === "all") {
        applicationsQuery = query(
          applicationsCollection,
          orderBy("updatedAt", "desc")
        );
      } else {
        applicationsQuery = query(
          applicationsCollection,
          where("applicationStatus", "==", status),
          orderBy("updatedAt", "desc")
        );
      }

      const snapshot = await getDocs(applicationsQuery);

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    } catch (error) {
      console.error("Failed to fetch membership applications roster:", error);
      throw error;
    }
  },

  /* ==========================================
     Get Single Application Record
     ========================================== */
  async getApplicationById(applicationId) {
    try {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      const applicationRef = doc(db, FIREBASE_COLLECTIONS.MEMBERS, applicationId);
      const snapshot = await getDoc(applicationRef);

      if (!snapshot.exists()) {
        return null;
      }

      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } catch (error) {
      console.error("Failed to fetch membership application snapshot:", error);
      throw error;
    }
  },

  /* ==========================================
     Approve Application Operation
     ========================================== */
  async approveApplication(applicationId, admin) {
    try {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      const applicationRef = doc(db, FIREBASE_COLLECTIONS.MEMBERS, applicationId);
      const reviewer = buildReviewerData(admin);

      await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(applicationRef);

        if (!snapshot.exists()) {
          throw new Error("Membership application not found.");
        }

        const application = snapshot.data();

        // Evaluates application status and confirms M-Pesa clearance before proceeding
        validateApplicationDecision(application, "approved");

        transaction.update(applicationRef, {
          applicationStatus: "approved",
          review: {
            status: "approved",
            ...reviewer,
            reviewedAt: serverTimestamp(),
            rejectionReason: null,
          },
          approvedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
    } catch (error) {
      console.error("Failed to execute application approval transaction:", error);
      throw error;
    }
  },

  /* ==========================================
     Reject Application Operation
     ========================================== */
  async rejectApplication(applicationId, admin, rejectionReason) {
    try {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      const normalizedReason = rejectionReason?.trim();
      if (!normalizedReason) {
        throw new Error("A rejection reason is required.");
      }

      const applicationRef = doc(db, FIREBASE_COLLECTIONS.MEMBERS, applicationId);
      const reviewer = buildReviewerData(admin);

      await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(applicationRef);

        if (!snapshot.exists()) {
          throw new Error("Membership application not found.");
        }

        const application = snapshot.data();

        validateApplicationDecision(application, "rejected");

        transaction.update(applicationRef, {
          applicationStatus: "rejected",
          review: {
            status: "rejected",
            ...reviewer,
            reviewedAt: serverTimestamp(),
            rejectionReason: normalizedReason,
          },
          rejectedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
    } catch (error) {
      console.error("Failed to execute application rejection transaction:", error);
      throw error;
    }
  },
};

export default adminApplicationService;
