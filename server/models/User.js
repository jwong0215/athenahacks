const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profile fields
  school: { type: String, default: '' },
  educationLevel: { 
    type: String, 
    enum: ['High School', 'Undergraduate', 'Graduate', 'Other'], 
    default: 'Other' 
  },
  year: { 
    type: String, 
    enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Other'], 
    default: 'Other' 
  },
  major: { type: String, default: '' },
  studyStyle: { type: [String], default: [] }, // array of strings, max 5 choices enforced later
  aboutMe: { type: String, default: '' },

  totalStudyTime: { type: Number, default: 0 },
  totalSessions: { type: Number, default: 0 },

  profilePublic: { type: Boolean, default: true },
  historyPublic: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);