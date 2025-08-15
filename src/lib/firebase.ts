// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtuC0ajcl4YhYrta-9AYDvR2_1mRXNc54",
  authDomain: "opentrust-inc.firebaseapp.com",
  projectId: "opentrust-inc",
  storageBucket: "opentrust-inc.appspot.com",
  messagingSenderId: "576347398952",
  appId: "1:576347398952:web:764f6e76d178adbbb5e61d",
  measurementId: "G-1JTJRLGJY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
