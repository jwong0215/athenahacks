const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// GET all sessions (with optional search by tag/title)
router.get('/', async (req, res) => {
  try {
    const { search, visibility } = req.query;
    let filter = {};

    if (visibility && visibility !== 'all') {
      filter.visibility = visibility;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } }
      ];
    }

    // newest first
    const sessions = await Session.find(filter).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new session
router.post('/', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH join a session (add yourself to participants)
router.patch('/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { participants: userId } }, // $addToSet avoids duplicates
      { new: true }
    );
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;