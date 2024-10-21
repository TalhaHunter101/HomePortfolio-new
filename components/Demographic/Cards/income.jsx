import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy data for the bar chart (Household income distribution)
const householdIncomeData = [
  { name: 'Under $50K', value: 30 },
  { name: '$50K - $100K', value: 32 },
  { name: '$100K - $200K', value: 25 },
  { name: 'Over $200K', value: 13 },
];

const BAR_COLOR = '#82ca9d'; // Color for the bar chart

function IncomeOverviewCard() {
  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4">
        <h2 className="text-xl font-bold">Income</h2>
      </CardHeader>

      {/* Body */}
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Left Side: Income Details */}
        <div className="lg:col-span-1">
          {/* Per Capita Income */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">$47,035</h3>
            <p className="text-lg font-semibold">Per capita income</p>
            <p className="text-sm text-gray-500 mt-2">
              about the same as the amount in the Raleigh-Cary, NC Metro Area: $47,404
            </p>
            <p className="text-sm text-gray-500">
              about 25 percent higher than the amount in North Carolina: $38,701
            </p>
          </div>

          {/* Median Household Income */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">$75,424</h3>
            <p className="text-lg font-semibold">Median household income</p>
            <p className="text-sm text-gray-500 mt-2">
              about 80 percent of the amount in the Raleigh-Cary, NC Metro Area: $92,739
            </p>
            <p className="text-sm text-gray-500">
              about 10 percent higher than the amount in North Carolina: $67,481
            </p>
          </div>
        </div>

        {/* Right Side: Household Income Distribution Chart */}
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Household income</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={householdIncomeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={BAR_COLOR} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default IncomeOverviewCard;
