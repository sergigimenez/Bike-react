import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

export const initConfigFacebook = () => {
  window.fbAsyncInit = function () {
      FB.init({
          appId: '873414750440759',
          cookie: true,
          xfbml: true,
          version: 'v16.0'
      });

      FB.AppEvents.logPageView();

  };

  (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}