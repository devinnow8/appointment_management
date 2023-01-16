// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl742lnszifLn2dC4DVYRKxHXZi-knQ2o",
  authDomain: "ois-appointment-user.firebaseapp.com",
  projectId: "ois-appointment-user",
  storageBucket: "ois-appointment-user.appspot.com",
  messagingSenderId: "807665768933",
  appId: "1:807665768933:web:1e93c3e7e4bfb294def70c",
  measurementId: "G-XCP6ZVYY0B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
