'use client';

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, X, Globe, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShareCard as ShareCardType } from '@/types';

interface ShareCardProps {
  shareData: ShareCardType;
  onClose: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({ shareData, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (cardRef.current) {
      setIsGenerating(true);
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        
        const link = document.createElement('a');
        link.download = 'worldquestion-share.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WorldQuestion',
          text: `I voted on WorldQuestion! "${shareData.questionText}" - I voted ${shareData.userVote === 'yes' ? 'Yes' : 'No'}, and ${shareData.globalPercentage}% of people agree with me!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `I voted on WorldQuestion! "${shareData.questionText}" - I voted ${shareData.userVote === 'yes' ? 'Yes' : 'No'}, and ${shareData.globalPercentage}% of people agree with me!`;
      navigator.clipboard.writeText(text);
      alert('Share content copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your Vote</h3>
              <p className="text-gray-600">Create a beautiful share card</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Share Card Preview */}
          <motion.div 
            ref={cardRef}
            className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4">
                <Globe size={60} />
              </div>
              <div className="absolute bottom-4 left-4">
                <Users size={40} />
              </div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="text-sm opacity-90 mb-3 font-medium tracking-wide">WorldQuestion</div>
              <div className="text-lg font-semibold mb-6 leading-relaxed">{shareData.questionText}</div>
              <div className="text-4xl font-bold mb-3">
                I voted {shareData.userVote === 'yes' ? 'Yes' : 'No'}!
              </div>
              <div className="text-xl mb-3 font-medium">
                {shareData.globalPercentage}% of people agree with me
              </div>
              <div className="text-sm opacity-80 font-medium">
                {shareData.totalVotes.toLocaleString()} total votes
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Download size={20} />
              <span>{isGenerating ? 'Generating...' : 'Download'}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-200"
            >
              <Share2 size={20} />
              <span>Share</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareCard; 