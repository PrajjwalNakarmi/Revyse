import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVAAYUh7hudjgVEFavU7mUROtaLLoaQb0",
  authDomain: "revyse-882f6.firebaseapp.com",
  projectId: "revyse-882f6",
  storageBucket: "revyse-882f6.firebasestorage.app",
  messagingSenderId: "570755482991",
  appId: "1:570755482991:web:d0eb2d5b6840f5a65fd49a",
  measurementId: "G-MW40DZ76JW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();