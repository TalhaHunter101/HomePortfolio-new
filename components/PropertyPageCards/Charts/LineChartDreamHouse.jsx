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

export const DreamHouseLineChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    if (!data || data.length === 0) {
      console.log("No data available");
      return;
    }

    const aggregateData = (rawData) => {
      const currentYear = new Date().getFullYear();
      const oneYearAgo = currentYear - 1;

      const filteredData = rawData.filter(item => {
        const itemYear = parseInt(item._source.deed_date.split('-')[0]);
        return itemYear >= oneYearAgo;
      });

      const monthlyData = filteredData.reduce((acc, item) => {
        const [year, month] = item._source.deed_date.split('-');
        const key = `${year}-${month}`;
        const price = parseInt(item._source.price_paid);
        const type = item._source.property_type;

        if (!acc[key]) {
          acc[key] = { S: [], D: [], F: [], T: [], date: new Date(year, month - 1) };
        }

        if (['S', 'D', 'F', 'T'].includes(type)) {
          acc[key][type].push(price);
        }

        return acc;
      }, {});

      return Object.entries(monthlyData).map(([key, value]) => ({
        date: value.date,
        S: value.S.length ? Math.round(value.S.reduce((a, b) => a + b, 0) / value.S.length) : null,
        D: value.D.length ? Math.round(value.D.reduce((a, b) => a + b, 0) / value.D.length) : null,
        F: value.F.length ? Math.round(value.F.reduce((a, b) => a + b, 0) / value.F.length) : null,
        T: value.T.length ? Math.round(value.T.reduce((a, b) => a + b, 0) / value.T.length) : null,
      })).sort((a, b) => a.date - b.date);
    };

    const aggregatedData = aggregateData(data);

    console.log("Final aggregated data:", aggregatedData);

    const formattedData = aggregatedData.map(item => ({
      name: item.date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      Detached: item.D,
      SemiDetached: item.S,
      Terraced: item.T,
      Flat: item.F,
    }));

    console.log("Formatted chart data:", formattedData);

    setChartData(formattedData);
  }, [data]);

  // Function to format numbers with suffixes k, M, B
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num;
    }
  };

  if (chartData.length === 0) {
    return <div>No data available for the chart</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `£${formatNumber(value)}`} />
        <Tooltip
          formatter={(value) => `£${formatNumber(value)}`}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Line type="monotone" dataKey="Detached" stroke="#9333ea" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="SemiDetached" stroke="#2563eb" />
        <Line type="monotone" dataKey="Terraced" stroke="#16a34a" />
        <Line type="monotone" dataKey="Flat" stroke="#4b4b4b" />
      </LineChart>
    </ResponsiveContainer>
  );
};
