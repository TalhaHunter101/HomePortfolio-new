"use client";
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
  Area,
} from 'recharts';

const SaleEstimatesChart = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
    return `${year}-${month}`;
  };

  const processedData = data.saleEstimates.map((estimate) => ({
    date: formatDate(estimate.builtAt),
    currentPrice: parseFloat(estimate.currentPrice),
    lowerPrice: parseFloat(estimate.lowerPrice),
    upperPrice: parseFloat(estimate.upperPrice),
  }));

  return (
    <ResponsiveContainer width="100%" height={400} className="mx-5">
      <LineChart data={processedData} className='p-6'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `£${value.toLocaleString()}`} />
        <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="currentPrice" 
          stroke="#ff7300" 
          fill="#ff7300" 
          fillOpacity={0.3} 
        />
        <Line 
          type="monotone" 
          dataKey="currentPrice" 
          stroke="#ff7300" 
          dot={{ r: 3 }} 
        />
        <Line 
          type="monotone" 
          dataKey="lowerPrice" 
          stroke="#82ca9d" 
          dot={{ r: 3 }} 
        />
        <Line 
          type="monotone" 
          dataKey="upperPrice" 
          stroke="#8884d8" 
          dot={{ r: 3 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SaleEstimatesChart;
