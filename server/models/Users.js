const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subjects: { type: [String], default: [] },   // e.g. ['#linguistics', '#history']
});

module.exports = mongoose.model('User', userSchema);