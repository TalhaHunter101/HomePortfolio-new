import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ageRangeData = [
  { name: '0-9', value: 11 },
  { name: '10-19', value: 12 },
  { name: '20-29', value: 18 },
  { name: '30-39', value: 18 },
  { name: '40-49', value: 13 },
  { name: '50-59', value: 11 },
  { name: '60-69', value: 8 },
  { name: '70-79', value: 6 },
  { name: '80+', value: 3 },
];

const ageCategoryData = [
  { name: 'Under 18', value: 23 },
  { name: '18 to 64', value: 68 },
  { name: '65 and over', value: 9 },
];

const COLORS = ['#82ca9d', '#fda4af', '#8884d8'];

function ageCard() {
  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-col items-start p-4">
        <div>
          <h2 className="text-xl font-bold">Age</h2>
          <p className="text-4xl font-semibold mt-2">34.6</p>
          <p className="text-md text-gray-500">Median age</p>
          <p className="text-sm mt-2 text-gray-500">
            about 90 percent of the figure in the Raleigh-Cary, NC Metro Area: 37.5
          </p>
          <p className="text-sm text-gray-500">
            about 90 percent of the figure in North Carolina: 39.2
          </p>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Bar chart for Population by Age Range */}
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Population by age range</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageRangeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart for Population by Age Category */}
        <div>
          <h3 className="text-md font-bold mb-4">Population by age category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ageCategoryData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                {ageCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#82ca9d]" /> <span>Under 18</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FFBB28]" /> <span>18 to 64</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#8884d8]" /> <span>65 and over</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ageCard;
