"use client";
import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const HistoricSalesChart = ({ data }) => {
  const processedData = data.history.historicSales.map((sale) => ({
    date: sale.date,
    price: parseFloat(sale.price),
    percentageChange: parseFloat(sale.percentageChange) || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={processedData} className='p-6'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis 
          yAxisId="left" 
          tickFormatter={(value) => `£${value.toLocaleString()}`} 
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tickFormatter={(value) => `${value}%`} 
        />
        <Tooltip 
          formatter={(value, name) => 
            name === 'price' 
              ? `£${value.toLocaleString()}` 
              : `${value}%`} 
        />
        <Legend />
        <Bar 
          yAxisId="left" 
          dataKey="price" 
          barSize={20} 
          fill="#8884d8" 
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="percentageChange" 
          stroke="#ff7300" 
          dot={{ r: 3 }} 
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default HistoricSalesChart;
