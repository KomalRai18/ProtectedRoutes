import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import HomePage from './pages/HomePage.jsx';
import MyProvider from './utils/Provider.jsx';
import ProtectRoute from './utils/ProtectRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Navbar from './pages/component/Navbar.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';

export default function App() {
  return (
    <BrowserRouter>

      <MyProvider>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Admin Dashboard Route with Protection */}
          <Route element={<ProtectRoute role={['admin']} />}>
            <Route path='/admindashboard' element={<AdminDashboard />} />
          </Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
          <Route path='/forgotpassword/:token' element={<ChangePassword/>}/>
        </Routes>
      </MyProvider>
    </BrowserRouter>
  );
}
