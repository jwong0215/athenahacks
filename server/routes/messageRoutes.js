const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// get all messages for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const messages = await Message.find({ sessionId: req.params.sessionId })
      .sort({ createdAt: 1 }); // oldest first so chat reads top to bottom
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post a new message
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;