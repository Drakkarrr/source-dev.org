import React, { useState, useEffect } from 'react';
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
      // console.error(err);
    }
  };

  const backToBallot = async () => {
    navigate("/ballot");
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      localStorage.removeItem("token");
    }

    fetchUserName();
  }, [error, loading, navigate, user]);
  return (
    <>
      <div
        className="mt-10 text-center lg:w-8/12 w-11/12 mx-auto my-30"
      >
        <div className="">
          <div className="inline-flex mx-auto gap-5">
            <img
              src={require("../assets/lsu-logo.png")}
              className="lg:h-20 h-16 lg:mb-3 mb-5"
              alt="source logo"
            />

            <img
              src={require("../assets/source-logo.png")}
              className="lg:h-20 h-16 lg:mb-3 mb-5"
              alt="source logo"
            />
          </div>

          <div className="lg:text-sm text-xs lg:text-green-700 text-green-800 lg:w-10/12 w-11/12 mx-auto">
            La Salle University - OZC <br />
            Student Organization Utilizing the Realm of Computer Eclecticism
            <br />
            Election for A.Y 2022 - 2023 Officers.
          </div>
        </div>

        <div className="pt-20 text-sm font-normal h-44 my-auto">
          For confirmation receipt, please check your LSU email after Logging Out. Thank you, {userName}!
        </div>
        <div className="lg:flex">
          <div className="w-fit mx-auto">
            <button
              onClick={backToBallot}
              className="bg-blue-800 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300 ml-5 mb-5"
            >
              Re-Select
            </button>
            <button
              onClick={logout}
              className="bg-green-800 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-green-700 transition duration-300 ml-5"
            >
              Submit and Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThankYou;