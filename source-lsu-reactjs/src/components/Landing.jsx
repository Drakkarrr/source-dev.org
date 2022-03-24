import React from 'react';
import styled from 'styled-components';
import initializeAuth from "../firebase.init"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const Landing = () => {
  initializeAuth()
  const signInHandler = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
  
    signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user; 

      console.log('You are now signedIn!');
      console.log(user);
    });
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className='shadow-2xl	box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className='flex'>
            <div className='w-80'>
              <img className="w-80 shadow-box" src="/slogan.png" alt="slogan logo" />
            </div>
            <div className='w-80 relative'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <StyledButton onClick={signInHandler}><img className="h-10 shadow-box" src="/btn_google_signin_dark_pressed_web@2x.png" alt="signin" /></StyledButton>
                {/* <p className='text-xs text-neutral-500 text-center mt-0.5'>Login with LSU email</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;

const StyledButton = styled.button`
  transition: 0.15s;
  cursor: pointer;
`