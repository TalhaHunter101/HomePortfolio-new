import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

export const FamilyCustomBarChart = ({ data }) => {  
  const COLORS = ["#1A2B41", "#5AB2F6", "#A3D4FF", "#5AA9F6", "#FFBB28"];

  if (!data || data.length === 0) {
    return <div>No data available</div>; // Improved feedback
  }

  return (
    <div className="w-full mb-10 flex justify-center items-center">
      <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Tooltip />
    <Legend />
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={80} // Adjust this value to control the size of the donut hole
      outerRadius={100} // Adjust this value to control the overall size
      fill="#8884d8"
    >
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>

    </div>
  );
};
