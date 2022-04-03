import React,{ useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

//!  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../auth/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";


const ThankYou = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const userName = name;

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
    
          setName(data.name);
        } catch (err) {
            console.error(err);
          }
      };

    useEffect(() => {
        if (loading) return;
        if (!user) {
          navigate("/");
          localStorage.removeItem("token");
          alert("Successfully signed out");
    
        }
    
        fetchUserName();
      }, [user, loading, error]);
    return (
        <>
            <div>ThankYou for voting {userName}!</div>
            <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300">Logout</button>
        </>
    )
}

export default ThankYou;