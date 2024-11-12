import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AgentPie({ data }) {
  const [bedroomData, setBedroomData] = useState([]);
  const [postcodeData, setPostcodeData] = useState([]);

  useEffect(() => {
    if (data && data.statistics) {
      // Convert listingsByBedrooms to array format
      const formattedBedroomData = Object.entries(
        data.statistics.listingsByBedrooms
      ).map(([key, value]) => ({
        name: `${key} bed`,
        value,
      }));
      setBedroomData(formattedBedroomData);

      // Convert listingsByPostcode to array format
      const formattedPostcodeData = Object.entries(
        data.statistics.listingsByPostcode
      ).map(([key, value]) => ({
        name: key,
        value,
      }));
      setPostcodeData(formattedPostcodeData);
    }
  }, [data]);

  const colors = ["#93c5fd", "#60a5fa", "#2563eb", "#1d4ed8", "#1e40af"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
      {/* Pie Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Listings by number of bedrooms
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              innerRadius={50}
              outerRadius={90}
              data={bedroomData}
              dataKey="value"
              nameKey="name"
              cx="60%"
              cy="50%"
              fill="#2563eb"
              label
            >
              {bedroomData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="left"
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ left: -10 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Listings by postcode
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              data={postcodeData}
              dataKey="value"
              nameKey="name"
              fill="#2563eb"
              label
            >
              {postcodeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="left"
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ left: -10 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AgentPie;
