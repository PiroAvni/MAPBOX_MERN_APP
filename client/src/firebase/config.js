// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7FYdD_IK-LkAaNMvYQPQo9jJgJUdumSI",
  authDomain: "office-location-c4c3c.firebaseapp.com",
  projectId: "office-location-c4c3c",
  storageBucket: "office-location-c4c3c.appspot.com",
  messagingSenderId: "839984490472",
  appId: "1:839984490472:web:f105db306cb079d4ede65d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();