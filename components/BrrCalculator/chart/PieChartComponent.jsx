import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PieChartComponent = () => {
  const data = [
    { name: 'Vacancy', value: 69 },
    { name: 'CapEx', value: 69 },
    { name: 'Water & Sewer', value: 22 },
    { name: 'HOA', value: 123 },
    { name: 'Management', value: 154 },
    { name: 'Property Taxes', value: 195.42 },
    { name: 'Repairs', value: 11.5 },
    { name: 'Electricity', value: 22 },
    { name: 'Garbage', value: 123 },
    { name: 'Insurance', value: 1232 },
    { name: 'P&I', value: 1232.13 },
    { name: 'Misc', value: 12 },
  ];

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA65CC', '#FFD700', '#FF6666',
    '#33A1C9', '#B5A642', '#D2691E', '#9932CC', '#DAA520',
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
