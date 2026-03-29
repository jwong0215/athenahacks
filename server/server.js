const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const aiRoutes = require('./routes/aiRoutes');
const mongoose = require('mongoose');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config(); // Load environment variables from .env file
const connectDB = require('./utils/db');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiRoutes);
// login/signup routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use(express.urlencoded({ extended: true }));

// Start the server
const http = require('http');
const { Server } = require('socket.io');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// when a user connects
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // when user joins a session room
  socket.on('join-session', (sessionId) => {
    socket.join(sessionId);
    console.log(`Socket ${socket.id} joined session ${sessionId}`);
  });

  // when user sends a chat message
  socket.on('send-message', (data) => {
    // Broadcast to everyone else in the same session room
    io.to(data.sessionId).emit('receive-message', data);
  });

  // when user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});