const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => require('uuid').v4()
  },
  text: {
    type: String,
    required: true,
    maxlength: 500
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  userId: {
    type: String,
    required: false
  }
});

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => require('uuid').v4()
  },
  text: {
    type: String,
    required: true,
    maxlength: 200
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalVotes: {
    type: Number,
    default: 0
  },
  yesVotes: {
    type: Number,
    default: 0
  },
  noVotes: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  trendAnalysis: {
    type: String,
    required: true,
    maxlength: 1000
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['technology', 'society', 'environment', 'politics', 'science', 'culture'],
    default: 'society'
  },
  tags: [{
    type: String,
    maxlength: 20
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

questionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

questionSchema.virtual('yesPercentage').get(function() {
  if (this.totalVotes === 0) return 0;
  return Math.round((this.yesVotes / this.totalVotes) * 100);
});

questionSchema.virtual('noPercentage').get(function() {
  if (this.totalVotes === 0) return 0;
  return Math.round((this.noVotes / this.totalVotes) * 100);
});

module.exports = mongoose.model('Question', questionSchema); 