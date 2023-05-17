import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3kD7zoXH-KOq4Pnoouohbk5ThHN5zndM",
  authDomain: "aether-shuffler.firebaseapp.com",
  projectId: "aether-shuffler",
  storageBucket: "aether-shuffler.appspot.com",
  messagingSenderId: "285454937499",
  appId: "1:285454937499:web:259f778c60f1f9a879c53e",
  measurementId: "G-JE6XPWWDNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
