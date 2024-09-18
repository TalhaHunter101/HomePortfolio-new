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

  return (
    <Card style={{ width: '100%', height: 800 }}>
      <div className="bg-white p-6 rounded-lg w-full">
        <div className="flex items-center mb-4">
          <Icon
            icon="mdi:account-group"
            width={24}
            className="text-gray-700 mr-2"
          />
          <h2 className="text-xl font-semibold text-gray-700">House Type</h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left section */}
          <div className="lg:w-2/3">
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
          <div className="lg:w-1/3 flex flex-col gap-4">
            <div className="flex justify-between text-gray-700">
              <span>Total Population</span>
              <span className="font-semibold text-xl">23k</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Median Age</span>
              <span className="font-semibold text-xl">38</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Average HH Income</span>
              <span className="font-semibold text-xl">£88,189</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Single Family Household</span>
              <span className="font-semibold text-xl">26%</span>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer>
        <BarChart
          layout="horizontal"
          data={chartData}
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis type="number" allowDecimals={false} />
          <XAxis dataKey="name" type="category" interval={0} width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default HouseTypeData;
