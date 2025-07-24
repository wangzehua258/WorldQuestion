'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2 } from 'lucide-react';
import { ShareCard as ShareCardType } from '@/types';
import html2canvas from 'html2canvas';

interface ShareCardProps {
  shareData: ShareCardType;
  onClose: () => void;
}

export default function ShareCard({ shareData, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        
        const link = document.createElement('a');
        link.download = `worldquestion-share-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
      }
    }
  };

  const handleShare = () => {
    const text = `I voted ${shareData.userVote === 'yes' ? 'YES' : 'NO'} on today's question!\n\n${shareData.globalPercentage}% of people agree. What do you think?\n\nJoin the conversation at worldquestion.com`;
    
    if (navigator.share) {
      navigator.share({
        title: 'WorldQuestion - Daily Voting',
        text: text,
        url: 'https://worldquestion.com'
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Share Your Vote</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Share Card Preview */}
          <div 
            ref={cardRef}
            className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-blue-100"
          >
            {/* Logo and Title */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="font-bold text-slate-800">WorldQuestion</span>
              </div>
              <p className="text-sm text-slate-600">Daily World Questions</p>
            </div>

            {/* Question */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800 text-center leading-tight">
                "{shareData.questionText}"
              </h2>
            </div>

            {/* Vote Results */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Global Results</span>
                <span className="text-sm font-bold text-slate-800">{shareData.totalVotes} votes</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${shareData.globalPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-semibold">YES {shareData.globalPercentage}%</span>
                <span className="text-red-600 font-semibold">NO {100 - shareData.globalPercentage}%</span>
              </div>
            </div>

            {/* User's Vote */}
            <div className="text-center">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                shareData.userVote === 'yes' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                <span className="font-bold">I voted {shareData.userVote.toUpperCase()}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-slate-500">worldquestion.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </motion.button>
            
            <motion.button
              onClick={handleShare}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 