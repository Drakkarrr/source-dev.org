import React, { useEffect } from "react";
import slogan from '../assets/slogan.png';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//!  Firebase
import { auth, signInWithGoogle } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const authenticatedEmails = [
    "junrey.lanas@lsu.edu.ph",
    "jorenlee.luna@lsu.edu.ph",
    "olario.andresedman@lsu.edu.ph",
    "harliequinmarc.quipit@lsu.edu.ph",
    "lordemmanuel.figueras@lsu.edu.ph",
    "edyrryle.ilisan@lsu.edu.ph",
    "kissy.garciano@lsu.edu.ph",
    "cathylynshaine.olandre@lsu.edu.ph",
    "lucymae.tan@lsu.edu.ph",
    "chrisheart.blanco@lsu.edu.ph",
    "wenamae.mabasa@lsu.edu.ph",
    "rueldean.buray@lsu.edu.ph",
    "abbykate.delapena@lsu.edu.ph",
    "ruffamae.aranez@lsu.edu.ph",
    "johnpiolo.mutia@lsu.edu.ph",
    "keith.ostia@lsu.edu.ph",
    "mark.barcelo@lsu.edu.ph",
    "alizanicole.gumapac@lsu.edu.ph"
  ];


  //!  Adds user token to localStorage upon signin
  useEffect(() => {
    if (user && localStorage.getItem("token")) {
      const filteredUsers = authenticatedEmails.find((arr) => arr === user.email);
      if (filteredUsers) {
        navigate('/welcome');
      }
      else {
        navigate('/')
        alert('You are not part of the org!')
      }
      // console.log(user);
    }
    else {
      navigate('/');
    }

  }, [user, loading, error, navigate]);



  return (
    <div className="flex h-screen">
      <div className="lg:m-auto my-10 mx-5">
        <div className='lg:shadow-2xl lg:box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className='lg:flex'>
            <div className='lg:w-80'>
              <img className="lg:w-80 shadow-box" src={slogan} alt="slogan logo" />
            </div>
            <div className='lg:w-80 lg:relative'>
              <div className='lg:absolute lg:top-1/2 left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pt-0 pt-10'>
                <StyledButton onClick={signInWithGoogle} className="mx-auto block">
                  <img className="lg:h-10 h-14 lg:shadow-box" src="/btn_google_signin_dark_pressed_web@2x.png" alt="signin" />
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;

const StyledButton = styled.button`
  transition: 0.15s;
  cursor: pointer;
`