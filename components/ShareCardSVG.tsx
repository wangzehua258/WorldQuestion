import React from 'react';
import { themes } from '@/app/themes';

export type ThemeKey = keyof typeof themes;

// 多段渐变色（from/via/to），与主站保持一致
const shareCardGradients: Record<ThemeKey, string[]> = {
  watermelon: ['#fef2f2', '#fdf2f8', '#f0fdf4'], // from-red-50 via-pink-50 to-green-50
  mango: ['#fff7ed', '#fefce8', '#fffbeb'], // from-orange-50 via-yellow-50 to-amber-50
  banana: ['#fefce8', '#fef9c3', '#fff7ed'], // from-yellow-50 via-amber-50 to-orange-50
  'cotton-candy': ['#fdf2f8', '#ede9fe', '#eff6ff'], // from-pink-50 via-purple-50 to-blue-50
  chocolate: ['#fffbeb', '#fff7ed', '#efebe9'], // from-amber-50 via-orange-50 to-brown-50
  'mint-candy': ['#f0fdf4', '#ecfdf5', '#ecfeff'], // from-green-50 via-emerald-50 to-cyan-50
  caramel: ['#fefce8', '#fef9c3', '#fff7ed'], // from-yellow-50 via-amber-50 to-orange-50
  forest: ['#f0fdf4', '#ecfdf5', '#f0fdfa'], // from-green-50 via-emerald-50 to-teal-50
  'blue-rose': ['#eff6ff', '#eef2ff', '#f5f3ff'], // from-blue-50 via-indigo-50 to-purple-50
  lavender: ['#f5f3ff', '#f3e8ff', '#eef2ff'], // from-purple-50 via-violet-50 to-indigo-50
  aurora: ['#f0fdf4', '#ecfeff', '#eff6ff'], // from-green-50 via-cyan-50 to-blue-50
  sunset: ['#fff7ed', '#fdf2f8', '#f5f3ff'], // from-orange-50 via-pink-50 to-purple-50
};

const shareCardThemes: Record<ThemeKey, {
  bar: string,
  text: string,
  accent: string,
}> = {
  watermelon: {
    bar: '#ff6b6b', text: '#d97706', accent: '#4ade80',
  },
  mango: {
    bar: '#ffb300', text: '#e65100', accent: '#ffe066',
  },
  banana: {
    bar: '#ffd700', text: '#b45309', accent: '#ffe066',
  },
  'cotton-candy': {
    bar: '#f472b6', text: '#a21caf', accent: '#60a5fa',
  },
  chocolate: {
    bar: '#a16207', text: '#7c4700', accent: '#fbbf24',
  },
  'mint-candy': {
    bar: '#34d399', text: '#0d9488', accent: '#22d3ee',
  },
  caramel: {
    bar: '#f59e42', text: '#b45309', accent: '#fbbf24',
  },
  forest: {
    bar: '#059669', text: '#166534', accent: '#34d399',
  },
  'blue-rose': {
    bar: '#60a5fa', text: '#3730a3', accent: '#a78bfa',
  },
  lavender: {
    bar: '#a78bfa', text: '#6d28d9', accent: '#c4b5fd',
  },
  aurora: {
    bar: '#34d399', text: '#0ea5e9', accent: '#60a5fa',
  },
  sunset: {
    bar: '#fb7185', text: '#ea580c', accent: '#fbbf24',
  },
};

interface ShareCardSVGProps {
  question: string;
  userChoice: 'YES' | 'NO';
  yesRatio: number;
  noRatio: number;
  totalVotes: number;
  theme: ThemeKey;
}

export const ShareCardSVG: React.FC<ShareCardSVGProps> = ({
  question,
  userChoice,
  yesRatio,
  noRatio,
  totalVotes,
  theme,
}) => {
  const gradientColors = shareCardGradients[theme] || shareCardGradients['watermelon'];
  const themeConfig = shareCardThemes[theme] || shareCardThemes['watermelon'];
  const barWidth = 800 * (yesRatio / 100);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" style={{ borderRadius: 32, overflow: 'hidden' }}>
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradientColors[0]} />
          {gradientColors[1] && <stop offset="50%" stopColor={gradientColors[1]} />}
          {gradientColors[2] && <stop offset="100%" stopColor={gradientColors[2]} />}
        </linearGradient>
      </defs>
      <rect width="1080" height="1350" fill="url(#bgGradient)" />
      <text x="540" y="180" fontSize="64" fontWeight="bold" fill={themeConfig.text} textAnchor="middle" fontFamily="sans-serif">
        {question}
      </text>
      <rect x="140" y="300" width="800" height="40" rx="20" fill="#ffffff44" />
      <rect x="140" y="300" width={barWidth} height="40" rx="20" fill={themeConfig.bar} />
      <text x="140" y="290" fontSize="32" fill={themeConfig.accent} textAnchor="start" fontFamily="sans-serif">YES</text>
      <text x="940" y="290" fontSize="32" fill={themeConfig.accent} textAnchor="end" fontFamily="sans-serif">NO</text>
      <text x="140" y="370" fontSize="28" fill={themeConfig.accent} textAnchor="start" fontFamily="sans-serif">{yesRatio}%</text>
      <text x="940" y="370" fontSize="28" fill={themeConfig.accent} textAnchor="end" fontFamily="sans-serif">{noRatio}%</text>
      <text x="540" y="500" fontSize="40" fill={themeConfig.text} fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        {userChoice === 'YES' ? '✅ 我选了 YES' : '❌ 我选了 NO'}
      </text>
      <text x="540" y="580" fontSize="28" fill={themeConfig.text} textAnchor="middle" fontFamily="sans-serif">
        {totalVotes}人参与
      </text>
      <text x="540" y="1290" fontSize="24" fill="#ffffffaa" textAnchor="middle" fontFamily="sans-serif">
        🌍 worldquestion.com
      </text>
    </svg>
  );
}; 