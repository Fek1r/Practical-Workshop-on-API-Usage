import React, { useState } from 'react';
import { loginUser } from '../services/api';
import './form.css';

const LoginForm = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser(formData);
			localStorage.setItem('token', response.data.token);
			setMessage('Login successful.');
		} catch (error) {
			setMessage('Login failed.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" name="email" placeholder="E-mail address" onChange={handleChange} required />
			<input type="password" name="password" placeholder="Password" onChange={handleChange} required />
			<button type="submit">Login</button>
			{message && <p>{message}</p>}
		</form>
	);
};

export default LoginForm;
