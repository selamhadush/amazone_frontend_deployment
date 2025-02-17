import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnR-pPMLYOhubtLug-nmZIO3sPCOO9mrY",
  authDomain: "clone-32c9b.firebaseapp.com",
  projectId: "clone-32c9b",
  storageBucket: "clone-32c9b.firebasestorage.app",
  messagingSenderId: "705142812742",
  appId: "1:705142812742:web:61a6bd0d657a420ac7da47",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
