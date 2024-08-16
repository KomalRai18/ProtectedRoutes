import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const response = await axios.post(
        'http://localhost:8080/user/forgotpassword',
        { email },
        {
          headers: {
            'content-type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      console.log('Response:', response);
      if (response.status) {
        alert('Check your mailbox...');
      } else {
        console.log('Unexpected response structure:', response.data);
        alert('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('An error occurred. Please check your network or try again later.');
    }
  }

  return (
    <>
      <h1>Forgot Password</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>Enter your Email</label>
        <input
          type='email'
          name='email'
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <button type='submit'>Send</button>
      </form>
    </>
  );
};

export default ForgotPassword;
