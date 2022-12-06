import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPVYvton_2K7WvdilK8V-6IcxxMBokrl8",
  authDomain: "journal-app-925db.firebaseapp.com",
  projectId: "journal-app-925db",
  storageBucket: "journal-app-925db.appspot.com",
  messagingSenderId: "86631107965",
  appId: "1:86631107965:web:541e43f32887b206c09014"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
