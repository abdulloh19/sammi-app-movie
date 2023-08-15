import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8VaqjtLqzk9ZC1kc_7PcN3p4qpIPueyw",
  authDomain: "sammi-movie-app-13627.firebaseapp.com",
  projectId: "sammi-movie-app-13627",
  storageBucket: "sammi-movie-app-13627.appspot.com",
  messagingSenderId: "915834252995",
  appId: "1:915834252995:web:e366e9f3d6176d5f8dfc76",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
