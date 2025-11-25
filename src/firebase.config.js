// Import the functions you need from the SDKs you need
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQXYYzXAyIS3eP0RWFHx0T7awlnfHxNm8",
  authDomain: "event-app-1b8d1.firebaseapp.com",
  projectId: "event-app-1b8d1",
  storageBucket: "event-app-1b8d1.firebasestorage.app",
  messagingSenderId: "451557920720",
  appId: "1:451557920720:web:3d5a218388a1c85dd6b3d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };