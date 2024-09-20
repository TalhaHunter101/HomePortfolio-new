import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
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

  const COLORS = [
    "#6A0DAD", "#FFA07A", "#20B2AA", "#FF6347", "#FFD700",
    "#00BFFF", "#FF69B4", "#8A2BE2", "#32CD32"
  ];

  const CustomLegend = () => {
    return (
      <div className="custom-legend">
        {chartData.map((entry, index) => (
          <div key={`item-${index}`} className="legend-item flex items-center mb-2">
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
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <div className="bg-white p-6 rounded-lg w-full">
        <div className="flex items-center mb-4">
          <Icon
            icon="fa6-solid:house-flag"
            width={24}
            className="text-gray-700 mr-2"
          />
          <h2 className="text-xl font-semibold text-gray-700">House Type</h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left section */}
          <div className="lg:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Who lives in {city}?</h3>
            <p className="text-gray-600 mb-2">
              The population of {city} is
              <span className="font-semibold">2,902</span> with{" "}
              <span className="font-semibold">48%</span> males and{" "}
              <span className="font-semibold">52%</span> females, and a median
              age of <span className="font-semibold">38</span>.
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">55%</span> of this neighborhood is
              occupied by families with{" "}
              <span className="font-semibold">27%</span> single families,{" "}
              <span className="font-semibold">22%</span> one-person household,
              and <span className="font-semibold">51%</span> couple families
              with kids. The average household size in Allandale is{" "}
              <span className="font-semibold">2.22</span>, and the average
              family size is <span className="font-semibold">3.04</span>.
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">56%</span> of residents in this
              neighborhood have a college degree.
            </p>
          </div>

          {/* Right section */}
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
        </div>
      </div>

      <div className="flex w-full h-96 mt-8">
        {/* Custom Legend Section */}
        <div className="legend-container w-1/4 p-4 pt-16">
          <CustomLegend />
        </div>

        {/* Bar Chart Section */}
        <div className="chart-container w-3/4">
          <ResponsiveContainer>
            <BarChart
              layout="horizontal"
              data={chartData}
              margin={{ top: 25, right: 10, left: 10, bottom: 25 }}
              height={100}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis type="number" allowDecimals={false} />
              <XAxis dataKey="name" type="category" interval={0} width={100} />
              <Tooltip />
              <Legend content={<div />} /> {/* Empty legend to avoid default legend */}
              <Bar dataKey="count" fill="#8884d8" barSize={80}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default HouseTypeData;
