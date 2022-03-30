import React, { useEffect } from 'react'
import logo from '../assets/source-logo.png'
import styled from 'styled-components';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const auth = getAuth();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate('/');
       }
    }, [navigate])
    

  //!  Logout the user
  const logoutHandler = () => {
    const auth = getAuth();

    signOut(auth)
    .then((res) => {
      localStorage.removeItem("token");
      navigate('/');
      console.log('signed out!', res);
    })
    .catch((err) => {
      console.log('err', err);
    })
  };


  return (
    <>
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
                <h1>WELCOME Back {user.displayName}!</h1>
              </div>
              <div className='w-80 relative'>
                <p>Lorem ipsum dolor Similique ratione cumque sed deserunt animi id, ab porro laboriosam magnam culpa quam illo, error quidem libero autem sapiente? Incidunt, enim dolor?</p>
              </div>

              <div className='buttons'>
                <button onClick={logoutHandler} className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">LOGOUT</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300">VIEW RESULTS</button>
              </div>
            </StyledContainer>
          </div>
        </div>
      </div>
    </div>
    </>
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