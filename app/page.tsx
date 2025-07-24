'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, TrendingUp, Calendar, Share2, Users, Sparkles, CheckCircle, XCircle, Loader2, Plus, ThumbsUp, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { Question, ShareCard as ShareCardType, ProposedQuestion } from '@/types';
import { api } from '@/services/api';
import VoteChart from '@/components/VoteChart';
import ShareCard from '@/components/ShareCard';
import { sunsetOrangeTheme } from './themes/theme-4-sunset-orange';

export default function HomePage() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [historicalQuestions, setHistoricalQuestions] = useState<Question[]>([]);
  const [proposedQuestions, setProposedQuestions] = useState<ProposedQuestion[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showNextRound, setShowNextRound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alreadyVotedMsg, setAlreadyVotedMsg] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // Proposed question form state
  const [proposedQuestionText, setProposedQuestionText] = useState('');
  const [proposedQuestionCategory, setProposedQuestionCategory] = useState<'technology' | 'society' | 'environment' | 'politics' | 'science' | 'culture'>('technology');
  const [proposedQuestionTags, setProposedQuestionTags] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalVoteMsg, setProposalVoteMsg] = useState<string | null>(null);

  // Load current question on component mount
  useEffect(() => {
    loadCurrentQuestion();
    loadHistoricalQuestions();
    loadProposedQuestions();
  }, []);

  const loadCurrentQuestion = async () => {
    try {
      setLoading(true);
      const response = await api.getCurrentQuestion();
      if (response.success && response.data) {
        setCurrentQuestion(response.data);
      } else {
        setError(response.message || 'No active question found');
      }
    } catch (err) {
      console.error('Error loading current question:', err);
      setError('Failed to load current question');
    } finally {
      setLoading(false);
    }
  };

  const loadHistoricalQuestions = async () => {
    try {
      const response = await api.getHistoricalQuestions(1, 10);
      if (response.success && response.data) {
        setHistoricalQuestions(response.data.questions || []);
      }
    } catch (err) {
      console.error('Error loading historical questions:', err);
    }
  };

  const loadProposedQuestions = async () => {
    try {
      const response = await api.getProposedQuestions(20);
      if (response.success && response.data) {
        setProposedQuestions(response.data);
      }
    } catch (err) {
      console.error('Error loading proposed questions:', err);
    }
  };

  const handleVote = async (vote: 'yes' | 'no') => {
    if (!currentQuestion) return;

    try {
      const response = await api.voteOnQuestion(currentQuestion.id, vote);
      if (response.success) {
        setUserVote(vote);
        setHasVoted(true);
        setAlreadyVotedMsg(null);
        // Reload current question to get updated vote counts
        await loadCurrentQuestion();
      } else if (response.message === 'You have already voted on this question') {
        setHasVoted(true);
        setAlreadyVotedMsg('You have already voted on this question.');
        // Optionally, reload current question to show latest results
        await loadCurrentQuestion();
      } else {
        setError(response.message || 'Failed to record vote');
      }
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to record vote');
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !currentQuestion) return;

    try {
      setSubmittingComment(true);
      const response = await api.addComment(currentQuestion.id, commentText);
      if (response.success) {
        setCommentText('');
        // Reload current question to get updated comments
        await loadCurrentQuestion();
      } else {
        setError(response.message || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleSubmitProposedQuestion = async () => {
    if (!proposedQuestionText.trim() || !submittedBy.trim()) return;

    try {
      setSubmittingProposal(true);
      const tags = proposedQuestionTags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const response = await api.submitProposedQuestion(
        proposedQuestionText,
        proposedQuestionCategory,
        tags,
        submittedBy
      );
      if (response.success) {
        setProposedQuestionText('');
        setProposedQuestionCategory('technology');
        setProposedQuestionTags('');
        setSubmittedBy('');
        setShowProposalForm(false);
        // Reload proposed questions
        await loadProposedQuestions();
      } else {
        setError(response.message || 'Failed to submit question');
      }
    } catch (err) {
      console.error('Error submitting proposed question:', err);
      setError('Failed to submit question');
    } finally {
      setSubmittingProposal(false);
    }
  };

  const handleVoteOnProposal = async (proposalId: string) => {
    try {
      const response = await api.voteOnProposedQuestion(proposalId);
      if (response.success) {
        // Reload proposed questions to get updated vote counts
        await loadProposedQuestions();
        setProposalVoteMsg(null);
      } else if (response.message === 'You have already voted on this question') {
        setProposalVoteMsg('You have already voted on this question.');
        setTimeout(() => setProposalVoteMsg(null), 3000);
      } else {
        setError(response.message || 'Failed to vote on proposal');
      }
    } catch (err) {
      console.error('Error voting on proposal:', err);
      setError('Failed to vote on proposal');
    }
  };

  const handleShare = () => {
    setShowShareCard(true);
  };

  const handleHomeClick = () => {
    setShowHistory(false);
    setShowNextRound(false);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${sunsetOrangeTheme.background} flex items-center justify-center`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-sunset-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-600 text-lg">Loading today's question...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${sunsetOrangeTheme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={loadCurrentQuestion}
            className={`${sunsetOrangeTheme.buttons.primary} inline-flex items-center space-x-2`}
          >
            <Loader2 className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${sunsetOrangeTheme.background}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-40 ${sunsetOrangeTheme.headerBackground} shadow-sm border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              onClick={handleHomeClick}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h1 className={`${sunsetOrangeTheme.header.title}`}>WorldQuestion</h1>
              <p className={`${sunsetOrangeTheme.header.subtitle}`}>Daily World Questions</p>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowHistory(!showHistory)}
                className={`${sunsetOrangeTheme.buttons.secondary} flex items-center space-x-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp size={20} />
                <span>History</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowNextRound(!showNextRound)}
                className={`${sunsetOrangeTheme.buttons.secondary} flex items-center space-x-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lightbulb size={20} />
                <span>Next Round</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`${sunsetOrangeTheme.cards.main}`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 ${sunsetOrangeTheme.gradients.primary} rounded-xl`}>
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h2 className={`${sunsetOrangeTheme.typography.h2}`}>Question History</h2>
              </div>
              
              {historicalQuestions.length > 0 ? (
                <div className="space-y-4">
                  {historicalQuestions.map((question) => (
                    <div key={question.id} className={`${sunsetOrangeTheme.cards.comment} hover:shadow-md transition-shadow`}>
                      <h3 className={`${sunsetOrangeTheme.typography.h3} mb-2`}>{question.text}</h3>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{format(new Date(question.createdAt), 'MMM d, yyyy')}</span>
                        <span className="capitalize">{question.category}</span>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-slate-400">
                        <span>Yes: {question.yesVotes}</span>
                        <span>No: {question.noVotes}</span>
                        <span>Total: {question.yesVotes + question.noVotes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">No historical questions available yet.</p>
              )}
            </motion.div>
          ) : showNextRound ? (
            <motion.div
              key="next-round"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`${sunsetOrangeTheme.cards.main}`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 ${sunsetOrangeTheme.gradients.primary} rounded-xl`}>
                  <Lightbulb className="text-white" size={24} />
                </div>
                <h2 className={`${sunsetOrangeTheme.typography.h2}`}>Next Round - Propose Questions</h2>
              </div>

              {/* Proposal Form */}
              <div className={`${sunsetOrangeTheme.cards.secondary} mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`${sunsetOrangeTheme.typography.h3}`}>Submit Your Question</h3>
                  <motion.button
                    onClick={() => setShowProposalForm(!showProposalForm)}
                    className={`${sunsetOrangeTheme.buttons.secondary} flex items-center space-x-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={20} />
                    <span>{showProposalForm ? 'Cancel' : 'Add Question'}</span>
                  </motion.button>
                </div>

                {showProposalForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Question Text</label>
                      <textarea
                        value={proposedQuestionText}
                        onChange={(e) => setProposedQuestionText(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sunset-400 focus:border-transparent"
                        rows={3}
                        placeholder="Enter your question here..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                          value={proposedQuestionCategory}
                          onChange={(e) => setProposedQuestionCategory(e.target.value as any)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sunset-400 focus:border-transparent"
                        >
                          <option value="technology">Technology</option>
                          <option value="society">Society</option>
                          <option value="environment">Environment</option>
                          <option value="politics">Politics</option>
                          <option value="science">Science</option>
                          <option value="culture">Culture</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          value={submittedBy}
                          onChange={(e) => setSubmittedBy(e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sunset-400 focus:border-transparent"
                          placeholder="Your name or nickname"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={proposedQuestionTags}
                        onChange={(e) => setProposedQuestionTags(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sunset-400 focus:border-transparent"
                        placeholder="ai, ethics, future (optional)"
                      />
                    </div>
                    
                    <motion.button
                      onClick={handleSubmitProposedQuestion}
                      disabled={submittingProposal || !proposedQuestionText.trim() || !submittedBy.trim()}
                      className={`${sunsetOrangeTheme.buttons.primary} w-full flex items-center justify-center space-x-2`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submittingProposal ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                      <span>{submittingProposal ? 'Submitting...' : 'Submit Question'}</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Proposed Questions List */}
              <div>
                <h3 className={`${sunsetOrangeTheme.typography.h3} mb-4`}>Top Proposed Questions</h3>
                
                {proposalVoteMsg && (
                  <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-yellow-800 text-sm">{proposalVoteMsg}</p>
                  </div>
                )}
                
                {proposedQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {proposedQuestions.map((proposal) => (
                      <div key={proposal.id} className={`${sunsetOrangeTheme.cards.comment} hover:shadow-md transition-shadow`}>
                        <h4 className="font-semibold text-slate-800 mb-2">{proposal.text}</h4>
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                          <span>By: {proposal.submittedBy}</span>
                          <span className="capitalize">{proposal.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <ThumbsUp className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-600">{proposal.votes} votes</span>
                          </div>
                          <motion.button
                            onClick={() => handleVoteOnProposal(proposal.id)}
                            className={`${sunsetOrangeTheme.buttons.success} flex items-center space-x-2 text-sm`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ThumbsUp size={16} />
                            <span>Vote</span>
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">No proposed questions yet. Be the first to submit one!</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`${sunsetOrangeTheme.cards.main}`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 mb-6">
                <Calendar size={18} />
                <span className="font-medium">{format(new Date(), 'MMMM d, yyyy')}</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span className="capitalize font-medium text-sunset-600">{currentQuestion?.category}</span>
              </div>

              {/* Question */}
              <h1 className={`${sunsetOrangeTheme.typography.h1} mb-6 text-center`}>
                {currentQuestion?.text}
              </h1>

              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 mb-8">
                <Globe size={16} />
                <span>Today's World Question</span>
              </div>

              {/* Voting Section */}
              {!hasVoted ? (
                <div className="flex flex-col items-center">
                  <h2 className={`${sunsetOrangeTheme.typography.h2} mb-2`}>What's your answer?</h2>
                  <p className="text-slate-500 text-base mb-6">Click below to cast your vote</p>
                  <div className="flex space-x-6">
                    <motion.button
                      onClick={() => handleVote('yes')}
                      className={`${sunsetOrangeTheme.buttons.success} flex items-center space-x-2 text-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle size={24} />
                      <span>Yes</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleVote('no')}
                      className={`${sunsetOrangeTheme.buttons.danger} flex items-center space-x-2 text-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <XCircle size={24} />
                      <span>No</span>
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Already Voted Message */}
                  {alreadyVotedMsg && (
                    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
                      <p className="text-yellow-800 font-medium">{alreadyVotedMsg}</p>
                    </div>
                  )}

                  {/* Vote Results */}
                  <div className={`${sunsetOrangeTheme.cards.secondary}`}>
                    <h2 className={`${sunsetOrangeTheme.typography.h2} mb-2 text-center`}>Vote Results</h2>
                    {userVote && (
                      <p className="text-slate-500 text-center mb-4">
                        You voted <span className="font-bold text-sunset-600">{userVote === 'yes' ? 'Yes' : 'No'}</span>
                      </p>
                    )}
                    
                    <VoteChart 
                      yesVotes={currentQuestion?.yesVotes || 0}
                      noVotes={currentQuestion?.noVotes || 0}
                    />
                  </div>

                  {/* Comments Section */}
                  <div className={`${sunsetOrangeTheme.cards.secondary}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${sunsetOrangeTheme.gradients.secondary} rounded-xl`}>
                          <MessageCircle className="text-white" size={24} />
                        </div>
                        <h3 className={`${sunsetOrangeTheme.typography.h3}`}>Share Your Thoughts</h3>
                      </div>
                      <motion.button
                        onClick={() => setShowComments(!showComments)}
                        className={`${sunsetOrangeTheme.buttons.secondary} flex items-center space-x-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle size={20} />
                        <span>{showComments ? 'Hide' : 'Show'} Comments</span>
                      </motion.button>
                    </div>

                    {showComments && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        {/* Add Comment Form */}
                        <div className="space-y-3">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sunset-400 focus:border-transparent"
                            rows={3}
                            placeholder="Share your thoughts on this question..."
                          />
                          <motion.button
                            onClick={handleAddComment}
                            disabled={submittingComment || !commentText.trim()}
                            className={`${sunsetOrangeTheme.buttons.primary} flex items-center space-x-2`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {submittingComment ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <MessageCircle className="w-5 h-5" />
                            )}
                            <span>{submittingComment ? 'Posting...' : 'Post Comment'}</span>
                          </motion.button>
                        </div>

                        {/* Random Comments Display */}
                        {currentQuestion?.comments && currentQuestion.comments.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Recent Comments</h4>
                            <div className="space-y-3">
                              {currentQuestion.comments.map((comment, index) => (
                                <div key={index} className={`${sunsetOrangeTheme.cards.comment}`}>
                                  <p className="text-slate-700 mb-2 text-sm leading-relaxed">
                                    "{comment.content}"
                                  </p>
                                  <div className="text-xs text-slate-400 font-medium">
                                    {format(new Date(comment.timestamp), 'MMM d, yyyy • h:mm a')}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Share Button */}
                  <div className="text-center">
                    <motion.button
                      onClick={handleShare}
                      className={`${sunsetOrangeTheme.buttons.primary} inline-flex items-center space-x-2 text-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={24} />
                      <span>Share My Vote</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share Card Modal */}
      <AnimatePresence>
        {showShareCard && currentQuestion && userVote && (
          <ShareCard
            shareData={{
              questionText: currentQuestion.text,
              userVote: userVote,
              globalPercentage: userVote === 'yes' 
                ? Math.round((currentQuestion.yesVotes / (currentQuestion.yesVotes + currentQuestion.noVotes)) * 100)
                : Math.round((currentQuestion.noVotes / (currentQuestion.yesVotes + currentQuestion.noVotes)) * 100),
              totalVotes: currentQuestion.yesVotes + currentQuestion.noVotes
            }}
            onClose={() => setShowShareCard(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 