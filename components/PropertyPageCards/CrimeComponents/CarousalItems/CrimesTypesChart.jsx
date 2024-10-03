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
  const data = Object.keys(crimeCounts).map((crimeType) => ({
    name: crimeType,
    value: crimeCounts[crimeType],
  }));

  return (
    <div className="w-full h-350 bg-white rounded-lg ">
      <h3 className="mb-5 font-bold text-lg">Crime Types</h3>
      <ResponsiveContainer className={'text-[10px]'} width="100%" height={300}>
        <BarChart
          data={data}
          layout="horizontal" // Changed to horizontal layout
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Added space at the bottom
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="category" 
            dataKey="name" 
            interval={0} // Show all labels
            angle={-45} // Tilt labels for better readability
            textAnchor="end" // Align text at the end of the tick
            height={60} // Increase the height to accommodate tilted labels
          />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="value" fill="#4DD0E1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrimeTypesChart;
