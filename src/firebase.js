import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <--- Added these
import { getFirestore } from "firebase/firestore";           // <--- Added these

const firebaseConfig = {
  apiKey: "AIzaSyBG0lmrhW6HBizfG0BL-RlIIXdpzpgGp7o",
  authDomain: "tsquare-alum.firebaseapp.com",
  projectId: "tsquare-alum",
  storageBucket: "tsquare-alum.firebasestorage.app",
  messagingSenderId: "495440678134",
  appId: "1:495440678134:web:8f4099bc3d7d85478570d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the tools so the rest of the app can use them
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);