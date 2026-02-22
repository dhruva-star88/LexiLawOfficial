import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZojwZIXb_GRvq5U5wuP5Xva2XVhsVp-g",
  authDomain: "lexilaw-ai.firebaseapp.com",
  projectId: "lexilaw-ai",
  storageBucket: "lexilaw-ai.firebasestorage.app",
  messagingSenderId: "496487236407",
  appId: "1:496487236407:web:0736a245968888148690b2",
  measurementId: "G-RBRST0BGCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth
export const auth = getAuth(app);