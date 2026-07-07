import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYImSYIEldJ4j6QbCLsyeGHJPqEGoA-oE",
  authDomain: "wempa-fb728.firebaseapp.com",
  projectId: "wempa-fb728",
  storageBucket: "wempa-fb728.firebasestorage.app",
  messagingSenderId: "351144678304",
  appId: "1:351144678304:web:09b289d6ad84fe31fe4ac5",
  measurementId: "G-RPPX1E1XZ7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
