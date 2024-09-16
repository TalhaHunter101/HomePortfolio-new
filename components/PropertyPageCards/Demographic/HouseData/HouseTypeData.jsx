import { Card } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

function HouseTypeData({ housingData }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (housingData && housingData._source) {
      const sourceData = housingData._source;

      const validValues = {
        Detached: 'Detached',
        'Semi-detached': 'Semi-detached',
        Terraced: 'Terraced',
        'flats or tenement': 'Flats or Tenement',
        warehouse: 'Warehouse',
        mobile: 'Mobile Home',
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith('Accommodation type:')) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace('Accommodation type:', '').trim();
            let mappedLabel = null;

            for (let validKey in validValues) {
              if (label.toLowerCase().includes(validKey.toLowerCase())) {
                mappedLabel = validValues[validKey];
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
  }, [housingData]);

  return (
    <Card style={{ width: '100%', height: 400 }}>
    <h1 className='text-lg text-center'>House Type</h1>
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
          <Bar dataKey="count" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default HouseTypeData;
