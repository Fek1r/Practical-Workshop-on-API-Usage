import React, { useEffect, useState } from 'react';
// import { loginUser } from '../services/api';
import './form.css';
// import users from '../users.json';
// import fs from 'fs'
// const fs = require('fs');

const API_URL = "http://localhost:8080/users";

const LoginForm = () => {
  const [formData, setFormData] = useState({ id: '', name: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });
        fetchUsers();
    } catch (error) {
      console.log("Error: ", error);
      setMessage('Login failed. Reason: ' + error);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          </div>
          <div className='input-group'>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className='login-button'>Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;