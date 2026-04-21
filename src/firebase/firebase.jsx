import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDj08whPVlbzxpmcdrX6y3Cq25Gt_uNvIw",
  authDomain: "psychologists-app-eaede.firebaseapp.com",
  databaseURL: "https://psychologists-app-eaede-default-rtdb.firebaseio.com",
  projectId: "psychologists-app-eaede",
  storageBucket: "psychologists-app-eaede.firebasestorage.app",
  messagingSenderId: "705852059224",
  appId: "1:705852059224:web:328beda53212f17aa6242d",
  measurementId: "G-5G0RSJY5WZ",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
