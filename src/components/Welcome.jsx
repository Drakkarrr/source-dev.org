import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//!  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../auth/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Welcome = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const userName = name;

  //!  Fetch the data of logged in user
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (loading) return fetchUserName();
    if (!user) {
      localStorage.removeItem("token");
      navigate("/");
    }

    fetchUserName();
  }, [user, loading, navigate]);

  //! Navigate user to voting/ballot page
  const toBallot = () => {
    navigate("/ballot");
  };

  return (
    <div className="flex h-screen">
      <div className="lg:w-6/12 m-auto text-center lg:border-t-4 lg:border-0 border-4 border-green-900 lg:shadow-lg lg:p-10 py-10 px-2">
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
            Welcome to La Salle University - OZC <br />
            Student Organization Utilizing the Realm of Computer Eclecticism
            <br />
            Election for A.Y 2022 - 2023 Officers.
          </div>
        </div>

        <div className="lg:text-sm text-xs lg:text-black text-green-800 my-20 lg:w-10/12 w-11/12 mx-auto text-justify">
          <div className="capitalize mb-5">Hello, {userName}!</div>
          <div className="indent-10">
            You can only elect officers at once. Do not close the page while
            still voting, you will automatically be redirected to logout and
            reset selected candidates. Choose only one (1) candidate per
            position, Thank you!
          </div>
        </div>

        <div className="">
          <button
            onClick={logout}
            className="bg-blue-900 hover:bg-blue-700 border border-white text-white font-bold py-2 px-4 rounded mr-10 lg:text-sm text-xs"
          >
            LOGOUT
          </button>
          <button
            onClick={toBallot}
            className="lg:bg-green-800 bg-green-900 border border-white hover:bg-green-900 text-white font-bold py-2 px-4 rounded lg:text-sm text-xs"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
