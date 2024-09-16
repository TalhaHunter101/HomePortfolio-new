import { Card } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

function HouseTenure({ tenureData }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (tenureData && tenureData._source) {
      const sourceData = tenureData._source;

      const validTensor = {
        'Owns outright': 'Owned outright',
        'Owns with a mortgage or loan': 'Owned (mortgage)',
        'Shared ownership': 'Shared Ownership',
        'Social rented': 'Rented (social landlord)',
        'Rents from council': 'Rented (council)',
        'Private rented': 'Rented (private landlord)',
        'Lives rent free': 'Rent-Free',
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith('Tenure of household:')) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace('Tenure of household:', '').trim();
            let mappedLabel = null;

            for (let validKey in validTensor) {
              if (label.toLowerCase().includes(validKey.toLowerCase())) {
                mappedLabel = validTensor[validKey];
                break;
              }
            }

            if (mappedLabel) {
              data.push({ name: mappedLabel, count });
            }
          }
        }
      }

      setChartData(data);
    }
  }, [tenureData]);

  return (
    <Card style={{ width: '100%', height: 400 }}>
     <h1 className='text-lg text-center'>House Tenure</h1>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis
            dataKey="name"
            type="category"
            interval={0}
            width={150}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default HouseTenure;
