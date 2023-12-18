import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYJsUOxnR1LabAr65kmP4idOt5cdnTe3E",
  authDomain: "y4s1final.firebaseapp.com",
  projectId: "y4s1final",
  storageBucket: "y4s1final.appspot.com",
  messagingSenderId: "838847168481",
  appId: "1:838847168481:web:ea8ee13e3e74f6637b1ca0",
  measurementId: "G-R79P91QSYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    db, analytics
}