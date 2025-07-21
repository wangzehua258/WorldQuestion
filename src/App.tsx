import React, { useState } from 'react';
import { Question } from './types';
import { getCurrentQuestion, sampleQuestions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import HistoryQuestions from './components/HistoryQuestions';
import { Globe, History, Home, Sparkles } from 'lucide-react';

type View = 'current' | 'history';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('current');
  const [currentQuestion, setCurrentQuestion] = useState<Question>(getCurrentQuestion());
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'yes' | 'no' | undefined>(undefined);

  const handleVote = (vote: 'yes' | 'no') => {
    setUserVote(vote);
    setHasVoted(true);
    
    // Simulate vote update
    const updatedQuestion = {
      ...currentQuestion,
      yesVotes: vote === 'yes' ? currentQuestion.yesVotes + 1 : currentQuestion.yesVotes,
      noVotes: vote === 'no' ? currentQuestion.noVotes + 1 : currentQuestion.noVotes,
      totalVotes: currentQuestion.totalVotes + 1
    };
    setCurrentQuestion(updatedQuestion);
  };

  const handleQuestionSelect = (question: Question) => {
    setCurrentQuestion(question);
    setCurrentView('current');
    setHasVoted(false);
    setUserVote(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
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
            
            <nav className="flex space-x-2">
              <button
                onClick={() => setCurrentView('current')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentView === 'current'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Home size={18} />
                <span>Today</span>
              </button>
              <button
                onClick={() => setCurrentView('history')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentView === 'history'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <History size={18} />
                <span>History</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'current' ? (
          <QuestionCard
            question={currentQuestion}
            onVote={handleVote}
            hasVoted={hasVoted}
            userVote={userVote}
          />
        ) : (
          <HistoryQuestions
            questions={sampleQuestions}
            onQuestionSelect={handleQuestionSelect}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">WorldQuestion</h3>
            </div>
            <p className="text-gray-600 mb-4">
              One world question every day. Vote, share, and be part of global trends.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>© 2024 WorldQuestion</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 