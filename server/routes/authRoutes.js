const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = "your_secret_here"; // in production, put this in .env

// POST /signup
router.post('/signup', async (req, res) => {
  const {
    username,
    password,
    school,
    educationLevel,
    year,
    major,
    studyStyle,
    aboutMe,
    profilePublic,
    historyPublic
  } = req.body || {};  // safe destructuring

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already taken' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Limit studyStyle array to max 5 choices
    const trimmedStudyStyle = Array.isArray(studyStyle) ? studyStyle.slice(0, 5) : [];

    const user = new User({
      username,
      password: hashedPassword,
      school: school || '',
      educationLevel: educationLevel || 'Other',
      year: year || 'Other',
      major: major || '',
      studyStyle: trimmedStudyStyle,
      aboutMe: aboutMe || '',
      profilePublic: profilePublic ?? true,
      historyPublic: historyPublic ?? true,
      totalStudyTime: 0,
      totalSessions: 0
    });

    await user.save();

    // Return token immediately
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      userId: user._id,
      username: user.username,
      token,
      profile: {
        school: user.school,
        educationLevel: user.educationLevel,
        year: user.year,
        major: user.major,
        studyStyle: user.studyStyle,
        aboutMe: user.aboutMe,
        profilePublic: user.profilePublic,
        historyPublic: user.historyPublic,
        totalStudyTime: user.totalStudyTime,
        totalSessions: user.totalSessions
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      userId: user._id,
      username: user.username,
      token,
      profile: {
        school: user.school,
        educationLevel: user.educationLevel,
        year: user.year,
        major: user.major,
        studyStyle: user.studyStyle,
        aboutMe: user.aboutMe,
        profilePublic: user.profilePublic,
        historyPublic: user.historyPublic,
        totalStudyTime: user.totalStudyTime,
        totalSessions: user.totalSessions
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;