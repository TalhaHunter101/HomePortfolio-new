'use client';

import React, { useEffect, useState } from 'react';
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

export const DreamHouseLineChart = ({ type = "line", data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const aggregateData = (rawData) => {
      rawData.sort((a, b) => new Date(a._source.deed_date) - new Date(b._source.deed_date));

      const totalPoints = 20;
      const chunkSize = Math.ceil(rawData.length / totalPoints);
      const aggregated = [];

      for (let i = 0; i < rawData.length; i += chunkSize) {
        const chunk = rawData.slice(i, i + chunkSize);
        const chunkData = { S: [], D: [], F: [], date: new Date(chunk[0]._source.deed_date) };

        chunk.forEach(item => {
          const price_paid = parseInt(item._source.price_paid);
          const property_type = item._source.property_type;

          if (['S', 'D', 'F'].includes(property_type)) {
            chunkData[property_type].push(price_paid);
          }
        });

        aggregated.push({
          date: chunkData.date,
          S: chunkData.S.length ? Math.round(chunkData.S.reduce((a, b) => a + b, 0) / chunkData.S.length) : null,
          D: chunkData.D.length ? Math.round(chunkData.D.reduce((a, b) => a + b, 0) / chunkData.D.length) : null,
          F: chunkData.F.length ? Math.round(chunkData.F.reduce((a, b) => a + b, 0) / chunkData.F.length) : null,
        });
      }

      return aggregated;
    };

    const aggregatedData = aggregateData(data);

    const formattedData = aggregatedData.map(item => ({
      name: item.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      Detached: item.D,
      SemiDetached: item.S,
      Flat: item.F,
    }));

    setChartData(formattedData);
  }, [data]);

  return (
    <ResponsiveContainer className="text-xs    " width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid  vertical={false} strokeDasharray="3 3" />
        <XAxis className='text-xs ' dataKey="name" />
        <YAxis className='text-xs' tickFormatter={(value) => `£${value}K`} />
        <Tooltip
          formatter={(value) => `£${value}K`}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend className='text-xs' />
        <Line type="monotone" dataKey="Detached" stroke="#9333ea" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="SemiDetached" stroke="#2563eb" />
        <Line type="monotone" dataKey="Flat" stroke="#4b4b4b" />
      </LineChart>
    </ResponsiveContainer>
  );
};
