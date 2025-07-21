import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface VoteChartProps {
  yesVotes: number;
  noVotes: number;
}

const VoteChart: React.FC<VoteChartProps> = ({ yesVotes, noVotes }) => {
  const data = [
    { name: 'Yes', value: yesVotes, color: '#10b981' },
    { name: 'No', value: noVotes, color: '#ef4444' }
  ];

  const total = yesVotes + noVotes;
  const yesPercentage = total > 0 ? Math.round((yesVotes / total) * 100) : 0;
  const noPercentage = total > 0 ? Math.round((noVotes / total) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Vote Results</h3>
        <div className="flex justify-center space-x-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{yesPercentage}%</div>
            <div className="text-sm text-gray-600 font-medium">Yes ({yesVotes.toLocaleString()})</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{noPercentage}%</div>
            <div className="text-sm text-gray-600 font-medium">No ({noVotes.toLocaleString()})</div>
          </div>
        </div>
      </div>
      
      <div className="h-72 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} votes`, 'Votes']}
              labelFormatter={(label) => `${label} (${((data.find(d => d.name === label)?.value || 0) / total * 100).toFixed(1)}%)`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
          <span className="text-sm font-medium text-gray-700">
            Total {total.toLocaleString()} votes
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoteChart; 