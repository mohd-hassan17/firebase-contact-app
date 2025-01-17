// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxRfofRvvu3iJAy9l4R5v7p93irSjx7Go",
  authDomain: "fir-contact-a2b91.firebaseapp.com",
  projectId: "fir-contact-a2b91",
  storageBucket: "fir-contact-a2b91.firebasestorage.app",
  messagingSenderId: "1022602701912",
  appId: "1:1022602701912:web:44f9be3e4604d9a873ae2d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);