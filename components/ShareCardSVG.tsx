import React, { forwardRef } from 'react';
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
  yesColor: string,
  noColor: string,
}> = {
  watermelon: {
    bar: '#ff6b6b', text: '#d97706', accent: '#4ade80',
    yesColor: '#10b981', noColor: '#ef4444',
  },
  mango: {
    bar: '#ffb300', text: '#e65100', accent: '#ffe066',
    yesColor: '#f59e0b', noColor: '#dc2626',
  },
  banana: {
    bar: '#ffd700', text: '#b45309', accent: '#ffe066',
    yesColor: '#eab308', noColor: '#dc2626',
  },
  'cotton-candy': {
    bar: '#f472b6', text: '#a21caf', accent: '#60a5fa',
    yesColor: '#8b5cf6', noColor: '#ec4899',
  },
  chocolate: {
    bar: '#a16207', text: '#7c4700', accent: '#fbbf24',
    yesColor: '#d97706', noColor: '#92400e',
  },
  'mint-candy': {
    bar: '#34d399', text: '#0d9488', accent: '#22d3ee',
    yesColor: '#059669', noColor: '#0891b2',
  },
  caramel: {
    bar: '#f59e42', text: '#b45309', accent: '#fbbf24',
    yesColor: '#d97706', noColor: '#dc2626',
  },
  forest: {
    bar: '#059669', text: '#166534', accent: '#34d399',
    yesColor: '#047857', noColor: '#0f766e',
  },
  'blue-rose': {
    bar: '#60a5fa', text: '#3730a3', accent: '#a78bfa',
    yesColor: '#3b82f6', noColor: '#8b5cf6',
  },
  lavender: {
    bar: '#a78bfa', text: '#6d28d9', accent: '#c4b5fd',
    yesColor: '#7c3aed', noColor: '#a855f7',
  },
  aurora: {
    bar: '#34d399', text: '#0ea5e9', accent: '#60a5fa',
    yesColor: '#059669', noColor: '#0284c7',
  },
  sunset: {
    bar: '#fb7185', text: '#ea580c', accent: '#fbbf24',
    yesColor: '#f97316', noColor: '#f43f5e',
  },
};

// 文字换行函数
const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    // 估算文字宽度（每个字符约0.6倍字体大小）
    const estimatedWidth = testLine.length * fontSize * 0.6;
    
    if (estimatedWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // 单个词太长，强制换行
        lines.push(word);
      }
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
};

interface ShareCardSVGProps {
  question: string;
  userChoice: 'YES' | 'NO' | 'NEUTRAL';
  yesRatio: number;
  noRatio: number;
  totalVotes: number;
  theme: ThemeKey;
  width?: number;
  height?: number;
}

export const ShareCardSVG = forwardRef<SVGSVGElement, ShareCardSVGProps>(
  ({
    question,
    userChoice,
    yesRatio,
    noRatio,
    totalVotes,
    theme,
    width = 320,
    height = 400,
  }, ref) => {
    const gradientColors = shareCardGradients[theme] || shareCardGradients['watermelon'];
    const themeConfig = shareCardThemes[theme] || shareCardThemes['watermelon'];
    const scale = width / 1080;
    
    // 更大的字体尺寸，更好的视觉层次
    const titleFontSize = Math.max(48, 72 * scale);
    const subtitleFontSize = Math.max(32, 48 * scale);
    const bodyFontSize = Math.max(28, 36 * scale);
    const smallFontSize = Math.max(24, 32 * scale);
    const tinyFontSize = Math.max(20, 28 * scale);
    
    // 文字换行
    const questionLines = wrapText(question, 900, titleFontSize);
    const questionHeight = questionLines.length * titleFontSize * 1.3;
    
    // 重新设计布局 - 从卡片1/4处开始，增加间距
    const cardHeight = 1350;
    const questionStartY = cardHeight * 0.25 + (questionHeight / 2);
    const barY = questionStartY + questionHeight + 180; // Increased spacing from 120 to 180
    const choiceY = barY + 100;
    const votesY = choiceY + 80;
    const footerY = cardHeight - 70;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 1080 1350"
        style={{ borderRadius: 32, overflow: 'hidden', width: '100%', height: 'auto', maxWidth: '100%' }}
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradientColors[0]} />
            {gradientColors[1] && <stop offset="50%" stopColor={gradientColors[1]} />}
            {gradientColors[2] && <stop offset="100%" stopColor={gradientColors[2]} />}
          </linearGradient>
          
          {/* YES投票条渐变 */}
          <linearGradient id="yesGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={themeConfig.yesColor} />
            <stop offset="100%" stopColor={themeConfig.yesColor} stopOpacity="0.8" />
          </linearGradient>
          
          {/* NO投票条渐变 */}
          <linearGradient id="noGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={themeConfig.noColor} />
            <stop offset="100%" stopColor={themeConfig.noColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* 背景 */}
        <rect width="1080" height="1350" fill="url(#bgGradient)" />
        
        {/* 问题文字 - 更大更醒目 */}
        {questionLines.map((line, index) => (
          <text
            key={index}
            x="540"
            y={questionStartY + (index * titleFontSize * 1.3)}
            fontSize={titleFontSize}
            fontWeight="bold"
            fill={themeConfig.text}
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {line}
          </text>
        ))}
        
        {/* 重新设计的投票条 - 更美观 */}
        <rect x="90" y={barY} width="900" height="50" rx="25" fill="#ffffff44" />
        
        {/* YES 部分 */}
        <rect 
          x="90" 
          y={barY} 
          width={900 * (yesRatio / 100)} 
          height="50" 
          rx="25" 
          fill="url(#yesGradient)" 
        />
        
        {/* NO 部分 */}
        <rect 
          x="90" 
          y={barY} 
          width={900 * (noRatio / 100)} 
          height="50" 
          rx="25" 
          fill="url(#noGradient)" 
          transform={`translate(${900 * (yesRatio / 100)}, 0)`}
        />
        
        {/* YES/NO 标签 - 更清晰 */}
        <text x="90" y={barY - 20} fontSize={bodyFontSize} fill={themeConfig.yesColor} textAnchor="start" fontFamily="sans-serif" fontWeight="bold">
          YES {yesRatio}%
        </text>
        <text x="990" y={barY - 20} fontSize={bodyFontSize} fill={themeConfig.noColor} textAnchor="end" fontFamily="sans-serif" fontWeight="bold">
          NO {noRatio}%
        </text>
        
        {/* 用户选择 - 更突出 */}
        <text x="540" y={choiceY} fontSize={subtitleFontSize} fill={themeConfig.text} fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          {userChoice === 'YES' ? '✅     I voted YES' : userChoice === 'NO' ? '❌     I voted NO' : '🤔  What do you think?'}
        </text>
        
        {/* 参与人数 - 更清晰 */}
        <text x="540" y={votesY} fontSize={bodyFontSize} fill={themeConfig.text} textAnchor="middle" fontFamily="sans-serif" fontWeight="500">
          {totalVotes} people participated
        </text>
        
        {/* 底部链接 - 更优雅 */}
        <text x="540" y={footerY} fontSize={tinyFontSize} fill="#ffffffcc" textAnchor="middle" fontFamily="sans-serif" fontWeight="500">
          🌍 worldquestion.com
        </text>
      </svg>
    );
  }
);
ShareCardSVG.displayName = 'ShareCardSVG'; 