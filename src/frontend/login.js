import React, { useState } from 'react';
import { FaLock, FaUser } from "react-icons/fa";
import "./form.css"

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <>
      <div class="title"><span>Login Form</span></div>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <i className='user-icon'><FaUser/></i>
         
          <input type="text" id="username" placeholder= "Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='field'>
        <i className='user-icon'><FaLock/></i>
          
          <input type="password" id="password"  placeholder= "Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='field button'>
        <input type="submit" value="Login"/>
        </div>
       
       
      </form>
     
    </>
  );
};

export default LoginForm;



