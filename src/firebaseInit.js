import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCO_evC4T1zXOkCxpmFeG56xR3-qX3SrEc",
    authDomain: "photo-pholio-77b88.firebaseapp.com",
    projectId: "photo-pholio-77b88",
    storageBucket: "photo-pholio-77b88.firebasestorage.app",
    messagingSenderId: "286232038436",
    appId: "1:286232038436:web:d8dabff7676aa5133cdcb1",
    measurementId: "G-0VPL7EZ3RV"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
