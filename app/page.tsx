'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, TrendingUp, Calendar, Share2, Users, Sparkles, CheckCircle, XCircle, Loader2, Plus, ThumbsUp, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { Question, ShareCard as ShareCardType, ProposedQuestion } from '@/types';
import { api } from '@/services/api';
import VoteChart from '@/components/VoteChart';
import ShareCard from '@/components/ShareCard';
import ThemeSelector from '@/components/ThemeSelector';
import { getCurrentTheme, themes } from './themes';
import { ShareCardSVG, ThemeKey } from '@/components/ShareCardSVG';

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
  const [submittingVote, setSubmittingVote] = useState(false);
  
  // Proposed question form state
  const [proposedQuestionText, setProposedQuestionText] = useState('');
  const [proposedQuestionCategory, setProposedQuestionCategory] = useState<'technology' | 'society' | 'environment' | 'politics' | 'science' | 'culture'>('technology');
  const [proposedQuestionTags, setProposedQuestionTags] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalVoteMsg, setProposalVoteMsg] = useState<string | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Theme state
  const [currentThemeKey, setCurrentThemeKey] = useState<string>('watermelon');
  const [currentTheme, setCurrentTheme] = useState(themes['watermelon'].theme);
  const shareCardRef = useRef<SVGSVGElement>(null);

  // Load current question and theme on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Make all API calls in parallel
        const [currentQuestionResponse, historicalResponse, proposedResponse] = await Promise.all([
          api.getCurrentQuestion(),
          api.getHistoricalQuestions(1, 10),
          api.getProposedQuestions(20)
        ]);

        // Handle current question
        if (currentQuestionResponse.success && currentQuestionResponse.data) {
          setCurrentQuestion(currentQuestionResponse.data);
          
          // Check user vote for the current question
          try {
            const userVoteResponse = await api.getUserVote(currentQuestionResponse.data.id);
            if (userVoteResponse.success && userVoteResponse.data) {
              if (userVoteResponse.data.hasVoted) {
                setHasVoted(true);
                setUserVote(userVoteResponse.data.choice);
                setAlreadyVotedMsg('You have already voted on this question.');
              } else {
                setHasVoted(false);
                setUserVote(null);
                setAlreadyVotedMsg(null);
              }
            }
          } catch (err) {
            console.error('Error checking user vote:', err);
            setHasVoted(false);
            setUserVote(null);
          }
        } else {
          setError(currentQuestionResponse.message || 'No active question found');
        }

        // Handle historical questions
        if (historicalResponse.success && historicalResponse.data) {
          setHistoricalQuestions(historicalResponse.data.questions || []);
        }

        // Handle proposed questions
        if (proposedResponse.success && proposedResponse.data) {
          setProposedQuestions(proposedResponse.data);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Load current theme
    const themeKey = getCurrentTheme();
    setCurrentThemeKey(themeKey);
    setCurrentTheme(themes[themeKey].theme);
  }, []);

  const loadCurrentQuestion = async () => {
    try {
      setLoading(true);
      const response = await api.getCurrentQuestion();
      if (response.success && response.data) {
        setCurrentQuestion(response.data);
        
        // Check if user has already voted on this question
        try {
          const userVoteResponse = await api.getUserVote(response.data.id);
          if (userVoteResponse.success && userVoteResponse.data) {
            if (userVoteResponse.data.hasVoted) {
              setHasVoted(true);
              setUserVote(userVoteResponse.data.choice);
              setAlreadyVotedMsg('You have already voted on this question.');
            } else {
              setHasVoted(false);
              setUserVote(null);
              setAlreadyVotedMsg(null);
            }
          }
        } catch (err) {
          console.error('Error checking user vote:', err);
          // If we can't check the vote, assume they haven't voted
          setHasVoted(false);
          setUserVote(null);
        }
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
    if (!currentQuestion || submittingVote) return;

    try {
      setSubmittingVote(true);
      const response = await api.voteOnQuestion(currentQuestion.id, vote);
      if (response.success) {
        setUserVote(vote);
        setHasVoted(true);
        setAlreadyVotedMsg(null);
        
        // Update vote counts directly without reloading
        if (currentQuestion) {
          const updatedQuestion = { ...currentQuestion };
          if (vote === 'yes') {
            updatedQuestion.yesVotes += 1;
          } else {
            updatedQuestion.noVotes += 1;
          }
          updatedQuestion.totalVotes += 1;
          setCurrentQuestion(updatedQuestion);
        }
      } else if (response.message === 'You have already voted on this question') {
        setHasVoted(true);
        setAlreadyVotedMsg('You have already voted on this question.');
      } else {
        setError(response.message || 'Failed to record vote');
      }
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to record vote');
    } finally {
      setSubmittingVote(false);
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

  const handleSubscribe = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setSubmittingEmail(true);
      // For now, we'll just store in localStorage and show success
      // In production, you'd send this to your backend/Mailchimp
      localStorage.setItem('worldquestion_email', email);
      setEmailSubmitted(true);
      setTimeout(() => {
        setShowSubscriptionModal(false);
        setEmail('');
        setEmailSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error('Error subscribing:', err);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setSubmittingEmail(false);
    }
  };

  const handleShare = (platform?: string) => {
    if (platform) {
      // Social media sharing
      const totalVotes = (currentQuestion?.yesVotes || 0) + (currentQuestion?.noVotes || 0);
      const yesPercentage = totalVotes > 0 ? Math.round(((currentQuestion?.yesVotes || 0) / totalVotes) * 100) : 0;
      const text = `I voted ${userVote === 'yes' ? 'YES' : 'NO'} on today's question: "${currentQuestion?.text}"\n\n${yesPercentage}% of people agree. What do you think?\n\nJoin the conversation at worldquestion.com`;
      
      let url = '';
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
          break;
        case 'linkedin':
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://worldquestion.com')}&title=${encodeURIComponent('WorldQuestion - Daily Voting')}&summary=${encodeURIComponent(text)}`;
          break;
        case 'instagram':
          // Instagram doesn't support direct sharing, so we'll copy to clipboard
          navigator.clipboard.writeText(text);
          alert('Text copied! You can now paste it on Instagram.');
          return;
      }
      
      if (url) {
        window.open(url, '_blank');
      }
    } else {
      // Original share card modal
      setShowShareCard(true);
    }
  };

  const handleHomeClick = () => {
    setShowHistory(false);
    setShowNextRound(false);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${currentTheme.background} flex items-center justify-center`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-sunset-400 border-t-transparent rounded-full mx-auto mb-6"
          />
          <p className={`${currentTheme.typography.body} text-slate-600`}>Loading today's question...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${currentTheme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className={`${currentTheme.typography.h2} mb-4`}>Oops! Something went wrong</h2>
          <p className={`${currentTheme.typography.body} mb-8`}>{error}</p>
          <button
            onClick={loadCurrentQuestion}
            className={`${currentTheme.buttons.primary} inline-flex items-center space-x-3`}
          >
            <Loader2 className="w-6 h-6" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const themeKey = currentThemeKey as ThemeKey;

  return (
    <div className={`min-h-screen ${currentTheme.background}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-40 ${currentTheme.headerBackground} shadow-sm border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <motion.div 
              onClick={handleHomeClick}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h1 className={`${currentTheme.header.title}`}>WorldQuestion</h1>
              <p className={`${currentTheme.header.subtitle}`}>Daily World Questions</p>
            </motion.div>
            
            <div className="flex items-center space-x-6">
              <motion.button
                onClick={() => {
                  setShowHistory(true);
                  setShowNextRound(false);
                }}
                className={`${currentTheme.buttons.secondary} flex items-center space-x-3`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp size={24} />
                <span>History</span>
              </motion.button>
              
              <motion.button
                onClick={() => {
                  setShowNextRound(true);
                  setShowHistory(false);
                }}
                className={`${currentTheme.buttons.secondary} flex items-center space-x-3`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lightbulb size={24} />
                <span>Next Round</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowSubscriptionModal(true)}
                className={`${currentTheme.buttons.primary} flex items-center space-x-3`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={24} />
                <span>Daily Reminder</span>
              </motion.button>
              
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`${currentTheme.cards.main}`}
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-3 ${currentTheme.gradients.primary} rounded-2xl`}>
                  <TrendingUp className="text-white" size={28} />
                </div>
                <h2 className={`${currentTheme.typography.h2}`}>Question History</h2>
              </div>
              
              {historicalQuestions.length > 0 ? (
                <div className="space-y-6">
                  {historicalQuestions.map((question) => (
                    <div key={question.id} className={`${currentTheme.cards.comment} hover:shadow-lg transition-shadow`}>
                      <h3 className={`${currentTheme.typography.h4} mb-3`}>{question.text}</h3>
                      <div className="flex items-center justify-between text-base text-slate-500 mb-3">
                        <span>{format(new Date(question.createdAt), 'MMM d, yyyy')}</span>
                        <span className="capitalize">{question.category}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-slate-400">
                        <span>Yes: {question.yesVotes}</span>
                        <span>No: {question.noVotes}</span>
                        <span>Total: {question.yesVotes + question.noVotes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`${currentTheme.typography.body} text-slate-500 text-center py-12`}>No historical questions available yet.</p>
              )}
            </motion.div>
          ) : showNextRound ? (
            <motion.div
              key="next-round"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`${currentTheme.cards.main}`}
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-3 ${currentTheme.gradients.primary} rounded-2xl`}>
                  <Lightbulb className="text-white" size={28} />
                </div>
                <h2 className={`${currentTheme.typography.h2}`}>Next Round - Propose Questions</h2>
              </div>

              {/* Proposal Form */}
              <div className={`${currentTheme.cards.secondary} mb-8`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`${currentTheme.typography.h3}`}>Submit Your Question</h3>
                  <motion.button
                    onClick={() => setShowProposalForm(!showProposalForm)}
                    className={`${currentTheme.buttons.secondary} flex items-center space-x-3`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={24} />
                    <span>{showProposalForm ? 'Cancel' : 'Add Question'}</span>
                  </motion.button>
                </div>

                {showProposalForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className={`block ${currentTheme.typography.bodySmall} font-semibold text-slate-700 mb-3`}>Question Text</label>
                      <textarea
                        value={proposedQuestionText}
                        onChange={(e) => setProposedQuestionText(e.target.value)}
                        className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sunset-400 focus:border-transparent text-lg"
                        rows={4}
                        placeholder="Enter your question here..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block ${currentTheme.typography.bodySmall} font-semibold text-slate-700 mb-3`}>Category</label>
                        <select
                          value={proposedQuestionCategory}
                          onChange={(e) => setProposedQuestionCategory(e.target.value as any)}
                          className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sunset-400 focus:border-transparent text-lg"
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
                        <label className={`block ${currentTheme.typography.bodySmall} font-semibold text-slate-700 mb-3`}>Your Name</label>
                        <input
                          type="text"
                          value={submittedBy}
                          onChange={(e) => setSubmittedBy(e.target.value)}
                          className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sunset-400 focus:border-transparent text-lg"
                          placeholder="Your name or nickname"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block ${currentTheme.typography.bodySmall} font-semibold text-slate-700 mb-3`}>Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={proposedQuestionTags}
                        onChange={(e) => setProposedQuestionTags(e.target.value)}
                        className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sunset-400 focus:border-transparent text-lg"
                        placeholder="ai, ethics, future (optional)"
                      />
                    </div>
                    
                    <motion.button
                      onClick={handleSubmitProposedQuestion}
                      disabled={submittingProposal || !proposedQuestionText.trim() || !submittedBy.trim()}
                      className={`${currentTheme.buttons.primary} w-full flex items-center justify-center space-x-3`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submittingProposal ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <Plus className="w-6 h-6" />
                      )}
                      <span>{submittingProposal ? 'Submitting...' : 'Submit Question'}</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Proposed Questions List */}
              <div>
                <h3 className={`${currentTheme.typography.h3} mb-6`}>Top Proposed Questions</h3>
                
                {proposalVoteMsg && (
                  <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-2xl">
                    <p className="text-yellow-800 text-base font-medium">{proposalVoteMsg}</p>
                  </div>
                )}
                
                {proposedQuestions.length > 0 ? (
                  <div className="space-y-6">
                    {proposedQuestions.map((proposal) => (
                      <div key={proposal.id} className={`${currentTheme.cards.comment} hover:shadow-lg transition-shadow`}>
                        <h4 className={`${currentTheme.typography.h4} mb-3`}>{proposal.text}</h4>
                        <div className="flex items-center justify-between text-base text-slate-500 mb-4">
                          <span>By: {proposal.submittedBy}</span>
                          <span className="capitalize">{proposal.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <ThumbsUp className="w-5 h-5 text-slate-400" />
                            <span className={`${currentTheme.typography.bodySmall}`}>{proposal.votes} votes</span>
                          </div>
                          <motion.button
                            onClick={() => handleVoteOnProposal(proposal.id)}
                            className={`${currentTheme.buttons.success} flex items-center space-x-3`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ThumbsUp size={20} />
                            <span>Vote</span>
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`${currentTheme.typography.body} text-slate-500 text-center py-12`}>No proposed questions yet. Be the first to submit one!</p>
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
              className={`${currentTheme.cards.main}`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-center space-x-3 text-base text-slate-500 mb-8">
                <Calendar size={20} />
                <span className="font-semibold">{format(new Date(), 'MMMM d, yyyy')}</span>
                <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                <span className="capitalize font-semibold text-sunset-600">{currentQuestion?.category}</span>
              </div>

              {/* Question */}
              <h1 className={`${currentTheme.typography.h1} mb-8 text-center max-w-5xl mx-auto leading-snug px-4`}>
                {currentQuestion?.text}
              </h1>

              <div className="flex items-center justify-center space-x-4 text-base text-slate-500 mb-10">
                <Globe size={20} />
                <span className="font-medium">Today's World Question</span>
              </div>

              {/* Voting Section */}
              {!hasVoted ? (
                <div className="flex flex-col items-center">
                  <h2 className={`${currentTheme.typography.h2} mb-3 ${currentTheme.text.primary.replace('text-', 'text-').replace('700', '600')}`}>What's your answer?</h2>
                  <p className={`${currentTheme.typography.body} mb-8 text-center`}>Click below to cast your vote</p>
                  <div className="flex space-x-8">
                    <motion.button
                      onClick={() => handleVote('yes')}
                      disabled={submittingVote}
                      className={`${currentTheme.buttons.success} flex items-center space-x-3 ${submittingVote ? 'opacity-50 cursor-not-allowed' : ''}`}
                      whileHover={submittingVote ? {} : { scale: 1.05 }}
                      whileTap={submittingVote ? {} : { scale: 0.95 }}
                    >
                      {submittingVote ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : (
                        <CheckCircle size={28} />
                      )}
                      <span>{submittingVote ? 'Voting...' : 'Yes'}</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleVote('no')}
                      disabled={submittingVote}
                      className={`${currentTheme.buttons.danger} flex items-center space-x-3 ${submittingVote ? 'opacity-50 cursor-not-allowed' : ''}`}
                      whileHover={submittingVote ? {} : { scale: 1.05 }}
                      whileTap={submittingVote ? {} : { scale: 0.95 }}
                    >
                      {submittingVote ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : (
                        <XCircle size={28} />
                      )}
                      <span>{submittingVote ? 'Voting...' : 'No'}</span>
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Already Voted Message */}
                  {alreadyVotedMsg && (
                    <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-2xl text-center">
                      <p className="text-yellow-800 font-semibold text-lg">
                        You have already voted on this question.
                        {userVote && (
                          <span className="block mt-2 text-base">
                            You voted: <span className={`font-bold ${userVote === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                              {userVote === 'yes' ? 'YES' : 'NO'}
                            </span>
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Vote Results */}
                  <div className={`${currentTheme.cards.secondary}`}>
                    <h2 className={`${currentTheme.typography.h2} mb-3 text-center`}>Vote Results</h2>
                    {userVote ? (
                      <p className={`${currentTheme.typography.body} text-center mb-6`}>
                        You voted <span className={`font-bold ${userVote === 'yes' ? 'text-green-600' : 'text-red-600'}`}>{userVote === 'yes' ? 'YES' : 'NO'}</span>
                      </p>
                    ) : (
                      <p className={`${currentTheme.typography.body} text-center mb-6 text-slate-500`}>
                        You haven't voted yet
                      </p>
                    )}
                    
                    {/* GPT Style Summary */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                      <p className={`${currentTheme.typography.body} text-center font-medium text-slate-700`}>
                        {(() => {
                          const totalVotes = (currentQuestion?.yesVotes || 0) + (currentQuestion?.noVotes || 0);
                          const yesPercentage = totalVotes > 0 ? Math.round(((currentQuestion?.yesVotes || 0) / totalVotes) * 100) : 0;
                          const noPercentage = 100 - yesPercentage;
                          
                          if (yesPercentage > noPercentage) {
                            return `${yesPercentage}% agree—but the conversation is far from over.`;
                          } else if (noPercentage > yesPercentage) {
                            return `${noPercentage}% disagree—but Gen Z thinks differently.`;
                          } else {
                            return "The world is split—this question has divided opinions evenly.";
                          }
                        })()}
                      </p>
                    </div>
                    
                    <VoteChart 
                      yesVotes={currentQuestion?.yesVotes || 0}
                      noVotes={currentQuestion?.noVotes || 0}
                    />
                    
                    {/* Share Buttons */}
                    <div className="mt-6 flex justify-center space-x-4">
                      <motion.button
                        onClick={() => handleShare('twitter')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        <span>Share on X</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleShare('linkedin')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleShare('instagram')}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                        </svg>
                        <span>Instagram</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className={`${currentTheme.cards.secondary}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 ${currentTheme.gradients.secondary} rounded-2xl`}>
                          <MessageCircle className="text-white" size={28} />
                        </div>
                        <h3 className={`${currentTheme.typography.h3}`}>Share Your Thoughts</h3>
                      </div>
                      <motion.button
                        onClick={() => setShowComments(!showComments)}
                        className={`${currentTheme.buttons.secondary} flex items-center space-x-3`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle size={24} />
                        <span>{showComments ? 'Hide' : 'Show'} Comments</span>
                      </motion.button>
                    </div>

                    {showComments && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                      >
                        {/* Add Comment Form */}
                        <div className="space-y-4">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sunset-400 focus:border-transparent text-lg"
                            rows={4}
                            placeholder="Share your thoughts on this question..."
                          />
                          <motion.button
                            onClick={handleAddComment}
                            disabled={submittingComment || !commentText.trim()}
                            className={`${currentTheme.buttons.primary} flex items-center space-x-3`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {submittingComment ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <MessageCircle className="w-6 h-6" />
                            )}
                            <span>{submittingComment ? 'Posting...' : 'Post Comment'}</span>
                          </motion.button>
                        </div>

                        {/* Random Comments Display */}
                        {currentQuestion?.comments && currentQuestion.comments.length > 0 && (
                          <div>
                            <h4 className={`${currentTheme.typography.h4} mb-4`}>Recent Comments</h4>
                            <div className="space-y-4">
                              {currentQuestion.comments.map((comment, index) => (
                                <div key={index} className={`${currentTheme.cards.comment}`}>
                                  <p className={`${currentTheme.typography.bodySmall} mb-3 leading-relaxed`}>
                                    "{comment.content}"
                                  </p>
                                  <div className="text-sm text-slate-400 font-medium">
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
                      onClick={() => setShowShareCard(true)}
                      className={`${currentTheme.buttons.primary} inline-flex items-center space-x-3`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={28} />
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
        {showShareCard && currentQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowShareCard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">Share Your Vote</h3>
                <button onClick={() => setShowShareCard(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <div style={{ width: 'min(90vw, 340px)', height: 'auto' }}>
                    <ShareCardSVG
                      ref={shareCardRef}
                      question={currentQuestion.text}
                      userChoice={userVote === 'yes' ? 'YES' : userVote === 'no' ? 'NO' : 'NEUTRAL'}
                      yesRatio={currentQuestion.yesVotes + currentQuestion.noVotes > 0 ? Math.round((currentQuestion.yesVotes / (currentQuestion.yesVotes + currentQuestion.noVotes)) * 100) : 50}
                      noRatio={currentQuestion.yesVotes + currentQuestion.noVotes > 0 ? Math.round((currentQuestion.noVotes / (currentQuestion.yesVotes + currentQuestion.noVotes)) * 100) : 50}
                      totalVotes={currentQuestion.yesVotes + currentQuestion.noVotes}
                      theme={themeKey}
                      width={340}
                      height={420}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mt-6 w-full justify-center items-center">
                  <button
                    className="flex items-center justify-center gap-1.5 md:gap-2 w-32 md:w-40 h-10 md:h-12 bg-slate-800 text-white rounded-xl font-medium text-xs hover:bg-slate-900 transition shadow px-2"
                    onClick={() => {
                      const svg = shareCardRef.current;
                      if (!svg) return;
                      const serializer = new XMLSerializer();
                      const source = serializer.serializeToString(svg);
                      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
                      const url = URL.createObjectURL(svgBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'worldquestion-share.svg';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"/></svg>
                    <span className="hidden sm:inline">Download SVG</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-1.5 md:gap-2 w-32 md:w-40 h-10 md:h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium text-xs transition shadow px-2"
                    onClick={() => {
                      const text = `I voted ${userVote === 'yes' ? 'YES' : userVote === 'no' ? 'NO' : 'YES'} on today's question: \"${currentQuestion.text}\"\n\nJoin the conversation at worldquestion.com`;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,'_blank');
                    }}
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    <span className="hidden sm:inline">Share on X</span>
                    <span className="sm:hidden">X</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-1.5 md:gap-2 w-32 md:w-40 h-10 md:h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-medium text-xs transition shadow px-2"
                    onClick={() => {
                      const url = 'https://worldquestion.com';
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,'_blank');
                    }}
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span className="hidden sm:inline">Share on LinkedIn</span>
                    <span className="sm:hidden">LinkedIn</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-1.5 md:gap-2 w-32 md:w-40 h-10 md:h-12 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-xs transition shadow px-2"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://worldquestion.com`);
                      alert('Link copied to clipboard!');
                    }}
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                    <span className="hidden sm:inline">Copy Link</span>
                    <span className="sm:hidden">Copy</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Selector */}
      <ThemeSelector />

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscriptionModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`${currentTheme.cards.main} p-8 rounded-3xl shadow-xl`}
            >
              <h3 className={`${currentTheme.typography.h3} text-center mb-6`}>Daily Reminder</h3>
              <p className={`${currentTheme.typography.body} text-center mb-6`}>
                Get notified every day with the latest World Question.
              </p>
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sunset-400 focus:border-transparent text-lg"
                />
                <motion.button
                  onClick={handleSubscribe}
                  disabled={submittingEmail || !email.trim() || !email.includes('@')}
                  className={`${currentTheme.buttons.primary} w-full flex items-center justify-center space-x-3`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submittingEmail ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Calendar className="w-6 h-6" />
                  )}
                  <span>{submittingEmail ? 'Subscribing...' : 'Subscribe for Daily Reminders'}</span>
                </motion.button>
                {emailSubmitted && (
                  <p className={`${currentTheme.typography.bodySmall} text-center text-green-600`}>
                    Thank you for subscribing! You'll receive daily reminders.
                  </p>
                )}
              </div>
              <motion.button
                onClick={() => setShowSubscriptionModal(false)}
                className={`${currentTheme.buttons.secondary} w-full mt-6`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Close</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}