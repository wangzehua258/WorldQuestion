const express = require('express');
const { body, validationResult } = require('express-validator');
const ProposedQuestion = require('../models/ProposedQuestion');

const router = express.Router();

// Get all active proposed questions
router.get('/', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const proposals = await ProposedQuestion.getActiveProposals(parseInt(limit));

    // Transform the data to include both _id and id
    const transformedProposals = proposals.map(proposal => {
      const proposalObj = proposal.toObject();
      return {
        ...proposalObj,
        id: proposalObj._id
      };
    });

    res.json({
      success: true,
      data: transformedProposals
    });
  } catch (error) {
    console.error('Error fetching proposed questions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get top proposed questions
router.get('/top', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const topProposals = await ProposedQuestion.getTopProposals(parseInt(limit));

    // Transform the data to include both _id and id
    const transformedProposals = topProposals.map(proposal => {
      const proposalObj = proposal.toObject();
      return {
        ...proposalObj,
        id: proposalObj._id
      };
    });

    res.json({
      success: true,
      data: transformedProposals
    });
  } catch (error) {
    console.error('Error fetching top proposed questions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Submit a new proposed question
router.post('/', [
  body('text').isLength({ min: 10, max: 500 }).withMessage('Question must be between 10 and 500 characters'),
  body('category').isIn(['technology', 'society', 'environment', 'politics', 'science', 'culture']).withMessage('Invalid category'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('submittedBy').optional().isLength({ max: 50 }).withMessage('Name must be less than 50 characters')
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

    const { text, category, tags = [], submittedBy = 'Anonymous' } = req.body;
    const userIp = req.ip || req.connection.remoteAddress;

    // Check if user has already submitted too many proposals recently (prevent spam)
    const recentSubmissions = await ProposedQuestion.countDocuments({
      userIp,
      submittedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    if (recentSubmissions >= 5) {
      return res.status(429).json({
        success: false,
        message: 'You can only submit 5 questions per day. Please try again tomorrow.'
      });
    }

    // Create new proposed question
    const proposedQuestion = new ProposedQuestion({
      text,
      category,
      tags,
      submittedBy,
      userIp,
      userAgent: req.get('User-Agent') || ''
    });

    await proposedQuestion.save();

    // Transform the data to include both _id and id
    const transformedQuestion = {
      ...proposedQuestion.toObject(),
      id: proposedQuestion._id
    };

    res.json({
      success: true,
      message: 'Question proposed successfully',
      data: transformedQuestion
    });
  } catch (error) {
    console.error('Error submitting proposed question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Vote on a proposed question
router.post('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const userIp = req.ip || req.connection.remoteAddress;

    // Check if proposal exists
    const proposal = await ProposedQuestion.findById(id);
    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: 'Proposed question not found'
      });
    }

    // Check if user has already voted
    const hasVoted = await ProposedQuestion.hasUserVoted(id, userIp);
    if (hasVoted) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted on this question'
      });
    }

    // Vote on the proposal
    const updatedProposal = await ProposedQuestion.voteOnProposal(id, userIp);

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: {
        votes: updatedProposal.votes,
        proposalId: id
      }
    });
  } catch (error) {
    console.error('Error voting on proposed question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get a specific proposed question
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const proposal = await ProposedQuestion.findById(id);
    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: 'Proposed question not found'
      });
    }

    // Transform the data to include both _id and id
    const transformedProposal = {
      ...proposal.toObject(),
      id: proposal._id
    };

    res.json({
      success: true,
      data: transformedProposal
    });
  } catch (error) {
    console.error('Error fetching proposed question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 