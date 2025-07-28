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

// Static method to archive current question and make a proposed question active
questionSchema.statics.rotateWeeklyQuestion = async function() {
  try {
    // 1. Archive current active question
    const currentActive = await this.findOne({ isActive: true });
    if (currentActive) {
      currentActive.isActive = false;
      currentActive.archivedAt = new Date();
      await currentActive.save();
    }

    // 2. Get the top voted proposed question
    const ProposedQuestion = require('./ProposedQuestion');
    const topProposal = await ProposedQuestion.findOne({ 
      status: 'active' 
    }).sort({ votes: -1 });

    if (topProposal) {
      // 3. Create new active question from the top proposal
      const newQuestion = new this({
        text: topProposal.text,
        category: topProposal.category,
        tags: topProposal.tags,
        isActive: true,
        createdAt: new Date(),
        yesVotes: 0,
        noVotes: 0,
        comments: []
      });
      await newQuestion.save();

      // 4. Update the proposed question status
      topProposal.status = 'selected';
      topProposal.selectedAt = new Date();
      await topProposal.save();

      return {
        success: true,
        archivedQuestion: currentActive,
        newQuestion: newQuestion,
        selectedProposal: topProposal
      };
    } else {
      // If no proposals, create a default question
      const defaultQuestion = new this({
        text: "Should we continue to explore and innovate in technology?",
        category: "technology",
        tags: ["innovation", "future", "technology"],
        isActive: true,
        createdAt: new Date(),
        yesVotes: 0,
        noVotes: 0,
        comments: []
      });
      await defaultQuestion.save();

      return {
        success: true,
        archivedQuestion: currentActive,
        newQuestion: defaultQuestion,
        selectedProposal: null
      };
    }
  } catch (error) {
    console.error('Error rotating weekly question:', error);
    throw error;
  }
};

module.exports = mongoose.model('Question', questionSchema); 