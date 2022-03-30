import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBaPu6pwXCfdq0y6L5FbSLJ_P2fKM4WAxM",
  authDomain: "ts-react-auth-fb2b5.firebaseapp.com",
  projectId: "ts-react-auth-fb2b5",
  storageBucket: "ts-react-auth-fb2b5.appspot.com",
  messagingSenderId: "671480162987",
  appId: "1:671480162987:web:c64f13db4ffd73750365ee"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider)  
    const user = res.user;
    localStorage.setItem("token", res.user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth)
};


export { auth, signInWithGoogle, db, logout };