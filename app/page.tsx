'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, TrendingUp, Calendar, Share2, Users, Sparkles, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Question, ShareCard as ShareCardType } from '@/types';
import { api } from '@/services/api';
import VoteChart from '@/components/VoteChart';
import ShareCard from '@/components/ShareCard';

export default function HomePage() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [historicalQuestions, setHistoricalQuestions] = useState<Question[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load current question on component mount
  useEffect(() => {
    loadCurrentQuestion();
    loadHistoricalQuestions();
  }, []);

  const loadCurrentQuestion = async () => {
    try {
      setLoading(true);
      const response = await api.getCurrentQuestion();
      if (response.success && response.data) {
        setCurrentQuestion(response.data);
      } else {
        setError('No active question found');
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

  const handleVote = async (vote: 'yes' | 'no') => {
    if (!currentQuestion) return;

    try {
      const response = await api.voteOnQuestion(currentQuestion.id, vote);
      if (response.success) {
        setUserVote(vote);
        setHasVoted(true);
        
        // Reload current question to get updated vote counts
        await loadCurrentQuestion();
      } else {
        setError(response.message || 'Failed to record vote');
      }
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to record vote. Please try again.');
    }
  };

  const handleShare = () => {
    if (!currentQuestion || !userVote) return;

    const total = currentQuestion.yesVotes + currentQuestion.noVotes;
    const percentage = userVote === 'yes' 
      ? Math.round((currentQuestion.yesVotes / total) * 100)
      : Math.round((currentQuestion.noVotes / total) * 100);

    const shareData: ShareCardType = {
      questionText: currentQuestion.text,
      userVote: userVote,
      globalPercentage: percentage,
      totalVotes: total
    };

    setShowShareCard(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-700">Loading WorldQuestion...</h2>
        </div>
      </div>
    );
  }

  if (error || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <XCircle size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Question</h2>
          <p className="text-gray-500">{error || 'No active question available'}</p>
          <button 
            onClick={loadCurrentQuestion}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const yesPercentage = Math.round((currentQuestion.yesVotes / (currentQuestion.yesVotes + currentQuestion.noVotes)) * 100);
  const noPercentage = 100 - yesPercentage;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Globe className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">WorldQuestion</h1>
                <p className="text-sm text-gray-500">Daily World Questions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                History
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!showHistory ? (
            <motion.div
              key="current"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Question Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                  <Calendar size={18} />
                  <span className="font-medium">{format(new Date(currentQuestion.date), 'MMMM d, yyyy')}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="capitalize font-medium text-blue-600">{currentQuestion.category}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight max-w-4xl mx-auto">
                  {currentQuestion.text}
                </h1>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <Globe size={16} />
                  <span>Today's World Question</span>
                </div>
              </motion.div>

              {/* Voting Section */}
              {!hasVoted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="card mb-12"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">What's your answer?</h2>
                    <p className="text-gray-600 text-lg">Click below to cast your vote</p>
                  </div>
                  <div className="flex space-x-8 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote('yes')}
                      className="btn-success flex items-center space-x-3"
                    >
                      <CheckCircle size={24} />
                      <span>Yes</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote('no')}
                      className="btn-danger flex items-center space-x-3"
                    >
                      <XCircle size={24} />
                      <span>No</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-12"
                >
                  {/* Results Section */}
                  <div className="card">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Vote Results</h2>
                      <p className="text-gray-600 text-lg">
                        You voted <span className="font-bold text-blue-600">{userVote === 'yes' ? 'Yes' : 'No'}</span>
                      </p>
                    </div>
                    <VoteChart yesVotes={currentQuestion.yesVotes} noVotes={currentQuestion.noVotes} />
                  </div>

                  {/* AI Summary */}
                  {currentQuestion.aiSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="card"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                          <Sparkles className="text-white" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">AI Analysis</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">{currentQuestion.aiSummary}</p>
                    </motion.div>
                  )}

                  {/* Comments Section */}
                  {currentQuestion.comments && currentQuestion.comments.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="card"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                            <MessageCircle className="text-white" size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Featured Comments</h3>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowComments(!showComments)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                        >
                          {showComments ? 'Hide' : 'Show'} Comments
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {showComments && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            {currentQuestion.comments.filter(c => c.isPinned).map((comment, index) => (
                              <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                              >
                                <p className="text-gray-700 mb-3 text-lg leading-relaxed">{comment.content}</p>
                                <div className="text-sm text-gray-500 font-medium">
                                  {format(new Date(comment.timestamp), 'MMM d, yyyy • h:mm a')}
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Share Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="btn-primary inline-flex items-center space-x-3 text-lg"
                    >
                      <Share2 size={24} />
                      <span>Share My Vote</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Historical Questions</h2>
                <p className="text-gray-600 text-lg">Browse past world questions and their outcomes</p>
              </div>

              {historicalQuestions.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {historicalQuestions.map((question, index) => {
                    const totalVotes = question.yesVotes + question.noVotes;
                    const yesPercentage = Math.round((question.yesVotes / totalVotes) * 100);
                    
                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() => setShowHistory(false)}
                      >
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar size={16} />
                              <span className="font-medium">{format(new Date(question.date), 'MMM d')}</span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              {question.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                            {question.text}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Users size={18} className="text-gray-400" />
                              <span className="text-sm font-semibold text-gray-700">
                                {totalVotes.toLocaleString()} votes
                              </span>
                            </div>
                            <div className="text-lg font-bold text-gray-800">
                              {yesPercentage}% Yes
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${yesPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No historical questions available yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Share Card Modal */}
      <AnimatePresence>
        {showShareCard && currentQuestion && userVote && (
          <ShareCard
            shareData={{
              questionText: currentQuestion.text,
              userVote: userVote,
              globalPercentage: userVote === 'yes' ? yesPercentage : noPercentage,
              totalVotes: currentQuestion.yesVotes + currentQuestion.noVotes
            }}
            onClose={() => setShowShareCard(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 