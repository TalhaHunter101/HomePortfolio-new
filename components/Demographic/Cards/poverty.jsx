import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Data for the pie charts
const povertyDataChildren = [
  { name: 'Poverty', value: 15 },
  { name: 'Non-poverty', value: 85 },
];

const povertyDataSeniors = [
  { name: 'Poverty', value: 11 },
  { name: 'Non-poverty', value: 89 },
];

const COLORS = ['#82ca9d', '#fda4af']; // Greenish and peach color

function PovertyOverviewCard() {
  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4">
        <h2 className="text-xl font-bold">Poverty</h2>
      </CardHeader>

      {/* Body */}
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Left Section: Poverty Data */}
        <div className="lg:col-span-1">
          <h3 className="text-4xl font-bold">11%</h3>
          <p className="text-lg font-semibold">Persons below poverty line</p>
          <p className="text-sm text-gray-500 mt-2">
            about 1.4 times the rate in the Raleigh-Cary, NC Metro Area: 7.9%
          </p>
          <p className="text-sm text-gray-500">
            about 90 percent of the rate in North Carolina: 12.8%
          </p>
        </div>

        {/* Right Section: Pie Charts for Children and Seniors */}
        <div className="lg:col-span-2 flex justify-around items-center">
          {/* Children Pie Chart */}
          <div className="text-center">
            <h3 className="text-md font-semibold mb-2">Children (Under 18)</h3>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={povertyDataChildren}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {povertyDataChildren.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 text-lg font-semibold">15% Poverty</div>
          </div>

          {/* Seniors Pie Chart */}
          <div className="text-center">
            <h3 className="text-md font-semibold mb-2">Seniors (65 and over)</h3>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={povertyDataSeniors}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {povertyDataSeniors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 text-lg font-semibold">11% Poverty</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PovertyOverviewCard;
