import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { userNewNeighbourhoodData } from '@/store/neighbourhoodStore';

const COLORS = ['#33b5b5', '#ed8b69']; // Colors for the sex pie chart
const BAR_COLOR = '#33b5b5'; // Color for the bar chart

function DemographicSexRaceCard() {
  const { newNeighbourhoodData, isLoading } = userNewNeighbourhoodData();

  // Prepare data for charts
  const { sexData, raceEthnicityData } = useMemo(() => {
    if (!newNeighbourhoodData) {
      return {
        sexData: [],
        raceEthnicityData: [],
      };
    }

    const data = newNeighbourhoodData;

    const totalPopulation = parseFloat(data['Sex: All persons; measures: Value']);
    const totalRaceEthnicity = parseFloat(data['race_ethnicity_total']);

    // Data for Sex Pie Chart
    const sexData = [
      {
        name: 'Male',
        value: parseFloat(
          (
            ((data['Sex: Male; measures: Value'] || 0) / totalPopulation) *
            100
          ).toFixed(2)
        ),
      },
      {
        name: 'Female',
        value: parseFloat(
          (
            ((data['Sex: Female; measures: Value'] || 0) / totalPopulation) *
            100
          ).toFixed(2)
        ),
      },
    ];

    // Data for Race & Ethnicity Bar Chart
    const raceEthnicityData = [
      {
        name: 'White',
        value: parseFloat(
          (((data['race_ethnicity_white'] || 0) / totalRaceEthnicity) * 100).toFixed(2)
        ),
      },
      {
        name: 'Black',
        value: parseFloat(
          (((data['race_ethnicity_black'] || 0) / totalRaceEthnicity) * 100).toFixed(2)
        ),
      },
      {
        name: 'Asian',
        value: parseFloat(
          (((data['race_ethnicity_asian'] || 0) / totalRaceEthnicity) * 100).toFixed(2)
        ),
      },
      {
        name: 'Others',
        value: parseFloat(
          (((data['race_ethnicity_other'] || 0) / totalRaceEthnicity) * 100).toFixed(2)
        ),
      },
      {
        name: 'Two+',
        value: parseFloat(
          (
            ((data['race_ethnicity_two_or_more'] || 0) / totalRaceEthnicity) *
            100
          ).toFixed(2)
        ),
      },
    ];

    return { sexData, raceEthnicityData };
  }, [newNeighbourhoodData]);

  // Custom Tooltip for Bar Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const percentage = payload[0].value;
      const raceEthnicity = label;
      return (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '8px',
            border: '1px solid #ccc',
          }}
        >
          <p>{`${raceEthnicity}: ${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <CardHeader className="flex flex-col items-start p-4">
        <div>
          <h2 className="text-xl font-bold">Demographics</h2>
        </div>
      </CardHeader>
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Sex Pie Chart */}
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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

        {/* Race & Ethnicity Bar Chart */}
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Race & Ethnicity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={raceEthnicityData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis className='font-bold' dataKey="name" />
              <YAxis hide /> {/* Y-axis is hidden */}
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="value"
                fill={BAR_COLOR}
                barSize={100}
                label={{
                  position: 'top',
                  formatter: (value) => `${value}%`,
                  fill: '#000',
                  dy: -10, // Adjusts the vertical position of the label
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default DemographicSexRaceCard;
