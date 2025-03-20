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
		<div className='login-container'>
			<div className='login-box'>
				<form onSubmit={handleSubmit}>
					<div className='input-group'>
						<input type="email" name="email" placeholder="E-mail address" onChange={handleChange} required />
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
