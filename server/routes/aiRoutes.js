const express = require('express');

const { generateVoiceNudge } = require('../utils/elevenLabs');

const StudySession = require('../models/StudySession');
const ChatRoom = require('../models/ChatRoom');

const router = express.Router();

const mongoose = require('mongoose'); // make sure this is imported at top if not already


// --- DEBUG: log all incoming requests ---
router.use((req, res, next) => {
  console.log('=======================');
  console.log('METHOD:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('BODY:', req.body);
  console.log('PARAMS:', req.params);
  console.log('QUERY:', req.query);
  console.log('=======================');
  next();
});

// Leave a chat room
router.post('/chat-room/:roomId/leave', async (req, res) => {
  const { roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ error: 'Invalid room ID' });
  }

  try {
    const room = await ChatRoom.findByIdAndUpdate(
      roomId,
      { $inc: { participants: -1 } },
      { new: true }
    );

    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Ensure participants don't go below 0
    if (room.participants < 0) {
      room.participants = 0;
      await room.save();
    }

    console.log(`User left room: ${room.title}, participants: ${room.participants}`);
    res.json(room);
  } catch (error) {
    console.error('Error leaving chat room:', error);
    res.status(500).json({ error: 'Failed to leave chat room' });
  }
});

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


// --- Study Session Endpoints ---

// Save a study session
router.post('/study-session', async (req, res) => {
  console.log("BODY:", req.body);
  //const { userId, durationMinutes } = req.body;
  const userId = req.body?.userId;
  const durationMinutes = req.body?.durationMinutes;
  if (!userId || !durationMinutes) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }
  console.log("Received:", { userId, durationMinutes });
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
  const { title, subject, school, goal, intent, participants } = req.body;

  if (!title || !school || !subject || !goal || !intent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const room = new ChatRoom({
      title,
      subject,
      school,
      goal,
      intent,
      participants: participants || 0
    });

    await room.save();
    console.log('Created room:', room); // Terminal log
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

// Join a chat room
router.post('/chat-room/:roomId/join', async (req, res) => {
  const { roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ error: 'Invalid room ID' });
  }

  try {
    // Find the room and increment participants by 1
    const room = await ChatRoom.findByIdAndUpdate(
      roomId,
      { $inc: { participants: 1 } },  // increment participants
      { new: true }                   // return the updated document
    );

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    console.log(`User joined room: ${room.title}, participants: ${room.participants}`);
    res.json(room);  // send back updated room info
  } catch (error) {
    console.error('Error joining chat room:', error);
    res.status(500).json({ error: 'Failed to join chat room' });
  }
});

// analystics endpoint to get total study time for a user
router.get('/study-stats/:userId', async (req, res) => {
  try {
    const sessions = await StudySession.find({ userId: req.params.userId });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No study sessions found for this user.' });
    }

    const totalTime = sessions.reduce((sum, session) => sum + session.durationMinutes, 0);
    const totalSessions = sessions.length;
    const averageSession = totalTime / totalSessions;

    res.json({
      totalTime,
      totalSessions,
      averageSession
    });
  } catch (error) {
    console.error('Error fetching study stats:', error);
    res.status(500).json({ error: 'Failed to compute study stats' });
  }
});

// export at the very end
module.exports = router;
