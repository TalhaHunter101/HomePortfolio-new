import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useNeighbourhoodDemographicStore } from '@/store/neighbourhoodStore';

const COLORS = ['#33b5b5', '#ed8b69']; // Colors for the sex pie chart
const BAR_COLOR = '#82ca9d'; // Color for the bar chart

function DemographicSexRaceCard() {
  const { ethnicGroupData, populationData } = useNeighbourhoodDemographicStore();
 
  // Prepare data for charts
  const { sexData, raceEthnicityData } = useMemo(() => {
    if (!ethnicGroupData || ethnicGroupData.length === 0 || !populationData || populationData.length === 0) {
      return {
        sexData: [],
        raceEthnicityData: [],
      };
    }

    const ethnicData = ethnicGroupData[0]._source; // Assuming one data entry for ethnic group data
    const popData = populationData[0]._source; // Assuming one data entry for population data

    const totalPopulation = popData["Total Population"];
    const totalRaceEthnicity = ethnicData["Total Race Ethnicity"];

    // Data for Sex Pie Chart
    const sexData = [
      { name: 'Male', value: parseFloat(((popData["Male"] || 0) / totalPopulation * 100).toFixed(2)) },
      { name: 'Female', value: parseFloat(((popData["Female"] || 0) / totalPopulation * 100).toFixed(2)) },
    ];

    // Data for Race & Ethnicity Bar Chart
    const raceEthnicityData = [
      { name: 'White', value: parseFloat(((ethnicData["White"] || 0) / totalRaceEthnicity * 100).toFixed(2)) },
      { name: 'Black', value: parseFloat(((ethnicData["Black"] || 0) / totalRaceEthnicity * 100).toFixed(2)) },
      { name: 'Asian', value: parseFloat(((ethnicData["Asian"] || 0) / totalRaceEthnicity * 100).toFixed(2)) },
      { name: 'Others', value: parseFloat(((ethnicData["Others"] || 0) / totalRaceEthnicity * 100).toFixed(2)) },
      { name: 'Two+', value: parseFloat(((ethnicData["Two or more"] || 0) / totalRaceEthnicity * 100).toFixed(2)) },
    ];

    return { sexData, raceEthnicityData };
  }, [ethnicGroupData, populationData]);

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
              <div className="w-3 h-3 bg-[#33b5b5]" /> <span>Male</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#ed8b69]" /> <span>Female</span>
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
              <Bar dataKey="value" fill="#33b5b5" barSize={100} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default DemographicSexRaceCard;

