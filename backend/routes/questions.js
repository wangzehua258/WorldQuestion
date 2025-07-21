const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Vote = require('../models/Vote');
const Joi = require('joi');

// Validation schemas
const voteSchema = Joi.object({
  vote: Joi.string().valid('yes', 'no').required(),
  sessionId: Joi.string().optional()
});

const commentSchema = Joi.object({
  text: Joi.string().max(500).required(),
  isAnonymous: Joi.boolean().default(true)
});

// Get current question
router.get('/current', async (req, res) => {
  try {
    const currentQuestion = await Question.findOne({ isActive: true })
      .sort({ date: -1 })
      .limit(1);
    
    if (!currentQuestion) {
      return res.status(404).json({ message: 'No active question found' });
    }
    
    res.json(currentQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all questions (for history)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    const query = {};
    if (category) {
      query.category = category;
    }
    
    const questions = await Question.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Question.countDocuments(query);
    
    res.json({
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Vote on a question
router.post('/:id/vote', async (req, res) => {
  try {
    const { error, value } = voteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const question = await Question.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Check if user already voted
    const existingVote = await Vote.findOne({
      questionId: req.params.id,
      $or: [
        { userId: req.body.userId },
        { sessionId: req.body.sessionId }
      ]
    });
    
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted on this question' });
    }
    
    // Create vote record
    const vote = new Vote({
      questionId: req.params.id,
      vote: value.vote,
      userId: req.body.userId,
      sessionId: value.sessionId,
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip
    });
    
    await vote.save();
    
    // Update question vote counts
    const updateField = value.vote === 'yes' ? 'yesVotes' : 'noVotes';
    await Question.findOneAndUpdate(
      { id: req.params.id },
      { 
        $inc: { 
          [updateField]: 1,
          totalVotes: 1
        }
      }
    );
    
    // Return updated question
    const updatedQuestion = await Question.findOne({ id: req.params.id });
    res.json(updatedQuestion);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment to question
router.post('/:id/comments', async (req, res) => {
  try {
    const { error, value } = commentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const question = await Question.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const comment = {
      id: require('uuid').v4(),
      text: value.text,
      isAnonymous: value.isAnonymous,
      userId: req.body.userId,
      timestamp: new Date()
    };
    
    question.comments.push(comment);
    await question.save();
    
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get trending questions
router.get('/trending/top', async (req, res) => {
  try {
    const trendingQuestions = await Question.find({ isActive: true })
      .sort({ totalVotes: -1 })
      .limit(5);
    
    res.json(trendingQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 