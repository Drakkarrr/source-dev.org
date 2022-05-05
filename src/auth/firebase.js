import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { setCookie, clearCookies } from "../helpers/cookie";


const firebaseConfig = {
  apiKey: "AIzaSyB1BuN_Ce_5cgKDmILr__F9dFEQA48xJNw",
  authDomain: "sourcedevorg-ec468.firebaseapp.com",
  projectId: "sourcedevorg-ec468",
  storageBucket: "sourcedevorg-ec468.appspot.com",
  messagingSenderId: "796241866620",
  appId: "1:796241866620:web:25a66ca01148602671bef9"
};



//!  Initialize app and firestore database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


//!  Handle user when signin
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: 'select_account',
    hd: "lsu.edu.ph"
  });
  
  try {
    const res = await signInWithPopup(auth, provider)
    const user = res.user;
    localStorage.setItem("token", res.user);
    setCookie("userCookie")
    
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    
    // const filteredUsers = authenticatedEmails.find(arr => arr === user.email);

    // if(filteredUsers) {
    //   console.log("You are authenticated");
    // }
    // else {
    //    alert('You are not part of the org');
    //    logout()
    // }
    
    
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
  }
};


//!  Logout handler
const logout = () => {
  clearCookies();
  signOut(auth);
};


export { auth, signInWithGoogle, logout, db, collection, addDoc, getDocs };