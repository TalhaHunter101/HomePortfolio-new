import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const FamilyCustomPieChart = () => {
  const data = [
    { name: 'Married with kids', value: 2000 },
    { name: 'Married, no kids', value: 3460 },
    { name: 'Single male family', value: 200 },
    { name: 'Single female family', value: 283 },
  ];

  const COLORS = ['#1A2B41', '#5AB2F6', '#A3D4FF', '#5AA9F6'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const labelThreshold = 5;

    if (percent * 100 < labelThreshold) {
      return null;
    }

    
    const radius = outerRadius * 0.5; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm"
        style={{
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full mb-10 flex justify-center items-center">
      <ResponsiveContainer width="60%" height={300}>
        <PieChart>
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.3" />
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
            style={{ filter: 'url(#shadow)' }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
