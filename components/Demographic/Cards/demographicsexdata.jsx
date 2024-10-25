import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const sexData = [
  { name: 'Male', value: 49 },
  { name: 'Female', value: 51 },
];

const raceEthnicityData = [
  { name: 'White', value: 53 },
  { name: 'Black', value: 26 },
  { name: 'Native', value: 0 },
  { name: 'Asian', value: 4 },
  { name: 'Islander', value: 0 },
  { name: 'Other', value: 0 },
  { name: 'Two+', value: 5 },
  { name: 'Hispanic', value: 12 },
];

const COLORS = ['#82ca9d', '#fda4af']; // Colors for the sex pie chart
const BAR_COLOR = '#82ca9d'; // Color for the bar chart

function DemographicSexRaceCard( data) {
  console.log ('dataaaaa', data)
  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-col items-start p-4">
        <div>
          <h2 className="text-xl font-bold">Sex</h2>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Pie chart for Sex */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sexData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {sexData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around w-full mt-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#82ca9d]" /> <span>Male</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFBB28]" /> <span>Female</span>
            </div>
          </div>
        </div>

        {/* Bar chart for Race & Ethnicity */}
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Race & Ethnicity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={raceEthnicityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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

export default DemographicSexRaceCard;
