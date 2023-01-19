import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transaction from './components/Transaction';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/transaction' element={<Transaction />} />

          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route  path='*' element={<NotFound />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
