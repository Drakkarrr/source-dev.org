import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/source-logo.png';
import { useNavigate } from "react-router-dom";

//!  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../auth/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";

const WelcomeBack = () => {
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      localStorage.removeItem("token");
    }

    fetchUserName();
  });

  //! Navigate user to results
  const toResults = () => {
    navigate('/results')
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className='main-container grid m-auto place-items-center shadow-2xl box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className='main-container h-96 w-160'>
            <StyledContainer className='container m-auto border-gray-700 shadow-box h-90 w-160'>
              <div className='w-80 m-auto relative grid'>
                <StyledLogoContainer className="logo-container h-auto">
                  <img className='mt-6' src={logo} alt="source logo" />
                </StyledLogoContainer>
              </div>
              <div className='w-full md:w-auto relative'>
                <h1 className='font-bold text-2xl w-100%'>WELCOME BACK {userName}!</h1>
              </div>
              <div className='w-80 relative'>
                <h2 className="font-bold w-9/12 mt-px text-base">La Salle University - OZC Student Organization Utilizing the Realm of Computer Eclecticism ELECTION for A.Y 2022 - 2023 OFFICERS.</h2>
              </div>
              <div className='buttons flex justify-between'>
                <button onClick={logout} className="main bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">LOGOUT</button>
                <button onClick={toResults} className="main bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VIEW RESULTS</button>
              </div>
            </StyledContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBack;

const StyledLogoContainer = styled.div`
  width: auto;
  height: auto;
  margin: 0 auto;
    img {
      object-fit: cover;
      width: 101px;
    }
`

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
`