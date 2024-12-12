import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import PrivateRouter from './components/PrivateRouter';
import DefaultLayout from './components/DefaultLayout';
import SimpleLayout from './components/SimpleLayout';

import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Register from './pages/register/Register';
import Validate from './pages/validate/Validate';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Home from './pages/home/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<PrivateRouter/>}>
            <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
            <Route path='/profile' element={<DefaultLayout><Profile/></DefaultLayout>}/>
          </Route>

          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>}/>
          <Route path='/register' element={<SimpleLayout><Register/></SimpleLayout>}/>
          <Route path='/validate' element={<SimpleLayout><Validate /></SimpleLayout>} />
          <Route path='/forgot-password' element={<SimpleLayout><ForgotPassword/></SimpleLayout>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
} export default App;
