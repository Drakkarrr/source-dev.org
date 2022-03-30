import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Ballot from './pages/PageBallot';
import Landing from './pages/PageLanding';
import Welcome from './pages/PageWelcome';



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
        <Route exact path='/' element={<Landing />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/ballot' element={<Ballot/>} />
      </Routes>
    </>
  )
}

export default App;