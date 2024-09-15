import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const FamilyCustomPieChart = ({ data }) => {
  // State to track whether the pie chart is hovered
  const [isHovered, setIsHovered] = useState(false);

  if (!data || data.length === 0) {
    return null; // Display nothing or a loading indicator if data is empty
  }

  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const labelThreshold = 5; // Minimum percentage to display label

    if (percent * 100 < labelThreshold) {
      return null;
    }

    const radius = outerRadius * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm"
        style={{
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div
      className="w-full mb-10 flex justify-center items-center"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="2"
                dy="4"
                stdDeviation="5"
                floodColor="#000"
                floodOpacity="0.3"
              />
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
            stroke="none"
            style={{ filter: "url(#shadow)" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          {/* Conditionally render the Legend component based on hover state */}
          {/* {isHovered && (
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              payload={data.map((item, index) => ({
                value: item.name,
                type: "square",
                id: item.name,
                color: COLORS[index % COLORS.length],
              }))}
            />
          )} */}
          {/* Optionally include Tooltip for slice hover */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
