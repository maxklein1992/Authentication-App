// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1-uG-pSKcLv0GzRtfdm9JelYIPs56qUQ",
  authDomain: "authenticationapp-138dc.firebaseapp.com",
  projectId: "authenticationapp-138dc",
  storageBucket: "authenticationapp-138dc.appspot.com",
  messagingSenderId: "132049972021",
  appId: "1:132049972021:web:adf68ed368bb08083efa7c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
