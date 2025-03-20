import React, { useState } from 'react';
import { registerUser } from '../services/api';

const RegistrationForm = () => {
	const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '', age: 0 });
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerUser(formData);
			setMessage('Registration successful.');
		} catch (error) {
			setMessage('Registration failed.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="name" placeholder="Name" onChange={handleChange} required />
			<input type="text" name="username" placeholder="Username" onChange={handleChange} required />
			<input type="email" name="email" placeholder="E-mail address" onChange={handleChange} required />
			<input type="password" name="password" placeholder="Password" onChange={handleChange} required />
			<input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required />
			<input type="number" name="age" placeholder="Age" onChange={handleChange} />
			<button type="submit">Register</button>
			{message && <p>{message}</p>}
		</form>
	);
};

export default RegistrationForm;
