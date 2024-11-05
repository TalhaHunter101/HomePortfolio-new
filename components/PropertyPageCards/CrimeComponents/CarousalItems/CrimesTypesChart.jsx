import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export const CrimeTypesChart = ({ reportData }) => {
  // Use media query to detect if the screen width is small
  const isSmallScreen = useMediaQuery("(max-width: 640px)"); // Tailwind's 'sm' breakpoint is 640px

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
      <p className="mb-5 font-bold text-lg">Crime Types</p>
      <ResponsiveContainer className="text-[10px]" width="100%" height={300}>
        <BarChart
          data={data}
          layout={isSmallScreen ? "vertical" : "horizontal"}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type={isSmallScreen ? "number" : "category"}
            dataKey={isSmallScreen ? "value" : "name"}
            interval={0}
            angle={isSmallScreen ? 0 : -45}
            textAnchor="end"
            height={isSmallScreen ? undefined : 60}
          />
          <YAxis
            type={isSmallScreen ? "category" : "number"}
            dataKey={isSmallScreen ? "name" : undefined}
          />
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
          <Bar dataKey="value" fill="#33b5b5" barSize={100}>
            <LabelList dataKey="value" position={isSmallScreen ? "right" : "top"} fontSize={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrimeTypesChart;
