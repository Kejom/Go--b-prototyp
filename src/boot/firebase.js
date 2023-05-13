
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDoc, setDoc, doc } from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, updateProfile } from "firebase/auth"
import { generateGUID } from "src/util/guidHelper";

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


export const logInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const createUserAccount = async (email, password) => {
  if (!email || !password) return;

  await createUserWithEmailAndPassword(auth, email, password);
}

export const logInWithGoogle = () => signInWithPopup(auth, provider)
export const logOut = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

const storage = getStorage(app)

export const saveUserAvatar = async (avatarFile) => {
  const fileName = generateGUID();
  const storageRef = ref(storage, fileName);
  const result = await uploadBytes(storageRef, avatarFile);
  console.log(result);
  const link = await getDownloadURL(result.ref);
  return link;
}

export const setUserProfileData = async (userId, userProfile) => {
  const profileRef = doc(db, 'users', userId);
  await setDoc(profileRef, userProfile);
  const snapshot = await getDoc(profileRef);
  return snapshot.data();
}

export const getUserProfileData = async (userId) => {
  const profileRef = doc(db, 'users', userId)
  const snapshot = await getDoc(profileRef);
  return snapshot.data();
}
