// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmHkJUjlpHzXQN0HbQOOWOW7M0L27uifc",
  authDomain: "learna-ltd.firebaseapp.com",
  projectId: "learna-ltd",
  storageBucket: "learna-ltd.appspot.com",
  messagingSenderId: "286193750478",
  appId: "1:286193750478:web:209cf076f56f1ef4289b9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async() => {
 let user = null
 await signInWithPopup(auth, provider)
 .then((result)=>{
    user = result.user
 }).catch((err)=>{
    console.log(err);
 })
 return user
}