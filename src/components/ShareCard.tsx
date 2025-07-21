import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, X } from 'lucide-react';
import { ShareCard as ShareCardType } from '../types';

interface ShareCardProps {
  shareData: ShareCardType;
  onClose: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({ shareData, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        
        const link = document.createElement('a');
        link.download = 'worldquestion-share.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your Vote</h3>
            <p className="text-gray-600">Create a beautiful share card</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Share Card Preview */}
        <div 
          ref={cardRef}
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-8 text-white mb-8 shadow-lg"
        >
          <div className="text-center">
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
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
          >
            <Download size={20} />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareCard; 