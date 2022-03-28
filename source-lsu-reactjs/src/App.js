import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/PageLanding';
import Welcome from './pages/PageWelcome';
import PageWelcomeBack from './pages/PageWelcomeBack';

function App() {
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
