import React, { useState } from 'react';
import './loginform.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginForm = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users////jdngkjdbfkjbdkjbfgjkdkf/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("User logged in successfully!");
      } else {
        setMessage("Error logging in user.");
      }
    } catch (error) {
      setMessage("Request failed: " + error);
    }
  };

  return (
    <div className='reg-container'>
      <div className='login-box'>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='login-button'>
            REGISTER
          </button>

          {/* Use Link for navigation to the registration page */}
          <Link to="/register">
            <button type="button" className='login-button'>
              GO TO REGISTER
            </button>
          </Link>

          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
