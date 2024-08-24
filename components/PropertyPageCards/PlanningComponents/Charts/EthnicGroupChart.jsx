import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'House Extensions', approved: 40, inProgress: 10, pending: 8, rejected: 4, withdrawn: 2 },
  { name: 'New Builds', approved: 35, inProgress: 8, pending: 6, rejected: 5, withdrawn: 1 },
  { name: 'Change of Use', approved: 30, inProgress: 5, pending: 9, rejected: 2, withdrawn: 3 },
  { name: 'Listed Building', approved: 25, inProgress: 3, pending: 5, rejected: 7, withdrawn: 1 },
  { name: 'Conservation Area', approved: 20, inProgress: 7, pending: 6, rejected: 2, withdrawn: 1 },
  { name: 'Advertisement', approved: 10, inProgress: 4, pending: 3, rejected: 2, withdrawn: 1 },
  { name: 'Demolition', approved: 15, inProgress: 3, pending: 2, rejected: 1, withdrawn: 0 },
  { name: 'Tree Preservation', approved: 5, inProgress: 1, pending: 1, rejected: 0, withdrawn: 0 },
  { name: 'Landscaping', approved: 8, inProgress: 1, pending: 1, rejected: 0, withdrawn: 0 },
];

export const EthnicGroupChart = () => (
    <div className="w-full h-350 p-5 bg-white rounded-lg shadow-md">
    <h3 className="mb-5 font-bold text-lg">Ethnic Group</h3>
  <ResponsiveContainer className={'text-xs'} width="100%" height={300}>
    <BarChart data={data} layout="vertical"  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid horizontal={false} strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="approved" stackId="a" fill="#4CAF50" name="Approved" />
      <Bar dataKey="inProgress" stackId="a" fill="#2196F3" name="In progress" />
      <Bar dataKey="pending" stackId="a" fill="#FF9800" name="Pending" />
      <Bar dataKey="rejected" stackId="a" fill="#F44336" name="Rejected" />
      <Bar dataKey="withdrawn" stackId="a" fill="#9E9E9E" name="Withdrawn" />
    </BarChart>
  </ResponsiveContainer>
  </div>
);

export default EthnicGroupChart;
