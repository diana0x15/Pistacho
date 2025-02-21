import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// App's Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyDaTHGohZwZ0TUNZU5iF66WxQW1D38q3cI",
  authDomain: "pistacho-3df84.firebaseapp.com",
  projectId: "pistacho-3df84",
  storageBucket: "pistacho-3df84.firebasestorage.app",
  messagingSenderId: "907786727968",
  appId: "1:907786727968:web:b5e2a5083493e0e2158245",
  measurementId: "G-K635LGJ3P8",
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);

// Initialize Firestore.
export const firestore = getFirestore(app);
