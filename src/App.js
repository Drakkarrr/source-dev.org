import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './auth/firebase';
import './App.css';


//!  Components
import Login from './components/Login';
import Verify from './components/Verify';
import Welcome from './components/Welcome';
import PageBallot from './pages/PageBallot';
import NotAuthorized from './components/NotAuthorized';
import Voted from './components/Voted';



const App = () => {
  const navigate = useNavigate();
  const [isVoted, setIsVoted] = useState(false);
  const [user] = useAuthState(auth);


  //!  Protected routes: navigate user to login if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/');
    } else {
      navigate('/welcome');
    }

  }, [])


  
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setIsVoted(true), 5000);
      if (timer === 10) {
        setIsVoted(true)
      }
    }
  }, [user])


  return (
    <>
      <Routes>
        <Route exact path='/' element={isVoted ? <Voted /> : <Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/ballot' element={<PageBallot />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/not-authorized' element={<NotAuthorized />} />
      </Routes>
    </>
  )
}

export default App;