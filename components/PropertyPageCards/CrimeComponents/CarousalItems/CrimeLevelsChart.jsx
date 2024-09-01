import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const CrimeLevelsChart = ({ reportData }) => {
  // Step 1: Process the reportData to calculate the counts of crimes per month
  const crimeCountsByMonth = reportData.reduce((acc, report) => {
    const month = report._source.Month; // Assuming Month is in 'YYYY-MM' format
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += 1;
    return acc;
  }, {});

  // Step 2: Convert the crimeCountsByMonth object to an array suitable for the chart
  const data = Object.keys(crimeCountsByMonth)
    .sort() // Sort by month
    .map(month => {
      // Convert the month from 'YYYY-MM' to 'MMM YYYY' format
      const [year, monthNum] = month.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedMonth = `${monthNames[parseInt(monthNum) - 1]} ${year}`;
      
      return {
        month: formattedMonth,
        value: crimeCountsByMonth[month],
      };
    });

  return (
    <div className="w-full h-350 bg-white rounded-lg">
      <h3 className="mb-5 font-bold text-lg">Crimes levels overview</h3>
      <p className="mb-5 text-sm">Crime for last year (per month)</p>
      <ResponsiveContainer className={"text-xs"} width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4DD0E1"
            strokeWidth={2}
            dot={{ r: 5, fill: "#ffffff", stroke: "#4DD0E1", strokeWidth: 2 }}
            fillOpacity={0.2}
            fill="#4DD0E1"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrimeLevelsChart;
