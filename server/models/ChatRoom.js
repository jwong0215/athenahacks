const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  school: { type: String, required: true },
  goal: { type: String, enum: ['exam prep', 'homework', 'general'], required: true },
  intent: { type: String, enum: ['focus', 'help'], required: true },
  participants: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);