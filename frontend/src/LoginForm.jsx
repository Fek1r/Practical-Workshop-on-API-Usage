import React, { useEffect, useState } from 'react';
// import { loginUser } from '../services/api';
import './form.css';
// import fs from 'fs'
// const fs = require('fs');

const API_URL = "http://localhost:8080/";

const LoginForm = () => {
	const [formData, setFormData] = useState({ name: '', password: '' });
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
			const response = await fetch("http://localhost:8080/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
	
			if (response.ok) {
				setMessage("User added successfully!");
			} else {
				setMessage("Error adding user.");
			}
		} catch (error) {
			setMessage("Request failed: " + error);
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
					<div className='input-group'>
						<input type="password" name="password" placeholder=" Confirm your Password" onChange={handleChange} required />
					</div>
					<button type="submit" className='login-button'>REGISTER</button>
					{message && <p>{message}</p>}
				</form>
			</div>
		</div>
	);
};

export default LoginForm;