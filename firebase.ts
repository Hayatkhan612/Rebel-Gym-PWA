/**
 * Firebase Configuration & Initialization
 * 
 * Security Layer 1: Strict initialization with error handling
 * - Validates Firebase config before initialization
 * - Exports auth and db for use throughout the app
 * - Enables offline persistence for PWA functionality
 */

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, Auth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_MZOa-2CdTbNkblpc6s-u3wIY8s4xgXk",
  authDomain: "clientapp-9abd1.firebaseapp.com",
  databaseURL: "https://clientapp-9abd1-default-rtdb.firebaseio.com",
  projectId: "clientapp-9abd1",
  storageBucket: "clientapp-9abd1.firebasestorage.app",
  messagingSenderId: "492370936306",
  appId: "1:492370936306:web:2637aafe57c106322f2b6b",
  measurementId: "G-GY9WKMHFYE"
};

// Validate Firebase config
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  throw new Error("Firebase configuration is incomplete. Check environment variables.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication with persistent login
export const auth: Auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

// Initialize Firestore with offline support
export const db: Firestore = getFirestore(app);
enableIndexedDbPersistence(db).catch((error) => {
  if (error.code === "failed-precondition") {
    console.warn("Firestore: Multiple tabs open, offline persistence disabled");
  } else if (error.code === "unimplemented") {
    console.warn("Firestore: Browser doesn't support offline persistence");
  }
});

export default app;
