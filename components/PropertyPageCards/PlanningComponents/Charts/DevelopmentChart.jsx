import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Residential', value: 24 },
  { name: 'Commercial', value: 18 },
  { name: 'Industrial', value: 15 },
  { name: 'Infrastructure', value: 13 },
  { name: 'Institutional', value: 8 },
  { name: 'Mixed-use', value: 7 },
  { name: 'Leisure & Recreation', value: 4 },
  { name: 'Tree Preservation', value: 3 },
];

export const DevelopmentChart = () => (
  <div className="w-full h-350 p-5 bg-white rounded-lg shadow-md">
    <h3 className="mb-5 font-bold text-lg">Development Categories</h3>
    <ResponsiveContainer className={'text-xs'} width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
    <div className="mt-2 text-right font-bold">
      Total <span className="font-normal">145</span>
    </div>
  </div>
);

export default DevelopmentChart;
