import React, { useState } from 'react';
import { MdMail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import "./form.css";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onRegister({ username, email, password });
  };

  return (
    <>
      <div class="title"><span>Registration Form</span></div>
      <form onSubmit={handleSubmit}>
        <div className='field'>
        <i className='user-icon'><FaUser/></i>
          <input type="text" id="username"  placeholder= "Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='field'>
        <i className='email-icon'><MdMail/></i>
          <input type="email" id="email" placeholder= "Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='field'>
        <i className='user-icon'><FaLock/></i>
          <input type="password" id="password" placeholder= "Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='field button'>
        <input type="submit" value="Register"/>
        </div>
       
      </form>
      {/* <p>Already have an account? <button type="button" onClick={switchToLoginForm}>Login</button></p> */}
    </>
   
  );
};

export default RegisterForm;
