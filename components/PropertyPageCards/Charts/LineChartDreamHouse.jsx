// DreamHouseLineChart.js
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Sep 2023', SingleFamily: 550, Condos: 370 },
  { name: 'Nov 2023', SingleFamily: 560, Condos: 380 },
  { name: 'Jan 2024', SingleFamily: 540, Condos: 360 },
  { name: 'Mar 2024', SingleFamily: 530, Condos: 350 },
  { name: 'May 2024', SingleFamily: 580, Condos: 400 },
  { name: 'Jul 2024', SingleFamily: 610, Condos: 390 },
];

export const DreamHouseLineChart = () => {
  return (
    <ResponsiveContainer className="text-sm" width="100%" height={300}>
        
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis className='text-xs' dataKey="name" />
        <YAxis className='text-xs' tickFormatter={(value) => `$${value}K`} />
        <Tooltip
        
          formatter={(value) => `$${value}K`}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend className='text-xs' />
        <Line  type="monotone" dataKey="SingleFamily" stroke="#9333ea" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Condos" stroke="#2563eb" />
      </LineChart>
    </ResponsiveContainer>
  );
};
