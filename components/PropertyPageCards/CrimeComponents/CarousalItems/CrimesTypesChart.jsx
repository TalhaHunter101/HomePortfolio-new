import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const CrimeTypesChart = ({ reportData }) => {
  // Process the reportData to calculate the counts of each crime type
  const crimeCounts = reportData.reduce((acc, report) => {
    const crimeType = report._source["Crime type"];
    if (!acc[crimeType]) {
      acc[crimeType] = 0;
    }
    acc[crimeType] += 1;
    return acc;
  }, {});

  // Convert the crimeCounts object to an array suitable for the chart
  const data = Object.keys(crimeCounts).map(crimeType => ({
    name: crimeType,
    value: crimeCounts[crimeType],
  }));

  return (
    <div className="w-full h-350 bg-white rounded-lg">
      <h3 className="mb-5 font-bold text-lg">Crime Types</h3>
      <ResponsiveContainer className={"text-xs"} width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" fill="#4DD0E1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrimeTypesChart;