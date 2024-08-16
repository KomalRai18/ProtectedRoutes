import axios from 'axios';
import React, {useState} from 'react'

const ChangePassword = () => {
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    async function submitHandler(e){
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/changepassword', password, {
                header:{"Content-Type":"application/json",},
                withCredentials: true
            })
            if(response){
                alert(response.data.msg);
                
            }
        } catch (error) {
            
        }
    }
  return (
    <>
     <h1>Change Password</h1>
     <form encType='multipart/form-data' onSubmit={submitHandler}>
        <label htmlFor="currentPassword">Current Password</label>
        <input type="password" name="currentPassword" id="currentPassword" autoComplete='off' value={password.currentPassword} onChange={(e)=>setPassword({...password, currentPassword: e.target.value})}/>
        <br />
        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" value={password.newPassword} onChange={(e)=>setPassword({...password, newPassword: e.target.value})}/>
        <br />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={password.confirmPassword} onChange={(e)=>setPassword({...password, confirmPassword: e.target.value})}/>
        <br />
        <button type='submit'>Change Password</button>
     </form> 
    </>
  )
}

export default ChangePassword
