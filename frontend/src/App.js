import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import DefaultLayout from './components/DefaultLayout';
import SimpleLayout from './components/SimpleLayout';

import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
} export default App;
