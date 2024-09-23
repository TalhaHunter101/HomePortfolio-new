import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

function HouseOccupation({ occupationData, city }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (occupationData && occupationData._source) {
      const sourceData = occupationData._source;

      // Mapping to simplify occupation labels
      const occupationMapping = {
        "1. Managers, directors and senior officials": "Managers & Directors",
        "2. Professional occupations": "Professionals",
        "3. Associate professional and technical occupations":
          "Associate Professionals",
        "4. Administrative and secretarial occupations":
          "Administrative & Secretarial",
        "5. Skilled trades occupations": "Skilled Trades",
        "6. Caring, leisure and other service occupations": "Caring & Service",
        "7. Sales and customer service occupations": "Sales & Customer Service",
        "8. Process, plant and machine operatives":
          "Process & Machine Operatives",
        "9. Elementary occupations": "Elementary Occupations",
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith("Occupation (current):") && !key.includes("Total")) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace("Occupation (current):", "").trim();
            const mappedLabel = occupationMapping[label] || label;

            data.push({ name: mappedLabel, count });
          }
        }
      }

      setChartData(data);
    }
  }, [occupationData]);

  // Pastel colors for pie chart
  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"]

  return (
    <>
      <div className="flex items-center p-2">
        <Icon icon="tdesign:member" width={24} className="text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold text-gray-700">
          House Occupation
        </h2>
      </div>
      {/* <div className="flex flex-col lg:flex-row justify-between gap-8 p-2">
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Who lives in {city}?</h3>
          <p className="text-gray-600 mb-2">
            The population of {city} is
            <span className="font-semibold">2,902</span> with{" "}
            <span className="font-semibold">48%</span> males and{" "}
            <span className="font-semibold">52%</span> females, and a median age
            of <span className="font-semibold">38</span>.
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">55%</span> of this neighborhood is
            occupied by families with <span className="font-semibold">27%</span>{" "}
            single families, <span className="font-semibold">22%</span>{" "}
            one-person household, and <span className="font-semibold">51%</span>{" "}
            couple families with kids. The average household size in Allandale
            is <span className="font-semibold">2.22</span>, and the average
            family size is <span className="font-semibold">3.04</span>.
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">56%</span> of residents in this
            neighborhood have a college degree.
          </p>
        </div>

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
      </div> */}
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
                marginLeft: 10,
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default HouseOccupation;
