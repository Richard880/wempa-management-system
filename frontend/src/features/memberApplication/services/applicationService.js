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

const createDefaultApplication = () => ({
  currentStep: 1,
  profileCompletion: 0,
  completedSections: [],
  applicationStatus: "draft",
  isLocked: false, // Added for UI and Security Rule alignment
  personal: {},
  contact: {},
  //employment: {},
 // emergencyContact: {},
  //maritime: {},
  //nextOfKin: {},
  documents: {},
  declaration: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const applicationService = {
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

    // 	🏼 1. FIXED: Inject the real document ID string directly from the 'users' snapshot layer
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

      // Include ID in default generation for data consistency hooks
      return { 
        profile, 
        application: { id: memberSnapshot.id, ...applicationData } 
      };
    }

    return {
      profile,
      // 	🏼 2. FIXED: Inject the member document ID string as well for safety
      application: {
        id: memberSnapshot.id,
        ...memberSnapshot.data()
      },
    };
  },

  async saveSection({ uid, section, data, currentStep }) {
    const memberRef = getMemberRef(uid);

    // Sanitize data for Firestore
    const sanitizedData = JSON.parse(JSON.stringify(data, (_, value) => 
      value === undefined ? null : value
    ));

    return runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(memberRef);

      if (!snapshot.exists()) {
        throw new Error("Membership application not found.");
      }

      const application = snapshot.data();

      // PRODUCTION SAFETY: Prevent saves if application is locked
      if (application.isLocked) {
        throw new Error("Application is locked and cannot be edited.");
      }

      const completedSections = application.completedSections || [];
      const updatedSections = [...new Set([...completedSections, section])];
      const profileCompletion = calculateProgress(updatedSections);

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
   * FINAL LOCK LOGIC
   * Sets status to submitted and isLocked to true
   */
  async submitApplication(uid) {
    const memberRef = getMemberRef(uid);

    await updateDoc(memberRef, {
      applicationStatus: "submitted",
      isLocked: true, // This is the trigger for your UI and Firestore Rules
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  async updateCurrentStep(uid, currentStep) {
    const memberRef = getMemberRef(uid);
    
    // Safety: check if locked before updating step
    const snapshot = await getDoc(memberRef);
    if (snapshot.exists() && snapshot.data().isLocked) return;

    await updateDoc(memberRef, {
      currentStep,
      updatedAt: serverTimestamp(),
    });
  },

  async updateApplicationStatus(uid, status) {
    const memberRef = getMemberRef(uid);
    await updateDoc(memberRef, {
      applicationStatus: status,
      updatedAt: serverTimestamp(),
    });
  },
};

export default applicationService;
