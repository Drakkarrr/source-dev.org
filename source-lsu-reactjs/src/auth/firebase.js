import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore }  from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBaPu6pwXCfdq0y6L5FbSLJ_P2fKM4WAxM",
    authDomain: "ts-react-auth-fb2b5.firebaseapp.com",
    projectId: "ts-react-auth-fb2b5",
    storageBucket: "ts-react-auth-fb2b5.appspot.com",
    messagingSenderId: "671480162987",
    appId: "1:671480162987:web:c64f13db4ffd73750365ee"
  };


const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);
export { authentication, db }