const express = require('express');

const { generateVoiceNudge } = require('../utils/elevenLabs');

const StudySession = require('../models/StudySession');
const ChatRoom = require('../models/ChatRoom');

const router = express.Router();


// Route: Generate study summary (static response)
router.post('/study-summary', (req, res) => {
  const { timeStudied } = req.body;
  // Simple static summary
  const summary = `You studied for ${timeStudied} minutes. Great job!`;
  res.json({ summary });
});

// Route: Generate voice nudge using 11Labs
router.post('/voice-nudge', async (req, res) => {
  const { message, tone } = req.body;

  try {
    const audioUrl = await generateVoiceNudge(message, tone);
    res.json({ audioUrl });
  } catch (error) {
    console.error('Error generating voice nudge:', error);
    res.status(500).json({ error: 'Failed to generate voice nudge' });
  }
});

module.exports = router;

// --- Study Session Endpoints ---

// Save a study session
router.post('/study-session', async (req, res) => {
  const { userId, durationMinutes } = req.body;
  try {
    const session = new StudySession({ userId, durationMinutes });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error saving study session:', error);
    res.status(500).json({ error: 'Failed to save study session' });
  }
});

// Get all study sessions for a user
router.get('/study-session/:userId', async (req, res) => {
  try {
    const sessions = await StudySession.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching study sessions:', error);
    res.status(500).json({ error: 'Failed to fetch study sessions' });
  }
});

// --- Chat Room Endpoints ---

// Create a chat room
router.post('/chat-room', async (req, res) => {
  const { name, type } = req.body;
  try {
    const room = new ChatRoom({ name, type });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ error: 'Failed to create chat room' });
  }
});

// Get all chat rooms
router.get('/chat-room', async (req, res) => {
  try {
    const rooms = await ChatRoom.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
});