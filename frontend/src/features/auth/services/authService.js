import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  reload,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

 import { generateMembershipNumber } from "../../../utils/generateMembershipNumber";
import { auth as fallbackAuth, db as fallbackDb } from "../../../firebase";

//import * as membership from "../../../utils/generateMembershipNumber";

import AuthError from "../utils/AuthError";
import { getAuthErrorMessage } from "../utils/authErrorMessages";
import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";





// const mapFirebaseError = (error) => {
//   throw new AuthError(getAuthErrorMessage(error.code), error.code);
// };
const mapFirebaseError = (error) => {
  console.error("========== FIREBASE ERROR ==========");
  console.error("Code:", error.code);
  console.error("Message:", error.message);
  console.error(error);
  console.error("===================================");

  throw new AuthError(
    getAuthErrorMessage(error.code),
    error.code
  );
};
// =========================================================================
// 🌐 DYNAMIC SINGLETON POINTER RESOLVER
// =========================================================================
const getAuth = () => {
  if (typeof window !== "undefined" && window.__GLOBAL_FIREBASE_AUTH__) {
    return window.__GLOBAL_FIREBASE_AUTH__;
  }
  return fallbackAuth;
};

const getDb = () => {
  if (typeof window !== "undefined" && window.__GLOBAL_FIREBASE_DB__) {
    return window.__GLOBAL_FIREBASE_DB__;
  }
  return fallbackDb;
};

// =========================================================================
// 📢 RUNTIME CONNECTION RE-PROXY STREAM
// =========================================================================
let globalUserCache = null;
let isFirebaseInitialized = false;
let globalUnsubscribeRef = null;
const liveSubscribers = new Set();

const ensureGlobalListenerIsActive = () => {
  // If the stream is already listening, do not duplicate it
  if (globalUnsubscribeRef) return;

  const activeAuth = getAuth();

  globalUnsubscribeRef = onAuthStateChanged(
    activeAuth,
    (user) => {
      globalUserCache = user;
      isFirebaseInitialized = true;
      
      // Broadcast the state update to all active React contexts safely
      liveSubscribers.forEach((callback) => callback(user));
    },
    (error) => {
      console.error("Global Instance Event Failure:", error);
    }
  );
};

