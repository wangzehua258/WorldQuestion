const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
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
  isActive: {
    type: Boolean,
    default: false
  },
  aiSummary: {
    type: String,
    default: ''
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
questionSchema.index({ date: -1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ category: 1 });

// Virtual for calculating percentages
questionSchema.virtual('yesPercentage').get(function() {
  if (this.totalVotes === 0) return 0;
  return Math.round((this.yesVotes / this.totalVotes) * 100);
});

questionSchema.virtual('noPercentage').get(function() {
  if (this.totalVotes === 0) return 0;
  return Math.round((this.noVotes / this.totalVotes) * 100);
});

// Ensure virtuals are serialized
questionSchema.set('toJSON', { virtuals: true });
questionSchema.set('toObject', { virtuals: true });

// Static method to get current active question
questionSchema.statics.getCurrentQuestion = function() {
  return this.findOne({ isActive: true }).sort({ date: -1 });
};

// Static method to get historical questions
questionSchema.statics.getHistoricalQuestions = function(limit = 10) {
  return this.find({ isActive: false })
    .sort({ date: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Question', questionSchema); 