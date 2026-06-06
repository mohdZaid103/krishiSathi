import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClf-Wvy0ctmcATazzPFkGSeHvT0SqWEIU",
  authDomain: "krishisathi-f407a.firebaseapp.com",
  projectId: "krishisathi-f407a",
  storageBucket: "krishisathi-f407a.firebasestorage.app",
  messagingSenderId: "276505344144",
  appId: "1:276505344144:web:d14830772d97b47ddcc015",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);