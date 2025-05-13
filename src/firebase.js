import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPoDaS3yrLH4hlHiURgp76FdSHdl9VGXs",
  authDomain: "jobseekai-d2c07.firebaseapp.com",
  projectId: "jobseekai-d2c07",
  storageBucket: "jobseekai-d2c07.firebasestorage.app",
  messagingSenderId: "863174936643",
  appId: "1:863174936643:web:58afbb2a2d47867b36acf6",
  measurementId: "G-X83T7E627X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { auth, googleProvider, appleProvider, signInWithPopup };
