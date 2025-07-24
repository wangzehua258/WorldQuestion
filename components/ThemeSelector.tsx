'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RotateCcw, Check, Settings } from 'lucide-react';
import { themes, getCurrentTheme, setUserTheme, clearUserTheme, ThemeKey } from '@/app/themes';

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('watermelon');
  const [isAutoMode, setIsAutoMode] = useState(true);

  useEffect(() => {
    const theme = getCurrentTheme();
    setCurrentTheme(theme);
    // 检查是否在自动模式
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('selectedTheme');
      setIsAutoMode(!savedTheme);
    }
  }, []);

  const handleThemeChange = (themeKey: ThemeKey) => {
    setCurrentTheme(themeKey);
    setUserTheme(themeKey);
    setIsAutoMode(false);
    // 刷新页面以应用新主题
    window.location.reload();
  };

  const enableAutoMode = () => {
    clearUserTheme();
    setIsAutoMode(true);
    // 刷新页面以应用每日主题
    window.location.reload();
  };

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white rounded-full shadow-2xl border border-slate-200 hover:shadow-xl transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette className="w-6 h-6 text-slate-600" />
      </motion.button>

      {/* Theme Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Theme Settings</h3>
              <Settings className="w-5 h-5 text-slate-500" />
            </div>

            {/* Auto Mode Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Daily Auto Switch</p>
                  <p className="text-xs text-slate-500">Theme changes automatically each day</p>
                </div>
                <button
                  onClick={enableAutoMode}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isAutoMode
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isAutoMode ? 'Active' : 'Enable'}
                </button>
              </div>
            </div>

            {/* Current Theme Display */}
            <div className="mb-4 p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-1">Current Theme</p>
              <p className="text-sm font-medium text-slate-800">
                {themes[currentTheme].name}
                {isAutoMode && (
                  <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Auto
                  </span>
                )}
              </p>
            </div>

            {/* Theme Options */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700 mb-3">Choose Theme</p>
              {Object.entries(themes).map(([key, theme]) => (
                <motion.button
                  key={key}
                  onClick={() => handleThemeChange(key as ThemeKey)}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                    currentTheme === key
                      ? 'bg-slate-100 border-2 border-slate-300'
                      : 'bg-white border border-slate-200 hover:bg-slate-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{theme.name}</p>
                      <p className="text-xs text-slate-500">{theme.description}</p>
                    </div>
                    {currentTheme === key && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Theme Preview */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 mb-2">Preview</p>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(themes).map(([key, theme]) => (
                  <div
                    key={key}
                    className={`w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 ${
                      currentTheme === key ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{
                      background: key === 'watermelon' ? 'linear-gradient(135deg, #ef4444, #10b981)' :
                                key === 'mango' ? 'linear-gradient(135deg, #f97316, #eab308)' :
                                key === 'banana' ? 'linear-gradient(135deg, #eab308, #f59e0b)' :
                                key === 'cotton-candy' ? 'linear-gradient(135deg, #ec4899, #3b82f6)' :
                                key === 'chocolate' ? 'linear-gradient(135deg, #f59e0b, #ea580c)' :
                                key === 'mint-candy' ? 'linear-gradient(135deg, #22c55e, #06b6d4)' :
                                key === 'caramel' ? 'linear-gradient(135deg, #eab308, #f97316)' :
                                key === 'forest' ? 'linear-gradient(135deg, #22c55e, #10b981)' :
                                key === 'blue-rose' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' :
                                key === 'lavender' ? 'linear-gradient(135deg, #a855f7, #8b5cf6)' :
                                key === 'aurora' ? 'linear-gradient(135deg, #22c55e, #3b82f6)' :
                                key === 'sunset' ? 'linear-gradient(135deg, #f97316, #ec4899)' :
                                'linear-gradient(135deg, #64748b, #475569)'
                    }}
                    onClick={() => handleThemeChange(key as ThemeKey)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 