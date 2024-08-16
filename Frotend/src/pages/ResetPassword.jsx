import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/user/resetpassword',
        password,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (response.data.msg === 'Passwords do not match.') {
        alert('Passwords do not match');
      }
      if (response.data.msg === 'Password Updated Successfully') {
        alert('Password Updated Successfully');
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Reset Password</h1>
      <form encType='multipart/form-data' onSubmit={submitHandler}>
        <label htmlFor='newpassword'>New Password</label>
        <input
          type='password'
          name='newpassword'
          id='newpassword'
          autoComplete='off'
          value={password.newPassword}
          onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
        />
        <br />
        <label htmlFor='confirmpassword'>Confirm Password</label>
        <input
          type='password'
          name='confirmpassword'
          id='confirmpassword'
          autoComplete='off'
          value={password.confirmPassword}
          onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
        />
        <br />
        <button type='submit'>Reset Password</button>
      </form>
    </>
  );
};

export default ResetPassword;


