import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = () => {
  const data = [
    { year: 'Year 1', income: 0, expenses: 20645, cashflow: -20645 },
    { year: 'Year 2', income: 0, expenses: 35430, cashflow: -35430 },
    // Add more data as required.
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold">Income, Expenses and Cashflow</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            <Line type="monotone" dataKey="cashflow" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Loan Balance, Value and Equity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
            <Line type="monotone" dataKey="cashflow" stroke="#82ca9d" />
            <Line type="monotone" dataKey="income" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
