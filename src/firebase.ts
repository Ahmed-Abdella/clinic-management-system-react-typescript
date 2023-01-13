import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1nwXbVL-b_bkrQaqPkTLCSBFLM6_uEv8",
  authDomain: "clinic-management-fe25d.firebaseapp.com",
  projectId: "clinic-management-fe25d",
  storageBucket: "clinic-management-fe25d.appspot.com",
  messagingSenderId: "69407347377",
  appId: "1:69407347377:web:554529499adf37d772c890",
  measurementId: "G-PE1256WV8D",
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init service

export const db = getFirestore();

// collection reference

// get Docs

// export const getAllDocs = (collectionName: string) => {
//   const db = getFirestore();

//   const colRef = collection(db, collectionName);

//   return getDocs(colRef);
// };
