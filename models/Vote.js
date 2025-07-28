const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  choice: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  userIp: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate votes from same IP
voteSchema.index({ questionId: 1, userIp: 1 }, { unique: true });

// Index for efficient queries
voteSchema.index({ questionId: 1, timestamp: -1 });
voteSchema.index({ timestamp: -1 });

// Static method to get vote statistics for a question
voteSchema.statics.getVoteStats = function(questionId) {
  return this.aggregate([
    { $match: { questionId: new mongoose.Types.ObjectId(questionId) } },
    {
      $group: {
        _id: '$choice',
        count: { $sum: 1 }
      }
    }
  ]);
};

// Static method to check if user has voted
voteSchema.statics.hasUserVoted = function(questionId, userIp) {
  return this.findOne({ questionId, userIp }).select('choice');
};

module.exports = mongoose.model('Vote', voteSchema); 