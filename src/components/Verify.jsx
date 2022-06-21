import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//!  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../auth/firebase";
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


  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      localStorage.removeItem("token");
    }

    fetchUserName();
  }, [error, loading, navigate, user]);
  return (
    <div className="flex h-screen">
    <div className="lg:w-4/12 m-auto text-center lg:border-t-4 lg:border-0 border-4 border-green-900 lg:shadow-lg lg:p-10 py-10 px-2">
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

        <div className="lg:text-sm text-xs lg:text-green-700 text-green-800 mx-auto">
          La Salle University - OZC <br />
          Student Organization Utilizing the Realm of Computer Eclecticism
          <br />
          Election for A.Y 2022 - 2023 Officers.
        </div>
      </div>

      <div className="lg:text-sm text-xs lg:text-black text-green-800 my-20 w-11/12 mx-auto text-justify">
        <div>
          For confirmation receipt, please check your LSU email after Logging
          Out. Thank you, {userName}!
        </div>
      </div>

      <div className="lg:flex">
        <div className="w-fit mx-auto">
          <button
            onClick={logout}
            className="bg-green-800 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-green-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ThankYou;
