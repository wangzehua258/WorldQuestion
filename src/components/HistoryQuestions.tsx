import React from 'react';
import { Question } from '../types';
import { format } from 'date-fns';
import { Calendar, Users, TrendingUp, Clock, Tag } from 'lucide-react';

interface HistoryQuestionsProps {
  questions: Question[];
  onQuestionSelect: (question: Question) => void;
}

const HistoryQuestions: React.FC<HistoryQuestionsProps> = ({ 
  questions, 
  onQuestionSelect 
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-100 text-blue-700',
      society: 'bg-green-100 text-green-700',
      environment: 'bg-emerald-100 text-emerald-700',
      politics: 'bg-red-100 text-red-700',
      science: 'bg-purple-100 text-purple-700',
      culture: 'bg-orange-100 text-orange-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Historical Questions</h2>
        <p className="text-gray-600 text-lg">Browse past world questions and their outcomes</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((question) => {
          const totalVotes = question.yesVotes + question.noVotes;
          const yesPercentage = Math.round((question.yesVotes / totalVotes) * 100);
          
          return (
            <div 
              key={question.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => onQuestionSelect(question)}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span className="font-medium">{format(new Date(question.date), 'MMM d')}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(question.category)}`}>
                    {question.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight line-clamp-3">
                  {question.text}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Vote Results */}
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

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${yesPercentage}%` }}
                  ></div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={14} />
                    <span>{question.comments.length} comments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>{format(new Date(question.date), 'yyyy')}</span>
                  </div>
                </div>

                {/* Tags */}
                {question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {question.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryQuestions; 