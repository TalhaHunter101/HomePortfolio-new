import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data1 = [
  { name: 'House Extensions', days: 24 },
  { name: 'New Builds', days: 16 },
  { name: 'Change of Use', days: 15 },
  { name: 'Listed Building', days: 13 },
  { name: 'Conservation Area', days: 8 },
  { name: 'Advertisement', days: 7 },
  { name: 'Demolition', days: 4 },
  { name: 'Tree Preservation', days: 3 },
];

 export const DecisionDaysChart = () => (
    <div className="w-full h-350 p-5 bg-white rounded-lg shadow-md">
    <h3 className="mb-5 font-bold text-lg">Decision Days</h3>
  <ResponsiveContainer className={'text-xs'} width="100%" height={300}>
    <BarChart data={data1} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid horizontal={false} strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="days" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
  </div>
);


