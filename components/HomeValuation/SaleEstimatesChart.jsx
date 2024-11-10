"use client";
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from 'recharts';

const SaleEstimatesChart = ({ data, colors }) => {
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          {payload.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm font-medium">
                £{item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart 
        data={processedData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <defs>
          <linearGradient id="currentPriceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.chart.primary} stopOpacity={0.2}/>
            <stop offset="95%" stopColor={colors.chart.primary} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="upperPriceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.chart.secondary} stopOpacity={0.1}/>
            <stop offset="95%" stopColor={colors.chart.secondary} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="lowerPriceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.chart.accent} stopOpacity={0.1}/>
            <stop offset="95%" stopColor={colors.chart.accent} stopOpacity={0}/>
          </linearGradient>
        </defs>

        <XAxis 
          dataKey="date" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={{ stroke: '#e2e8f0' }}
        />
        <YAxis 
          tickFormatter={(value) => `£${(value/1000)}k`}
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={{ stroke: '#e2e8f0' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top" 
          height={36}
          formatter={(value) => (
            <span className="text-sm font-medium text-gray-600">
              {value === 'currentPrice' ? 'Current Price' : 
               value === 'upperPrice' ? 'Upper Estimate' : 
               'Lower Estimate'}
            </span>
          )}
        />

        <Area
          type="monotone"
          dataKey="currentPrice"
          stroke={colors.chart.primary}
          strokeWidth={3}
          fill="url(#currentPriceGradient)"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="upperPrice"
          stroke={colors.chart.secondary}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="lowerPrice"
          stroke={colors.chart.accent}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SaleEstimatesChart;
