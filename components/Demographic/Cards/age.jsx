'use client';
import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNeighbourhoodDemographicStore } from '@/store/neighbourhoodStore';

const COLORS = ['#82ca9d', '#fda4af', '#8884d8'];

function AgeCard() {
  const { populationAgeData } = useNeighbourhoodDemographicStore();
  
  const { ageRangeData, ageCategoryData, medianAge } = useMemo(() => {
    if (!populationAgeData || populationAgeData.length === 0) {
      return {
        ageRangeData: [],
        ageCategoryData: [],
        medianAge: 0,
      };
    }

    const data = populationAgeData[0]._source; // Assuming one data entry for now
    const ageRangeData = [
      { name: '0-9', value: (data["Aged 4 years and under"] || 0) + (data["Aged 5 to 9 years"] || 0) },
      { name: '10-19', value: (data["Aged 10 to 14 years"] || 0) + (data["Aged 15 to 19 years"] || 0) },
      { name: '20-29', value: (data["Aged 20 to 24 years"] || 0) + (data["Aged 25 to 29 years"] || 0) },
      { name: '30-39', value: (data["Aged 30 to 34 years"] || 0) + (data["Aged 35 to 39 years"] || 0) },
      { name: '40-49', value: (data["Aged 40 to 44 years"] || 0) + (data["Aged 45 to 49 years"] || 0) },
      { name: '50-59', value: (data["Aged 50 to 54 years"] || 0) + (data["Aged 55 to 59 years"] || 0) },
      { name: '60-69', value: (data["Aged 60 to 64 years"] || 0) + (data["Aged 65 to 69 years"] || 0) },
      { name: '70-79', value: (data["Aged 70 to 74 years"] || 0) + (data["Aged 75 to 79 years"] || 0) },
      { name: '80+', value: (data["Aged 80 to 84 years"] || 0) + (data["Aged 85 years and over"] || 0) },
    ];

    const ageCategoryData = [
      { name: 'Under 18', value: ageRangeData.slice(0, 2).reduce((sum, age) => sum + age.value, 0) },
      { name: '18 to 64', value: ageRangeData.slice(2, 7).reduce((sum, age) => sum + age.value, 0) },
      { name: '65 and over', value: ageRangeData.slice(7).reduce((sum, age) => sum + age.value, 0) },
    ];

    const medianAge = data["Median Age"] || 0;

    return { ageRangeData, ageCategoryData, medianAge };
  }, [populationAgeData]);

  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-col items-start p-4">
        <div>
          <h2 className="text-xl font-bold">Age</h2>
          <p className="text-4xl font-semibold mt-2">{medianAge}</p>
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

export default AgeCard;
