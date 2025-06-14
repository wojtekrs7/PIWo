import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRHFtB3-IVCfbVsheYF7Y6VVJxc0vX_ac",
    authDomain: "bookshop-12345.firebaseapp.com",
    projectId: "bookshop-12345",
    storageBucket: "bookshop-12345.appspot.com",
    messagingSenderId: "265003592649",
    appId: "1:265003592649:web:3b342f47cbff8e1cb35618"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();