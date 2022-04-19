import React, { useEffect, useState } from "react";
import logo from '../assets/source-logo.png'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//!  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../auth/firebase';
import { query, collection, getDocs, where} from "firebase/firestore";

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
    } catch{
      // console.log(err);
    }
  };

  useEffect(() => {
    if (loading) return fetchUserName()
    if (!user) {
      localStorage.removeItem("token");
      navigate("/");

    }

    fetchUserName();
  }, [user, loading, navigate]);

  //! Navigate user to voting/ballot page
  const toBallot = () => {
    navigate('/ballot')
  }
  

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className='grid m-auto place-items-center shadow-2xl box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className=' h-96 w-160'>
            <StyledContainer className='container m-auto border-gray-700 shadow-box h-90 w-160'>
              <div className='w-80 m-auto relative grid'>
                <StyledLogoContainer className="logo-container h-auto">
                  <img className='mt-6' src={logo} alt="source logo" />
                </StyledLogoContainer>
              </div>
              <div className='w-80 relative'>
                <h1 className="font-bold text-2xl">WELCOME {userName}!</h1>
              </div>

              <div className='w-80 relative'>
                <h2 className="font-bold w-9/12 mt-px text-base">La Salle University - OZC Student Organization Utilizing the Realm of Computer Eclecticism ELECTION for A.Y 2022 - 2023 OFFICERS.</h2>
              </div>
              <div className='w-80 relative'>
                <p className="font-semibold">Student(s) can only elect officers once. Do not close the page while still voting, you will be automatically redirected to logout and reset selected candidates. Choose one (1) candidate per position, Thank you!</p>
              </div>

              <div className='buttons flex justify-between'>
                <button onClick={logout} className="g_id_signout main text-white px-4 py-2 rounded-md text-1xl font-bold hover:bg-purple-800 transition duration-300">LOGOUT</button>
                <button onClick={toBallot} className="main text-white px-4 py-2 rounded-md text-1xl font-bold hover:bg-blue-700 transition duration-300">GET STARTED</button>
              </div>
            </StyledContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;

const StyledLogoContainer = styled.div`
  width: auto;
  display: grid;
  place-items: center;
  height: auto;
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