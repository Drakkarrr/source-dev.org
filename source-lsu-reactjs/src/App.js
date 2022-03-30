import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

//!  Components
import Login from './components/Login';
import Home from './components/Home';


const App = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate('/');
  //   } else {
  //     navigate('/welcome');
  //   }
  // }, [navigate])

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/> } />
        <Route exact path='/welcome' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App;