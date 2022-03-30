import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

//!  Components
import Login from './components/Login';
import Welcome from './components/Welcome';
import Ballot from './components/Ballot';


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/');
    } else {
      navigate('/welcome');
    }
  }, [navigate])

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/> } />
        <Route exact path='/welcome' element={<Welcome/>} />
        <Route exact path='/ballot' element={<Ballot/>} />
      </Routes>
    </>
  )
}

export default App;