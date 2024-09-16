import { Card } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

function HouseOccupation({ occupationData }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (occupationData && occupationData._source) {
      const sourceData = occupationData._source;

      // Mapping to simplify occupation labels
      const occupationMapping = {
        '1. Managers, directors and senior officials': 'Managers & Directors',
        '2. Professional occupations': 'Professionals',
        '3. Associate professional and technical occupations': 'Associate Professionals',
        '4. Administrative and secretarial occupations': 'Administrative & Secretarial',
        '5. Skilled trades occupations': 'Skilled Trades',
        '6. Caring, leisure and other service occupations': 'Caring & Service',
        '7. Sales and customer service occupations': 'Sales & Customer Service',
        '8. Process, plant and machine operatives': 'Process & Machine Operatives',
        '9. Elementary occupations': 'Elementary Occupations',
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith('Occupation (current):') && !key.includes('Total')) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace('Occupation (current):', '').trim();
            const mappedLabel = occupationMapping[label] || label;

            data.push({ name: mappedLabel, count });
          }
        }
      }

      setChartData(data);
    }
  }, [occupationData]);

  return (
    <Card style={{ width: '100%', height: 400 }}>
     <h1 className='text-lg text-center'>House Occupation</h1>
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
            width={200}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default HouseOccupation;
