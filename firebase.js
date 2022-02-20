// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOac49YZ3nC-H9Ht83gd6JFJGjgtobp9w",
  authDomain: "snap-flicks-792d8.firebaseapp.com",
  projectId: "snap-flicks-792d8",
  storageBucket: "snap-flicks-792d8.appspot.com",
  messagingSenderId: "914220357900",
  appId: "1:914220357900:web:e15942d3bc82d4fd575129"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;