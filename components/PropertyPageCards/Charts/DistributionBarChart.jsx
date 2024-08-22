'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, defs, linearGradient, stop } from 'recharts';
import { CardBody } from '@nextui-org/react';

const data = [
  { priceRange: '$249K', homes: 200 },
  { priceRange: '$720K', homes: 750 },
  { priceRange: '$1.15M', homes: 500 },
  { priceRange: '$1.51M to $1.66M', homes: 66 },
  { priceRange: '$1.58M', homes: 400 },
  { priceRange: '$2.02M', homes: 280 },
  { priceRange: '$2.45M', homes: 100 },
  { priceRange: '$2.88M', homes: 50 },
  { priceRange: '$14.37M', homes: 200 },
];

export const DistributionBarChart = () => {
  return (
    <CardBody className="w-full flex flex-col justify-between bg-white rounded-lg">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            barCategoryGap={0} 
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="priceRange"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{
                value: 'Houses List Price',
                position: 'insideBottom',
                offset: -10,
                fill: '#6b7280',
                fontSize: 14,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{
                value: '# of Homes',
                angle: -90,
                position: 'insideLeft',
                offset: 0,
                fill: '#6b7280',
                fontSize: 14,
              }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                padding: '5px',
                borderRadius: '4px',
              }}
              labelStyle={{
                color: '#111827',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '5px',
              }}
              itemStyle={{
                color: '#3b82f6',
                fontSize: '12px',
              }}
              formatter={(value, name, props) => {
                return [
                  `# of homes: ${value}`,
                  `${props.payload.priceRange}`,
                ];
              }}
              labelFormatter={() => ``} 
            />
            <Bar dataKey="homes" fill="rgba(156, 39, 176, 0.5)" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBody>
  );
};
