// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR_8AdmKKaDx-0v_uxNCF_QSmksHkZpWE",
  authDomain: "ois-appointment-user-staging.firebaseapp.com",
  projectId: "ois-appointment-user-staging",
  storageBucket: "ois-appointment-user-staging.appspot.com",
  messagingSenderId: "112966134216",
  appId: "1:112966134216:web:7453725314f879fbc9f8fd",
  measurementId: "G-V8CPRCGYZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