const authService = {
  get authInstance() {
    return getAuth();
  },

async login({
  email,
  password,
  rememberMe = false,
}) {
  const activeAuth = getAuth();

  // console.log("======================================");
  // console.log("🔐 LOGIN PROCESS STARTED");
  // console.log("Email:", email);
  // console.log("Remember Me:", rememberMe);
  // console.log("======================================");

  try {
    console.log("1️⃣ Setting Firebase persistence...");

    await setPersistence(
      activeAuth,
      rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence
    );

    // console.log("✅ Persistence configured.");

    // console.log("2️⃣ Calling signInWithEmailAndPassword...");

    const credential =
      await signInWithEmailAndPassword(
        activeAuth,
        email,
        password
      );

    // console.log("✅ Firebase authentication successful.");

    // console.log("UID:", credential.user.uid);
    // console.log("Email:", credential.user.email);
    // console.log(
    //   "Email Verified:",
    //   credential.user.emailVerified
    // );

    // console.log(
    //   "Current User:",
    //   activeAuth.currentUser
    // );

    // console.log(
    //   "Waiting for AuthContext onAuthStateChanged..."
    // );

    return credential.user;
  } catch (error) {
    // console.error("======================================");
    // console.error("❌ LOGIN FAILED");
    // console.error(error);
    // console.error("Code:", error.code);
    // console.error("Message:", error.message);
    // console.error("======================================");

    mapFirebaseError(error);
  }
},

  

  // async register({ firstName, lastName, email, phoneNumber, password }) {
  //   const activeAuth = getAuth();
  //   const activeDb = getDb();
  //   try {
  //     const credential = await createUserWithEmailAndPassword(activeAuth, email, password);
  //     const user = credential.user;

  //     await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      
  //     const membershipNumber = typeof generateMembershipNumber === "function" 
  //       ? await generateMembershipNumber() 
  //       : "TEMP-NUM";

  //     await setDoc(doc(activeDb, FIREBASE_COLLECTIONS.USERS || "users", user.uid), {
  //       uid: user.uid,
  //       membershipNumber,
  //       firstName,
  //       lastName,
  //       displayName: `${firstName} ${lastName}`,
  //       email,
  //       phoneNumber,
  //       role: "member",
  //       membershipStatus: "pending",
  //       profileCompleted: false,
  //       isActive: true,
  //       emailVerified: false,
  //       createdAt: serverTimestamp(),
  //       updatedAt: serverTimestamp(),
  //       lastLogin: null,
  //     });

  //     await sendEmailVerification(user);
  //     return user;
  //   } catch (error) {
  //     mapFirebaseError(error);
  //   }
  // },

  async register({ firstName, lastName, email, phoneNumber, password }) {
  const activeAuth = getAuth();
  const activeDb = getDb();

  try {
    // console.log("1. Creating Firebase Auth user...");
    const credential = await createUserWithEmailAndPassword(activeAuth, email, password);

    const user = credential.user;

    // console.log("Current User:", activeAuth.currentUser);
console.log("UID:", activeAuth.currentUser?.uid);

//const token = await activeAuth.currentUser.getIdToken(true);

// console.log("ID Token:", token);

//     console.log("2. Updating display name...");
   await updateProfile(user, {
       displayName: `${firstName} ${lastName}`,
     });
// console.log("3. Generating membership number...");
     const membershipNumber = await generateMembershipNumber();


//     console.log("Membership Number:", membershipNumber);

//  console.log("4. Saving Firestore user...");

try {
  await setDoc(
    doc(activeDb, FIREBASE_COLLECTIONS.USERS, user.uid),
    {
      uid: user.uid,
      membershipNumber,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      role: "member",
      membershipStatus: "pending",
      profileCompleted: false,
      isActive: true,
      emailVerified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: null,
    }
  );

  console.log("✅ Firestore document successfully created.");
} catch (error) {
  console.error("❌ Firestore setDoc FAILED");
  console.error(error);
  throw error;
}
    console.log("5. Sending verification email...");
    await sendEmailVerification(user);

    console.log("Registration complete.");

    return user;

  } catch (error) {
    console.error("REGISTER FAILED");
    console.error(error);
    console.error(error.code);
    console.error(error.message);

    throw error;
  }
  },

  async getUserProfile(uid) {
    const activeDb = getDb();
    try {
      const userRef = doc(activeDb, FIREBASE_COLLECTIONS.USERS || "users", uid);
      const snapshot = await getDoc(userRef);
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
      mapFirebaseError(error);
    }
  },

  async updateEmailVerificationStatus(uid) {
    const activeAuth = getAuth();
    const activeDb = getDb();
    try {
      const user = activeAuth.currentUser;
      if (!user) throw new Error("No authenticated user available.");
      await user.reload();
      if (!user.emailVerified) return false;

      await updateDoc(doc(activeDb, FIREBASE_COLLECTIONS.USERS || "users", uid), {
        emailVerified: true,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      mapFirebaseError(error);
    }
  },

  async reloadCurrentUser() {
    const activeAuth = getAuth();
    const user = activeAuth.currentUser;
    if (!user) return null;
    await reload(user);
    return user;
  },

  async logout() {
    const activeAuth = getAuth();
    try {
      await signOut(activeAuth);
    } catch (error) {
      mapFirebaseError(error);
    }
  },

  async resetPassword(email) {
    const activeAuth = getAuth();
    try {
      await sendPasswordResetEmail(activeAuth, email);
    } catch (error) {
      mapFirebaseError(error);
    }
  },

  getCurrentUser() {
    return getAuth().currentUser || globalUserCache;
  },

  isReady() {
    return isFirebaseInitialized;
  },

  onAuthStateChanged(callback) {
    // 🟢 CRITICAL CHANGE: Ensure the native listener is spun up dynamically
    ensureGlobalListenerIsActive();

    if (isFirebaseInitialized) {
      callback(globalUserCache);
    }

    liveSubscribers.add(callback);
    return () => {
      liveSubscribers.delete(callback);
    };
  },
};

export default authService;
