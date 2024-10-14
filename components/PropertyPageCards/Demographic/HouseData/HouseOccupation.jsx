import { Icon } from "@iconify/react";
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
        "7. Sales and customer service occupations":
          "Sales & Customer Service",
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
  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];

  return (
    <>
      <div className="flex items-center p-2 sm:ml-4">
        <div className="flex items-center justify-center p-1 w-8 h-8 bg-blue-200 rounded-full mr-2">
          <Icon icon="tdesign:member" width={24} className="text-gray-700" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          House Occupation
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-4">
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100} // Outer radius for donut size
                innerRadius={80} // Inner radius for thin donut effect
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2">
          <ul className="flex flex-wrap justify-center lg:justify-start">
            {chartData.map((entry, index) => (
              <li
                key={`legend-item-${index}`}
                className="flex items-center m-2"
              >
                <span
                  className="inline-block w-3 h-3 mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm text-gray-700">{entry.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default HouseOccupation;
