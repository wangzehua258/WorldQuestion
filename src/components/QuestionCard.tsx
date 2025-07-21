import React, { useState } from 'react';
import { Question } from '../types';
import VoteChart from './VoteChart';
import ShareCard from './ShareCard';
import { ShareCard as ShareCardType } from '../types';
import { MessageCircle, TrendingUp, Calendar, Globe, Share2 } from 'lucide-react';
import { format } from 'date-fns';

interface QuestionCardProps {
  question: Question;
  onVote: (vote: 'yes' | 'no') => void;
  hasVoted: boolean;
  userVote?: 'yes' | 'no';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onVote, 
  hasVoted, 
  userVote 
}) => {
  const [showShareCard, setShowShareCard] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleVote = (vote: 'yes' | 'no') => {
    if (!hasVoted) {
      onVote(vote);
    }
  };

  const handleShare = () => {
    const total = question.yesVotes + question.noVotes;
    const percentage = userVote === 'yes' 
      ? Math.round((question.yesVotes / total) * 100)
      : Math.round((question.noVotes / total) * 100);

    const shareData: ShareCardType = {
      questionText: question.text,
      userVote: userVote!,
      globalPercentage: percentage,
      totalVotes: total
    };

    setShowShareCard(true);
  };

  const yesPercentage = Math.round((question.yesVotes / (question.yesVotes + question.noVotes)) * 100);
  const noPercentage = 100 - yesPercentage;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Question Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
          <Calendar size={18} />
          <span className="font-medium">{format(new Date(question.date), 'MMMM d, yyyy')}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span className="capitalize font-medium text-blue-600">{question.category}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight max-w-4xl mx-auto">
          {question.text}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <Globe size={16} />
          <span>Today's World Question</span>
        </div>
      </div>

      {/* Voting Section */}
      {!hasVoted ? (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">What's your answer?</h2>
            <p className="text-gray-600 text-lg">Click below to cast your vote</p>
          </div>
          <div className="flex space-x-6 justify-center">
            <button
              onClick={() => handleVote('yes')}
              className="flex-1 max-w-xs bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Yes
            </button>
            <button
              onClick={() => handleVote('no')}
              className="flex-1 max-w-xs bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Vote Results</h2>
              <p className="text-gray-600 text-lg">
                You voted <span className="font-bold text-blue-600">{userVote === 'yes' ? 'Yes' : 'No'}</span>
              </p>
            </div>
            <VoteChart yesVotes={question.yesVotes} noVotes={question.noVotes} />
          </div>

          {/* Trend Analysis */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Trend Analysis</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{question.trendAnalysis}</p>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageCircle className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Featured Comments</h3>
              </div>
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
              >
                {showComments ? 'Hide' : 'Show'} Comments
              </button>
            </div>
            
            {showComments && (
              <div className="space-y-4">
                {question.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <p className="text-gray-700 mb-3 text-lg leading-relaxed">{comment.text}</p>
                    <div className="text-sm text-gray-500 font-medium">
                      {format(new Date(comment.timestamp), 'MMM d, yyyy • h:mm a')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share Button */}
          <div className="text-center">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Share2 size={20} />
              <span>Share My Vote</span>
            </button>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareCard
          shareData={{
            questionText: question.text,
            userVote: userVote!,
            globalPercentage: userVote === 'yes' ? yesPercentage : noPercentage,
            totalVotes: question.yesVotes + question.noVotes
          }}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
};

export default QuestionCard; 