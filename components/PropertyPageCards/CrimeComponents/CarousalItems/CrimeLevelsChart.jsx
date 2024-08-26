import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Mar 2022', value: 100 },
  { month: 'Apr 2022', value: 120 },
  { month: 'May 2022', value: 140 },
  { month: 'Jun 2022', value: 160 },
  { month: 'Jul 2022', value: 180 },
  { month: 'Aug 2022', value: 160 },
  { month: 'Sep 2022', value: 150 },
  { month: 'Oct 2022', value: 170 },
  { month: 'Nov 2022', value: 175 },
  { month: 'Dec 2022', value: 180 },
  { month: 'Jan 2023', value: 185 },
  { month: 'Feb 2023', value: 190 },
];

export const CrimeLevelsChart = () => (
  <div className="w-full h-350  bg-white rounded-lg ">
    <h3 className="mb-5 font-bold text-lg">Crimes levels overview</h3>
    <p className="mb-5 text-sm">Crime for last year (per month)</p>
    <ResponsiveContainer className={'text-xs'} width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#4DD0E1" 
          strokeWidth={2} 
          dot={{ r: 5, fill: '#ffffff', stroke: '#4DD0E1', strokeWidth: 2 }} 
          fillOpacity={0.2} 
          fill="#4DD0E1" 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default CrimeLevelsChart;
