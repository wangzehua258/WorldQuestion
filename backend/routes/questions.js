const express = require('express');
const { body, validationResult } = require('express-validator');
const Question = require('../models/Question');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');

const router = express.Router();

// Get current active question
router.get('/current', async (req, res) => {
  try {
    const question = await Question.getCurrentQuestion();
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'No active question found'
      });
    }

    // Get 3 random comments for the question
    const randomComments = await Comment.getRandomComments(question._id, 3);

    const questionData = {
      ...question.toJSON(),
      comments: randomComments
    };

    res.json({
      success: true,
      data: questionData
    });
  } catch (error) {
    console.error('Error fetching current question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get historical questions
router.get('/history', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const questions = await Question.find({ isActive: false })
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Question.countDocuments({ isActive: false });

    res.json({
      success: true,
      data: {
        questions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          total,
          hasNext: skip + questions.length < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching historical questions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get question by ID with votes and comments
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Get comments for the question
    const comments = await Comment.getPinnedComments(question._id, 10);

    const questionData = {
      ...question.toJSON(),
      comments: comments
    };

    res.json({
      success: true,
      data: questionData
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Vote on a question
router.post('/:id/vote', [
  body('choice').isIn(['yes', 'no']).withMessage('Choice must be either "yes" or "no"')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { choice } = req.body;
    const userIp = req.ip || req.connection.remoteAddress;

    // Check if question exists
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Check if user has already voted
    const existingVote = await Vote.hasUserVoted(id, userIp);
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted on this question'
      });
    }

    // Create new vote
    const vote = new Vote({
      questionId: id,
      choice,
      userIp,
      userAgent: req.get('User-Agent') || ''
    });

    await vote.save();

    // Update question vote counts
    if (choice === 'yes') {
      question.yesVotes += 1;
    } else {
      question.noVotes += 1;
    }
    question.totalVotes += 1;
    await question.save();

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: {
        choice,
        questionId: id
      }
    });
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get vote statistics for a question
router.get('/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;
    
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const stats = await Vote.getVoteStats(id);
    
    const voteStats = {
      totalVotes: question.totalVotes,
      yesVotes: question.yesVotes,
      noVotes: question.noVotes,
      yesPercentage: question.yesPercentage,
      noPercentage: question.noPercentage,
      breakdown: stats
    };

    res.json({
      success: true,
      data: voteStats
    });
  } catch (error) {
    console.error('Error fetching vote stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add comment to a question
router.post('/:id/comments', [
  body('content').isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { content, isAnonymous = true } = req.body;
    const userIp = req.ip || req.connection.remoteAddress;

    // Check if question exists
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Create new comment
    const comment = new Comment({
      questionId: id,
      content,
      isAnonymous,
      userIp,
      userAgent: req.get('User-Agent') || ''
    });

    await comment.save();

    res.json({
      success: true,
      message: 'Comment added successfully',
      data: comment
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get comments for a question
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, pinned = false } = req.query;

    // Check if question exists
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    let comments;
    if (pinned === 'true') {
      comments = await Comment.getPinnedComments(id, parseInt(limit));
    } else {
      comments = await Comment.getRecentComments(id, parseInt(limit));
    }

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get random comments for a question
router.get('/:id/comments/random', async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 3 } = req.query;

    // Check if question exists
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const comments = await Comment.getRandomComments(id, parseInt(limit));

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error('Error fetching random comments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Admin endpoint to manually trigger weekly rotation
router.post('/rotate-weekly', async (req, res) => {
  try {
    console.log('🔄 Manual weekly rotation triggered');
    
    const result = await Question.rotateWeeklyQuestion();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Weekly rotation completed successfully',
        data: {
          archivedQuestion: result.archivedQuestion ? {
            id: result.archivedQuestion._id,
            text: result.archivedQuestion.text,
            finalVotes: {
              yes: result.archivedQuestion.yesVotes,
              no: result.archivedQuestion.noVotes
            }
          } : null,
          newQuestion: {
            id: result.newQuestion._id,
            text: result.newQuestion.text,
            category: result.newQuestion.category
          },
          selectedProposal: result.selectedProposal ? {
            id: result.selectedProposal._id,
            text: result.selectedProposal.text,
            submittedBy: result.selectedProposal.submittedBy,
            votes: result.selectedProposal.votes
          } : null
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Weekly rotation failed'
      });
    }
  } catch (error) {
    console.error('Error in manual weekly rotation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during rotation'
    });
  }
});

module.exports = router; 