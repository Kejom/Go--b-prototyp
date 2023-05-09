
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkoORtm3MkoWSV5qaHgeC2j_5hhk2m6GY",
  authDomain: "golab-5ee28.firebaseapp.com",
  projectId: "golab-5ee28",
  storageBucket: "golab-5ee28.appspot.com",
  messagingSenderId: "1081983769733",
  appId: "1:1081983769733:web:fc1769c710dfafb0031dec"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;