import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transaction from './components/Transaction';
import Alert from './components/Alert';
import { useState } from 'react';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import VerifyToken from './components/VerifyToken';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [appAlert, setAppAlert] = useState({
    bg:"warning",
    message:"Warning ! Somethng Wrong",
    display: "none"
  });
  
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Router basename='/cash-calc'>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        
      />
        <Navbar />
        <br /><br />

        <Routes>
          <Route exact path='/cash-clac' element={<Home setAppAlert={setAppAlert} setProgress={setProgress}/>} />
          <Route exact path='/transactions' element={<Transaction setAppAlert={setAppAlert} setProgress={setProgress}/>} />
          <Route exact path='/profile' element={<Profile setAppAlert={setAppAlert} setProgress={setProgress}/>} />

          <Route exact path='/login' element={<Login setAppAlert={setAppAlert} setProgress={setProgress}/>} />
          <Route exact path='/register' element={<Register setAppAlert={setAppAlert} setProgress={setProgress}/>} />
          <Route exact path='/forgotpassword' element={<ForgotPassword setAppAlert={setAppAlert} setProgress={setProgress} />} />
          <Route exact path='/verifytoken' element={<VerifyToken setAppAlert={setAppAlert} setProgress={setProgress}/>} />
          <Route  path='*' element={<NotFound />} />
        </Routes>
        <Alert bg={appAlert.bg} message={appAlert.message} display={appAlert.display} />

      </Router>
    </>
  );
}

export default App;
