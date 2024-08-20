import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import PrivateRouter from './components/PrivateRouter';
import DefaultLayout from './components/DefaultLayout';
import SimpleLayout from './components/SimpleLayout';

import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<PrivateRouter/>}>
            <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
          </Route>

          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>}/>
          <Route path='/register' element={<SimpleLayout><Register/></SimpleLayout>}/>
          <Route path='/forgot-password' element={<SimpleLayout><ForgotPassword/></SimpleLayout>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
} export default App;
