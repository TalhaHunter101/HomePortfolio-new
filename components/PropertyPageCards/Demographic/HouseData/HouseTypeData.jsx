import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  CartesianGrid,
} from "recharts";

function HouseTypeData({ housingData, city }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (housingData && housingData._source) {
      const sourceData = housingData._source;

      const validValues = {
        Detached: "Detached",
        "Semi-detached": "Semi-detached",
        Terraced: "Terraced",
        "flats or tenement": "Flats or Tenement",
        warehouse: "Warehouse",
        mobile: "Mobile Home",
      };

      const data = [];

      for (let key in sourceData) {
        if (key.startsWith("Accommodation type:")) {
          const count = parseInt(sourceData[key]);
          if (!isNaN(count) && count > 0) {
            const label = key.replace("Accommodation type:", "").trim();
            let mappedLabel = null;

            for (let validKey in validValues) {
              if (label.toLowerCase().includes(validKey.toLowerCase())) {
                mappedLabel = validValues[validKey];
                break;
              }
            }

            if (mappedLabel) {
              data.push({ name: mappedLabel, count });
            }
          }
        }
      }

      setChartData(data);
    }
  }, [housingData]);

  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];

  const CustomLegend = () => {
    return (
      <div className="custom-legend">
        {chartData.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="legend-item flex items-center mb-2"
          >
            <span
              className="legend-color mr-2"
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: "50%",
              }}
            />
            <span className="text-gray-700 text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      <div className="flex items-center p-2 ml-5">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full mr-2">
          <Icon icon="fa6-solid:house-flag" width={24} className="text-gray-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700">House Type</h2>
      </div>

      <div className="flex w-full h-96 mt-8 justify-center">
        {/* Pie Chart (Donut Chart) Section */}
        <div className="chart-container w-3/4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100} // Outer radius for donut size
                innerRadius={80}  // Inner radius for donut hole (adjust for thinner donut)
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default HouseTypeData;
