import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// This is the Firebase config for the connection
const databaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_TSCDB_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_TSCDB_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_TSCDB_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_TSCDB_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_TSCDB_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_TSCDB_FIREBASE_APP_ID
  // apiKey: "AIzaSyDS4ByFtVHpfu0RqekOTyfv1fDnBmSA5mY",
  // authDomain: "thesoutherncriticdb.firebaseapp.com",
  // projectId: "thesoutherncriticdb",
  // storageBucket: "thesoutherncriticdb.firebasestorage.app",
  // messagingSenderId: "260154614098",
  // appId: "1:260154614098:web:05c6b219a5ab3e88061a8b"
}

const databaseApp = initializeApp(databaseConfig);

const thesoutherncriticdb = getFirestore(databaseApp);
const thesoutherncriticauth = getAuth(databaseApp);

export {thesoutherncriticdb, thesoutherncriticauth};