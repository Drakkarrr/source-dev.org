import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { db } from './auth/firebase';
import 'firebase/compat/auth';
import candidates from './candidates.json';
import './App.css';

//!  Components
import Login from './components/Login';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Ballot from './components/Ballot';


const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/');
    } else {
      navigate('/welcome');
    }
  }, [navigate])

  const welcomeProps = {
    candidates,
    db,
    user,
    setUser
  };

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/> } />
        <Route path='/welcome' element={<Welcome {...welcomeProps} />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/ballot' element={<Ballot/>} />
      </Routes>
    </>
  )
}

export default App;