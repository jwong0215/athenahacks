const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const StudySession = mongoose.model('StudySession', studySessionSchema);

module.exports = StudySession;
