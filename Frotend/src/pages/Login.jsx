import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Signup from './Signup.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/user/login', user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log(response);
      const token = response.data.token;
      localStorage.setItem('token', token);

      if (response.data.msg === 'User Logged in successfully') {
        alert('User logged in successfully');
        navigate('/');  // Redirect to home, let ProtectRoute handle the rest
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="email"
        />
        
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="password"
        />
        
        <button type="submit">Login</button>
      </form>
      <Link to={'/forgotpassword'}>Forgot Password?</Link>
      <p>New to the Site? <Link to="/signup">Sign Up</Link></p>
    </>
  );
};

export default Login;
