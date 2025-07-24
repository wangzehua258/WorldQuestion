const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    default: null
  },
  userIp: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  likes: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
commentSchema.index({ questionId: 1, timestamp: -1 });
commentSchema.index({ isPinned: 1, questionId: 1 });
commentSchema.index({ timestamp: -1 });

// Static method to get pinned comments for a question
commentSchema.statics.getPinnedComments = function(questionId, limit = 5) {
  return this.find({ 
    questionId, 
    isPinned: true 
  })
  .sort({ timestamp: -1 })
  .limit(limit);
};

// Static method to get random comments for a question
commentSchema.statics.getRandomComments = function(questionId, limit = 3) {
  return this.aggregate([
    { $match: { questionId: new mongoose.Types.ObjectId(questionId) } },
    { $sample: { size: limit } },
    { $sort: { timestamp: -1 } }
  ]);
};

// Static method to get recent comments for a question
commentSchema.statics.getRecentComments = function(questionId, limit = 10) {
  return this.find({ questionId })
    .sort({ timestamp: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Comment', commentSchema); 