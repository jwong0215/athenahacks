const express = require('express');
const { generateStudySummary } = require('../utils/openai');
const { generateVoiceNudge } = require('../utils/elevenLabs');

const router = express.Router();

// Route: Generate study summary using OpenAI
router.post('/study-summary', async (req, res) => {
  const { timeStudied } = req.body;

  try {
    const summary = await generateStudySummary(timeStudied);
    res.json({ summary });
  } catch (error) {
    console.error('Error generating study summary:', error);
    res.status(500).json({ error: 'Failed to generate study summary' });
  }
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