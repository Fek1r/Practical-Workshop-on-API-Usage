const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

app.use('/api/auth', authRoutes);
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
	console.log('New user connected.');
	socket.on('send_message', (message) => {
		io.emit('receive_message', message);
	});
});

mongoose.connect('mongodb://localhost:27017/user-portal', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected.'));

server.listen(5001, () => {
	console.log('Server running on port 5001.');
});
