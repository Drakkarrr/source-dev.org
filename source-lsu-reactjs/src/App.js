import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import './App.css';
import Landing from './pages/PageLanding';
import Welcome from './pages/PageWelcome';
import PageWelcomeBack from './pages/PageWelcomeBack';

const App = () => {
  const navigate = useNavigate();

 useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate('/');
        } else {
          navigate('/welcome');
            
       }
 }, [])
    
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/welcome-back' element={<PageWelcomeBack/>} />
      </Routes>
    </>
  )
} 

export default App;