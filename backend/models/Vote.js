const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    ref: 'Question'
  },
  vote: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  userId: {
    type: String,
    required: false // Anonymous voting allowed
  },
  userAgent: {
    type: String,
    required: false
  },
  ipAddress: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: false
  }
});

// Compound index to prevent duplicate votes from same user/session
voteSchema.index({ questionId: 1, userId: 1 }, { sparse: true });
voteSchema.index({ questionId: 1, sessionId: 1 }, { sparse: true });

module.exports = mongoose.model('Vote', voteSchema); 