import { Icon } from '@iconify/react';
import { Card } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';

function HouseTenure({ tenureData, city }) {
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D0ED57', '#A4DE6C', '#8DD1E1'];

  return (
   
      <><div className="bg-white p-2  rounded-lg w-full">
      <div className="flex items-center mb-4">
        <Icon
          icon="fluent:person-key-20-filled"
          width={24}
          className="text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold text-gray-700">House Tenure</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left section */}
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Who lives in {city}?</h3>
          <p className="text-gray-600 mb-2">
            The population of {city} is
            <span className="font-semibold">2,902</span> with{" "}
            <span className="font-semibold">48%</span> males and{" "}
            <span className="font-semibold">52%</span> females, and a median
            age of <span className="font-semibold">38</span>.
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">55%</span> of this neighborhood is
            occupied by families with{" "}
            <span className="font-semibold">27%</span> single families,{" "}
            <span className="font-semibold">22%</span> one-person household,
            and <span className="font-semibold">51%</span> couple families
            with kids. The average household size in Allandale is{" "}
            <span className="font-semibold">2.22</span>, and the average
            family size is <span className="font-semibold">3.04</span>.
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">56%</span> of residents in this
            neighborhood have a college degree.
          </p>
        </div>

        {/* Right section */}
        <div className="lg:w-1/2 flex flex-col gap-4 text-gray-700 text-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col text-center">
              <span>Total Population</span>
              <span className="font-semibold text-3xl">23k</span>
            </div>
            <div className="flex flex-col text-center">
              <span>Median Age</span>
              <span className="font-semibold text-3xl">38</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-14">
            <div className="flex flex-col text-center">
              <span>Average HH Income</span>
              <span className="font-semibold text-3xl">£88,189</span>
            </div>
            <div className="flex flex-col text-center">
              <span>Single Family Household</span>
              <span className="font-semibold text-3xl">26%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col gap-4 mt-8">

    <ResponsiveContainer width="100%" height={250}>
        <PieChart>
        <Legend
            layout="vertical"
            verticalAlign="middle"
            align="left"
            wrapperStyle={{ 
              paddingLeft: 60, 
              paddingTop: 20, 
              paddingBottom: 20, 
              marginLeft: 10 
            }} 
          />
          <Tooltip />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      
      </div>
      </>
    
  );
}

export default HouseTenure;
