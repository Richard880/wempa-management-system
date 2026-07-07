// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYImSYIEldJ4j6QbCLsyeGHJPqEGoA-oE",
  authDomain: "wempa-fb728.firebaseapp.com",
  projectId: "wempa-fb728",
  storageBucket: "wempa-fb728.firebasestorage.app",
  messagingSenderId: "351144678304",
  appId: "1:351144678304:web:09b289d6ad84fe31fe4ac5",
  measurementId: "G-RPPX1E1XZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);