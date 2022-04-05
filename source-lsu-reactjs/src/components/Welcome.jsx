import React, { useEffect, useState } from "react";
import logo from '../assets/source-logo.png'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//!  Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../auth/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";

const Home = () => {
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
      alert("Successfully signed out");

    }

    fetchUserName();
  });

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
                <h1>WELCOME {userName}!</h1>
              </div>
              <div className='w-80 relative'>
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eveniet!</h2>
              </div>
              <div className='w-80 relative'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ratione cumque sed deserunt animi id, ab porro laboriosam magnam culpa quam illo, error quidem libero autem sapiente? Incidunt, enim dolor?</p>
              </div>

              <div className='buttons'>
                <button onClick={logout} className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">LOGOUT</button>
                <button onClick={toBallot} className="bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300">GET STARTED</button>
              </div>
            </StyledContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;

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