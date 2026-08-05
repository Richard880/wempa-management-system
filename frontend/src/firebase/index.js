// src/firebase/index.js
import { default as app } from "./config";
import { default as auth } from "./auth";
import { default as db } from "./firestore";
import { default as storage } from "./storage";

// Bind the singletons to the browser window so they share a global runtime pipe
if (typeof window !== "undefined") {
  window.__GLOBAL_FIREBASE_AUTH__ = auth;
  window.__GLOBAL_FIREBASE_DB__ = db;
 
}

export { app, auth, db, storage };

