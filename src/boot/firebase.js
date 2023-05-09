
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, updateProfile} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDkoORtm3MkoWSV5qaHgeC2j_5hhk2m6GY",
  authDomain: "golab-5ee28.firebaseapp.com",
  projectId: "golab-5ee28",
  storageBucket: "golab-5ee28.appspot.com",
  messagingSenderId: "1081983769733",
  appId: "1:1081983769733:web:fc1769c710dfafb0031dec"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.languageCode = 'pl';

const provider = new GoogleAuthProvider();


export const logInWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const createUserAccount = async(displayName, email, password) => {
  if(!email || !password) return;

  const userCredential = await createUserWithEmailAndPassword(auth,  email, password);
  console.log(userCredential);
  await updateProfile(userCredential.user, {
    displayName: displayName
  })
  console.log(auth.currentUser);
}
export const logInWithGoogle = () => signInWithPopup(auth, provider)
export const logOut = async() => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
