const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, default: true },
  goal: { type: String, enum: ['exam prep', 'homework', 'general'], default: 'general' },
  intent: { type: String, enum: ['focus', 'help'], default: 'focus' },
  participantCount: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);