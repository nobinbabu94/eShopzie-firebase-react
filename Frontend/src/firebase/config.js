import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "ecommerce-8e780.firebaseapp.com",
    projectId: "ecommerce-8e780",
    storageBucket: "ecommerce-8e780.appspot.com",
    messagingSenderId: "1078979645112",
    appId: "1:1078979645112:web:011f39ba2046ce07f92e4d",
    measurementId: "G-RRLZF3VRRW"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;