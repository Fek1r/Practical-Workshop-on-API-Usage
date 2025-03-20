const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/profile', async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		res.status.send('Server error.');
	}
});

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = new User({ username, email, password });
		await user.save();
		res.status(201).send('User registered.');
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).send('User not found.');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).send('Invalid credentials.');

		const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
