'use client';

import React, { useState } from 'react';
import { ShareCardSVG } from '@/components/ShareCardSVG';

const themes = ['watermelon', 'mango', 'lavender'] as const;
type Theme = typeof themes[number];

export default function SharePreviewPage() {
  const [theme, setTheme] = useState<Theme>('watermelon');
  const [userChoice, setUserChoice] = useState<'YES' | 'NO'>('YES');
  const [yesRatio, setYesRatio] = useState(61);
  const [noRatio, setNoRatio] = useState(39);
  const [question, setQuestion] = useState('AI是否威胁人类？');
  const [totalVotes, setTotalVotes] = useState(1234);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <label>主题：</label>
        {themes.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-lg font-bold border ${theme === t ? 'bg-orange-400 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setTheme(t)}
          >
            {t}
          </button>
        ))}
        <label>我的选择：</label>
        <button
          className={`px-4 py-2 rounded-lg font-bold border ${userChoice === 'YES' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => setUserChoice('YES')}
        >YES</button>
        <button
          className={`px-4 py-2 rounded-lg font-bold border ${userChoice === 'NO' ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => setUserChoice('NO')}
        >NO</button>
      </div>
      <div className="mb-6 flex gap-4 items-center">
        <label>问题：</label>
        <input
          className="border rounded px-2 py-1 w-72"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <label>YES比例：</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-16"
          value={yesRatio}
          min={0}
          max={100}
          onChange={e => {
            const val = Math.max(0, Math.min(100, Number(e.target.value)));
            setYesRatio(val);
            setNoRatio(100 - val);
          }}
        />
        <label>NO比例：</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-16"
          value={noRatio}
          min={0}
          max={100}
          onChange={e => {
            const val = Math.max(0, Math.min(100, Number(e.target.value)));
            setNoRatio(val);
            setYesRatio(100 - val);
          }}
        />
        <label>总票数：</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-20"
          value={totalVotes}
          min={0}
          onChange={e => setTotalVotes(Number(e.target.value))}
        />
      </div>
      <div className="shadow-2xl rounded-3xl overflow-hidden">
        <ShareCardSVG
          question={question}
          userChoice={userChoice}
          yesRatio={yesRatio}
          noRatio={noRatio}
          totalVotes={totalVotes}
          theme={theme}
        />
      </div>
    </div>
  );
} 