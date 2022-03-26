import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import initializeAuth from "../firebase.init"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Welcome from '../pages/PageWelcome'
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  initializeAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(user)
  }, [user])

  //!  Signin the user
  const signInHandler = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider).then((result) => {
          setUser(result.user);
          navigate('/welcome');
    });
  };


  return (
    <>
      {!!user ? <Welcome setUser={setUser} /> : <div className="flex h-screen">
        <div className="m-auto">
          <div className='shadow-2xl	box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
            <div className='flex'>
              <div className='w-80'>
                <img className="w-80 shadow-box" src="/slogan.png" alt="slogan logo" />
              </div>
              <div className='w-80 relative'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <StyledButton onClick={signInHandler}><img className="h-10 shadow-box" src="/btn_google_signin_dark_pressed_web@2x.png" alt="signin" /></StyledButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Landing;

const StyledButton = styled.button`
  transition: 0.15s;
  cursor: pointer;
`