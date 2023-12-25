import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2mWbFrlRSGTkCilDTUcTszSLuOuwURFM",
  authDomain: "cryptext-ee26b.firebaseapp.com",
  projectId: "cryptext-ee26b",
  storageBucket: "cryptext-ee26b.appspot.com",
  messagingSenderId: "1072435393998",
  appId: "1:1072435393998:web:d3122fa0b7d593b20c279f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}