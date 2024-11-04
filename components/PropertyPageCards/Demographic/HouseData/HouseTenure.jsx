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

function HouseTenure({ tenureData, city }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (tenureData && tenureData._source) {
      const sourceData = tenureData._source;

      const validTensor = {
        "Owns outright": "Owned outright",
        "Owns with a mortgage or loan": "Owned (mortgage)",
        "Shared ownership": "Shared Ownership",
        "Social rented": "Rented (social landlord)",
        "Rents from council": "Rented (council)",
        "Private rented": "Rented (private landlord)",
        "Lives rent free": "Rent-Free",
      };

      let ownedCount = 0;
      let rentedPrivateCount = 0;
      let rentedSocialCount = 0;

      for (let key in sourceData) {
        if (key.startsWith("Tenure of household:")) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace("Tenure of household:", "").trim();
            for (let validKey in validTensor) {
              if (label.toLowerCase().includes(validKey.toLowerCase())) {
                const mappedLabel = validTensor[validKey];
                if (mappedLabel.includes("Owned")) {
                  ownedCount += count;
                } else if (mappedLabel.includes("Rented (private landlord)")) {
                  rentedPrivateCount += count;
                } else if (mappedLabel.includes("Rented (social landlord)") || mappedLabel.includes("Rented (council)")) {
                  rentedSocialCount += count;
                }
                break;
              }
            }
          }
        }
      }

      // Set the chart data with separate "Owned", "Rented (Private)", and "Rented (Social)"
      setChartData([
        { name: "Owned", count: ownedCount },
        { name: "Rented (Private)", count: rentedPrivateCount },
        { name: "Rented (Social)", count: rentedSocialCount },
      ]);
    }
  }, [tenureData]);

  const COLORS = ["#1A2B41", "#5AB2F6", "#FF7043"];

  return (
    <>
      <div className="flex items-center p-2 ml-4">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full mr-2">
          <Icon
            icon="fluent:person-key-20-filled"
            width={24}
            className="text-gray-700"
          />
        </div>

        <p className="text-xl font-semibold text-gray-700">House Tenure</p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100} // Outer radius for donut size
              innerRadius={80} // Inner radius for donut (adjust to make it thinner or thicker)
              fill="#8884d8"
              label
              startAngle={360}
              endAngle={0}
              style={{
                filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))",
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={1} // Adds a white border between segments
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default HouseTenure;
