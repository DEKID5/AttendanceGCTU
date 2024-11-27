import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7AyGz_yKZPMcBUgqWCs6oV6-yvklFws0",
  authDomain: "attendance-app-7aefe.firebaseapp.com",
  projectId: "attendance-app-7aefe",
  storageBucket: "attendance-app-7aefe.firebasestorage.app",
  messagingSenderId: "71551212270",
  appId: "1:71551212270:web:52bbfc06c6993de1abb1ff",
  measurementId: "G-P3B2Z8FWVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
