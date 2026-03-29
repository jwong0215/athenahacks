const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },  // which session this belongs to
  sender: { type: String, required: true },      // username or AI
  text: { type: String, required: true },
  type: { type: String, enum: ['user', 'ai'], default: 'user' }, // which chat panel
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);