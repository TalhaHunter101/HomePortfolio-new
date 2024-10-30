import React, { useMemo } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Rectangle,
} from "recharts";
import { userNewNeighbourhoodData } from "@/store/neighbourhoodStore";

const COLORS = ['#6295cc', '#ed8b69', '#33b5b5'];

function AgeCard() {
  const { newNeighbourhoodData, isLoading } = userNewNeighbourhoodData();

  const { ageRangeDataWithPercentages, ageCategoryDataWithPercentages, medianAge } = useMemo(() => {
    if (!newNeighbourhoodData) {
      return {
        ageRangeDataWithPercentages: [],
        ageCategoryDataWithPercentages: [],
        medianAge: 0,
      };
    }

    const data = newNeighbourhoodData;
    const ageRangeData = [
      { name: "0-9",   value: parseInt(data["Age: Aged 4 years and under"] || 0) + parseInt(data["Age: Aged 5 to 9 years"] || 0) },
      { name: "10-19", value: parseInt(data["Age: Aged 10 to 14 years"] || 0) + parseInt(data["Age: Aged 15 to 19 years"] || 0) },
      { name: "20-29", value: parseInt(data["Age: Aged 20 to 24 years"] || 0) + parseInt(data["Age: Aged 25 to 29 years"] || 0) },
      { name: "30-39", value: parseInt(data["Age: Aged 30 to 34 years"] || 0) + parseInt(data["Age: Aged 35 to 39 years"] || 0) },
      { name: "40-49", value: parseInt(data["Age: Aged 40 to 44 years"] || 0) + parseInt(data["Age: Aged 45 to 49 years"] || 0) },
      { name: "50-59", value: parseInt(data["Age: Aged 50 to 54 years"] || 0) + parseInt(data["Age: Aged 55 to 59 years"] || 0) },
      { name: "60-69", value: parseInt(data["Age: Aged 60 to 64 years"] || 0) + parseInt(data["Age: Aged 65 to 69 years"] || 0) },
      { name: "70-79", value: parseInt(data["Age: Aged 70 to 74 years"] || 0) + parseInt(data["Age: Aged 75 to 79 years"] || 0) },
      { name: "80+",   value: parseInt(data["Age: Aged 80 to 84 years"] || 0) + parseInt(data["Age: Aged 85 years and over"] || 0) },
    ];

    const totalPopulation = ageRangeData.reduce((sum, age) => sum + age.value, 0);

    const ageRangeDataWithPercentages = ageRangeData.map(age => ({
      ...age,
      percentage: parseFloat(((age.value / totalPopulation) * 100).toFixed(1)),
    }));

    const ageCategoryData = [
      { name: "Under 18",  value: ageRangeData.slice(0, 2).reduce((sum, age) => sum + age.value, 0) },
      { name: "18 to 64", value: ageRangeData.slice(2, 7).reduce((sum, age) => sum + age.value, 0) },
      { name: "65 and over", value: ageRangeData.slice(7).reduce((sum, age) => sum + age.value, 0) },
    ];

    const ageCategoryDataWithPercentages = ageCategoryData.map(age => ({
      ...age,
      percentage: parseFloat(((age.value / totalPopulation) * 100).toFixed(1)),
    }));

    const medianAge = data["median_age"] || 0;

    return { ageRangeDataWithPercentages, ageCategoryDataWithPercentages, medianAge };
  }, [newNeighbourhoodData]);

  // Log data for debugging
  console.log('Age Range Data with Percentages:', ageRangeDataWithPercentages);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc', cursor: 'pointer' }}>
          <p>{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomizedBar = (props) => {
    const { x, y, width, height } = props;
    return <Rectangle x={x} y={y} width={width} height={height} fill="#33b5b5" />;
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
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
      <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        <div className="lg:col-span-2">
          <h3 className="text-md font-bold mb-4">Population by age range</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageRangeDataWithPercentages} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <XAxis className="font-bold" dataKey="name" />
              <YAxis hide />
              <Bar
             
                dataKey="percentage"
                fill="#33b5b5"
                barSize={100}
                activeOpacity={1} 
                isAnimationActive={false}
                label={{ position: 'top', formatter: (value) => `${value}%`, fill: '#000', dy: -10 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-md font-bold mb-4">Population by age category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ageCategoryDataWithPercentages}
                dataKey="percentage"
                outerRadius={80}
                innerRadius={60}
                fill="#ed8b69"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {ageCategoryDataWithPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#6295cc]" /> <span>Under 18</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#ed8b69]" /> <span>18 to 64</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#33b5b5]" /> <span>65 and over</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default AgeCard;
//working