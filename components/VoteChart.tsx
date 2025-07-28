'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface VoteChartProps {
  yesVotes: number;
  noVotes: number;
  showBar?: boolean;
}

const VoteChart: React.FC<VoteChartProps> = ({ yesVotes, noVotes, showBar = false }) => {
  const total = yesVotes + noVotes;
  const yesPercentage = total > 0 ? Math.round((yesVotes / total) * 100) : 0;
  const noPercentage = total > 0 ? Math.round((noVotes / total) * 100) : 0;

  const doughnutData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        data: [yesVotes, noVotes],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        data: [yesVotes, noVotes],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed.toLocaleString()} votes (${percentage}%)`;
          }
        }
      },
    },
  };

  const barOptions = {
    ...options,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Vote Results</h3>
        <div className="flex justify-center space-x-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-success-600 mb-2">{yesPercentage}%</div>
            <div className="text-sm text-gray-600 font-medium">Yes ({yesVotes.toLocaleString()})</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-danger-600 mb-2">{noPercentage}%</div>
            <div className="text-sm text-gray-600 font-medium">No ({noVotes.toLocaleString()})</div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        {showBar ? (
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        ) : (
          <div className="h-80 relative">
            <Doughnut data={doughnutData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{total.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full shadow-lg">
          <span className="text-sm font-semibold text-gray-700">
            Total {total.toLocaleString()} votes cast
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default VoteChart; 