const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, default: '' },
  course: { type: String, default: '' },
  intent: { type: String, enum: ['focus', 'help'], default: 'focus' },
  visibility: { type: String, enum: ['public', 'friends-only', 'private'], default: 'public' },
  host: { type: String, required: true }, // user ID or name for now ?
  participants: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);