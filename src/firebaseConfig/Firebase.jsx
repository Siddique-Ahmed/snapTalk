// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDttaMUWXQsUENc8BrGhAeVDWFGUX2C6ac",
  authDomain: "snap-talk-677ee.firebaseapp.com",
  projectId: "snap-talk-677ee",
  storageBucket: "snap-talk-677ee.appspot.com",
  messagingSenderId: "977493299641",
  appId: "1:977493299641:web:2e95570e443fb7f17ce668",
  measurementId: "G-C2N800XR3B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storageDB = getStorage(app);
const db = getFirestore(app);

export { auth, storageDB, db, app };
