const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// get all sessions (with optional search by tag/title)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { goal: { $regex: search, $options: 'i' } },
      ];
    }

    // newest first
    const sessions = await Session.find(filter).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post create a new session
router.post('/', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// patch join a session (add yourself to participants/increment count)
router.patch('/:id/join', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $inc: { participantCount: 1 } },
      { new: true }
    );
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a single session by ID                      // ← ADD
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;