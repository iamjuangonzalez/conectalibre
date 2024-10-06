// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Para autenticación
import { getFirestore } from "firebase/firestore"; // Para Firestore (Base de datos)
import { getStorage } from "firebase/storage"; // Para almacenamiento de archivos

const firebaseConfig = {
  apiKey: "AIzaSyDqAGsRX2_ecLt0_P8DwfdQR1FGSr9f0bQ",
  authDomain: "conectalibre-91f77.firebaseapp.com",
  projectId: "conectalibre-91f77",
  storageBucket: "conectalibre-91f77.appspot.com",
  messagingSenderId: "58650837304",
  appId: "1:58650837304:web:3b86e3ad759982289741cd",
  measurementId: "G-7LRT8WKQX0",
};

const app = initializeApp(firebaseConfig);

// Exports para diferentes servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
