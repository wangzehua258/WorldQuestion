const mongoose = require('mongoose');

const proposedQuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    enum: ['technology', 'society', 'environment', 'politics', 'science', 'culture'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  submittedBy: {
    type: String,
    default: 'Anonymous'
  },
  userIp: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  votes: {
    type: Number,
    default: 0
  },
  voters: [{
    userIp: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'selected', 'rejected'],
    default: 'active'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
proposedQuestionSchema.index({ status: 1, votes: -1 });
proposedQuestionSchema.index({ submittedAt: -1 });
proposedQuestionSchema.index({ category: 1 });

// Static method to get active proposed questions
proposedQuestionSchema.statics.getActiveProposals = function(limit = 20) {
  return this.find({ status: 'active' })
    .sort({ votes: -1, submittedAt: -1 })
    .limit(limit);
};

// Static method to check if user has voted on a proposal
proposedQuestionSchema.statics.hasUserVoted = function(proposalId, userIp) {
  return this.findOne({
    _id: proposalId,
    'voters.userIp': userIp
  });
};

// Static method to vote on a proposal
proposedQuestionSchema.statics.voteOnProposal = function(proposalId, userIp) {
  return this.findByIdAndUpdate(
    proposalId,
    {
      $inc: { votes: 1 },
      $push: { voters: { userIp, timestamp: new Date() } }
    },
    { new: true }
  );
};

// Static method to get top proposals
proposedQuestionSchema.statics.getTopProposals = function(limit = 10) {
  return this.find({ status: 'active' })
    .sort({ votes: -1 })
    .limit(limit);
};

module.exports = mongoose.model('ProposedQuestion', proposedQuestionSchema); 