'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Divider } from '@nextui-org/react';

// Sample data for the line chart
const chartData = [
  { year: 1, cashFlow: 1569, income: 2200, expenses: 630 },
  { year: 5, cashFlow: 1700, income: 2400, expenses: 700 },
  { year: 10, cashFlow: 1850, income: 2600, expenses: 750 },
  { year: 15, cashFlow: 2100, income: 2900, expenses: 800 },
  { year: 20, cashFlow: 2300, income: 3200, expenses: 900 },
  { year: 25, cashFlow: 2550, income: 3500, expenses: 950 },
  { year: 30, cashFlow: 2800, income: 3800, expenses: 1000 },
];

const SecondSection = () => {
  return (
    <div className="flex flex-col w-full mt-8">
      {/* Line Chart Section - Top */}
      <div className="flex w-full mb-8">
        <div className="flex-shrink-0 mr-8 w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#34A853" strokeWidth={2} />
              <Line type="monotone" dataKey="cashFlow" stroke="#42A5F5" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#AB47BC" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Data Summary Section - Right */}
        {/* <div className="flex-grow">
          <div className="font-semibold text-gray-700 text-2xl mb-2">Monthly Cash Flow</div>
          <div className="text-3xl font-semibold text-gray-700 mb-4">$1,569/mo</div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-lg font-semibold text-green-600">Income</div>
              <div className="text-xl text-gray-700 font-bold">$2,200/mo</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">Expenses</div>
              <div className="text-xl text-gray-700 font-bold">$630/mo</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-600">CoC ROI</div>
              <div className="text-xl text-gray-700 font-bold">75.34%</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Divider */}
     

      {/* Additional Information Section - Bottom */}
      <div className="flex px-40 justify-between">
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-gray-600">5-year annualized return</div>
          <div className="text-2xl text-gray-700 font-bold">39.11%</div>
        </div>
        <div className='border border-gray-200'/>
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-gray-600">Mortgage payment</div>
          <div className="text-2xl text-gray-700 font-bold">$429.46</div>
        </div>
      </div>
    
    </div>
  );
};

export default SecondSection;
