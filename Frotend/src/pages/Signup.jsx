import React from 'react'
import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Login from './Login.jsx';

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [fullname, setfullname] = useState('');
    const[password, setPassword] = useState('');
    const[role, setSelectedRole] = useState('user')

    axios.defaults.withCredentials = true;

    function handleChange(e){
      setSelectedRole(e.target.value)
    }
    async function handleSubmit(e){
        e.preventDefault();
        const user = {fullname, email, password, role};
          console.log(user)
          try {
              const response = await axios.post('http://localhost:8080/user/signup',{fullname, email, password, role}, {
                  headers:{
                      "Content-Type":"application/json"
                    },
                  withCredentials: true
              })
              alert(response.data.msg)
              const token = response.data.token;
              localStorage.setItem('token', token);
              if(response.data.msg=='User created successfully'){
                navigate('/login')
              }
          } catch (error) {
              console.log(error)
          }
    }
  return (
    <>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
      <div>
      <label htmlFor="firstname">First Name</label>
      <input type="text" name='firstname' value={fullname} onChange={(e)=>setfullname(e.target.value)} autoComplete='username'/>
      </div>
      <br />
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete='useremail'/>
      </div>
      <br />
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='current-password'/>
      </div>
      <br />
      <label htmlFor="role">Select a Role: </label>
      <select id='role' value={role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type='submit'>SignUp</button>
      </form>
      <p>Aleady have an Account <Link to='/login'>Login</Link></p>
    </>
  )
}

export default Signup
