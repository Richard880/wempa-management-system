// src/features/members/services/applicationService.js

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";
import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";
import { calculateProgress } from "../utils/applicationHelpers";

const getUserRef = (uid) =>
  doc(db, FIREBASE_COLLECTIONS.USERS, uid);

const getMemberRef = (uid) =>
  doc(db, FIREBASE_COLLECTIONS.MEMBERS, uid);

/**
 * Default registration schema blueprint infrastructure
 */
const createDefaultApplication = () => ({
  currentStep: 1,
  profileCompletion: 0,
  completedSections: [],
  applicationStatus: "draft",
  isLocked: false,
  personal: {},
  contact: {},
  employment: {}, // 🟢 RESTORED: Aligns database schema layout models perfectly
  documents: {},
  declaration: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const applicationService = {
  /**
   * Fetches the user profile and member application snapshots simultaneously.
   * Dynamically spawns a clean default document blueprint if no record is found.
   */
  async getApplication(uid) {
    const userRef = getUserRef(uid);
    const memberRef = getMemberRef(uid);

    const [userSnapshot, memberSnapshot] = await Promise.all([
      getDoc(userRef),
      getDoc(memberRef),
    ]);

    if (!userSnapshot.exists()) {
      throw new Error("User profile not found.");
    }

    const profile = {
      id: userSnapshot.id,
      ...userSnapshot.data()
    };

    if (!memberSnapshot.exists()) {
      const applicationData = createDefaultApplication();
      await setDoc(memberRef, {
        ...applicationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return { 
        profile, 
        application: { id: memberSnapshot.id, ...applicationData } 
      };
    }

    return {
      profile,
      application: {
        id: memberSnapshot.id,
        ...memberSnapshot.data()
      },
    };
  },

  /**
   * 🟢 TRANSACTIONAL SAVE PIPE SECURED
   * Commits the current step's payload data parameters to Firestore, updates completedSections,
   * and computes progress metrics up to a clean 100% cap.
   */
  async saveSection({ uid, section, data, currentStep }) {
    const memberRef = getMemberRef(uid);

    // Sanitize input properties to prevent Firestore from rejecting undefined values
    const sanitizedData = JSON.parse(JSON.stringify(data, (_, value) => 
      value === undefined ? null : value
    ));

    return runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(memberRef);

      if (!snapshot.exists()) {
        throw new Error("Membership application not found.");
      }

      const application = snapshot.data();

      // Guard check: Prevent subsequent saves if the application file is locked down
      if (application.isLocked) {
        throw new Error("Application is locked and cannot be edited.");
      }

      const completedSections = application.completedSections || [];
      const updatedSections = [...new Set([...completedSections, section])];
      
      // Compute progress metrics using the updated weights helper file
      let profileCompletion = calculateProgress(updatedSections);

      // 🟢 HARDENED COMPLETION BOUNDS FIXED: If all 6 distinct workflow phases are tracked,
      // override any decimal anomalies to log a perfect 100% progress score to the server.
      if (updatedSections.length >= 6) {
        profileCompletion = 100;
      }

      transaction.update(memberRef, {
        [section]: sanitizedData,
        completedSections: updatedSections,
        profileCompletion,
        currentStep,
        updatedAt: serverTimestamp(),
      });

      return {
        completedSections: updatedSections,
        profileCompletion,
      };
    });
  },

  /**
   * FINAL ACCESS SUBMISSION LOCK
   * Changes status keys to submitted and activates the isLocked boolean guard
   */
  async submitApplication(uid) {
    const memberRef = getMemberRef(uid);

    await updateDoc(memberRef, {
      applicationStatus: "submitted",
      isLocked: true, 
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Static fallback wizard page selector index writer
   */
  async updateCurrentStep(uid, currentStep) {
    const memberRef = getMemberRef(uid);
    
    const snapshot = await getDoc(memberRef);
    if (snapshot.exists() && snapshot.data().isLocked) return;

    await updateDoc(memberRef, {
      currentStep,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Global state index status modifier
   */
  async updateApplicationStatus(uid, status) {
    const memberRef = getMemberRef(uid);
    await updateDoc(memberRef, {
      applicationStatus: status,
      updatedAt: serverTimestamp(),
    });
  },
};

export default applicationService;
