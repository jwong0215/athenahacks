const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI, " is working...");
    await mongoose.connect("mongodb+srv://AudreyLau123:Caitlyn1@cluster0.waztg0f.mongodb.net/?appName=Cluster0" || 'mongodb://localhost:27017/athenahacks');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
