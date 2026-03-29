const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get a user's subjects by their ID
router.get('/:id/subjects', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.subjects);    // returns e.g. ['#linguistics', '#history']
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;