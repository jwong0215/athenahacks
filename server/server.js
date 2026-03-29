const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config(); // Load environment variables from .env file
const connectDB = require('./utils/db');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

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
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});