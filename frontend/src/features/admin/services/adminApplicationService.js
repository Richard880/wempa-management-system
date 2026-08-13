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


const applicationsCollection = collection(
  db,
  FIREBASE_COLLECTIONS.MEMBERS
);


/* ==========================================
   Validation Helpers
   ========================================== */

const REVIEWABLE_STATUS = "submitted";


function validateApplicationDecision(
  application,
  decision
) {
  if (!application) {
    throw new Error("Membership application not found.");
  }

  if (application.applicationStatus !== REVIEWABLE_STATUS) {
    throw new Error(
      "This application has already been processed and cannot be reviewed again."
    );
  }

  if (!["approved", "rejected"].includes(decision)) {
    throw new Error("Invalid application decision.");
  }
}


function buildReviewerData(admin) {
  if (!admin?.uid) {
    throw new Error(
      "Unable to identify the administrator performing this action."
    );
  }

  return {
    reviewedBy: admin.uid,

    reviewedByName:
      admin.displayName ||
      admin.name ||
      admin.email ||
      "Administrator",

    reviewedByEmail:
      admin.email || null,
  };
}


/* ==========================================
   Admin Application Service
   ========================================== */

const adminApplicationService = {
  /* ==========================================
     Get Applications
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
          where(
            "applicationStatus",
            "==",
            status
          ),
          orderBy("updatedAt", "desc")
        );
      }

      const snapshot =
        await getDocs(applicationsQuery);

      return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    } catch (error) {
      console.error(
        "Failed to fetch membership applications:",
        error
      );

      throw error;
    }
  },


  /* ==========================================
     Get Single Application
     ========================================== */

  async getApplicationById(applicationId) {
    try {
      if (!applicationId) {
        throw new Error(
          "Application ID is required."
        );
      }

      const applicationRef = doc(
        db,
        FIREBASE_COLLECTIONS.MEMBERS,
        applicationId
      );

      const snapshot =
        await getDoc(applicationRef);

      if (!snapshot.exists()) {
        return null;
      }

      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } catch (error) {
      console.error(
        "Failed to fetch membership application:",
        error
      );

      throw error;
    }
  },


  /* ==========================================
     Approve Application
     ========================================== */

  async approveApplication(
  applicationId,
  admin
) {
  try {
    if (!applicationId) {
      throw new Error(
        "Application ID is required."
      );
    }

    const applicationRef = doc(
      db,
      FIREBASE_COLLECTIONS.MEMBERS,
      applicationId
    );

    const reviewer =
      buildReviewerData(admin);

    await runTransaction(
      db,
      async (transaction) => {
        const snapshot =
          await transaction.get(applicationRef);

        if (!snapshot.exists()) {
          throw new Error(
            "Membership application not found."
          );
        }

        const application = snapshot.data();

        validateApplicationDecision(
          application,
          "approved"
        );

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
      }
    );
  } catch (error) {
    console.error(
      "Failed to approve membership application:",
      error
    );

    throw error;
  }
},

  /* ==========================================
     Reject Application
     ========================================== */

  async rejectApplication(
  applicationId,
  admin,
  rejectionReason
) {
  try {
    if (!applicationId) {
      throw new Error(
        "Application ID is required."
      );
    }

    const normalizedReason =
      rejectionReason?.trim();

    if (!normalizedReason) {
      throw new Error(
        "A rejection reason is required."
      );
    }

    const applicationRef = doc(
      db,
      FIREBASE_COLLECTIONS.MEMBERS,
      applicationId
    );

    const reviewer =
      buildReviewerData(admin);

    await runTransaction(
      db,
      async (transaction) => {
        const snapshot =
          await transaction.get(applicationRef);

        if (!snapshot.exists()) {
          throw new Error(
            "Membership application not found."
          );
        }

        const application = snapshot.data();

        validateApplicationDecision(
          application,
          "rejected"
        );

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
      }
    );
  } catch (error) {
    console.error(
      "Failed to reject membership application:",
      error
    );

    throw error;
  }
},
};


export default adminApplicationService;