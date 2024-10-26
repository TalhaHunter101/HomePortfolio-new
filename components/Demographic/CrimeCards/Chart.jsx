import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy data for testing
// const dummyReportData = [
//   { _source: { Month: "2023-01" } },
//   { _source: { Month: "2023-01" } },
//   { _source: { Month: "2023-02" } },
//   { _source: { Month: "2023-02" } },
//   { _source: { Month: "2023-02" } },
//   { _source: { Month: "2023-03" } },
//   { _source: { Month: "2023-04" } },
//   { _source: { Month: "2023-05" } },
//   { _source: { Month: "2023-06" } },
//   { _source: { Month: "2023-07" } },
//   { _source: { Month: "2023-08" } },
//   { _source: { Month: "2023-09" } },
//   { _source: { Month: "2023-10" } },
// ];

// Process the dummyReportData to calculate monthly crime counts
// const crimeCountsByMonth = dummyReportData.reduce((acc, report) => {
//   const month = report._source.Month; // Assuming Month is in 'YYYY-MM' format
//   if (!acc[month]) {
//     acc[month] = 0;
//   }
//   acc[month] += 1;
//   return acc;
// }, {});

// Convert the processed data to an array for the chart
// const chartData = Object.keys(crimeCountsByMonth)
//   .sort() // Sort by month
//   .map((month) => {
//     // Convert the month from 'YYYY-MM' to 'MMM YYYY' format
//     const [year, monthNum] = month.split("-");
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const formattedMonth = `${monthNames[parseInt(monthNum) - 1]} ${year}`;

//     return {
//       month: formattedMonth,
//       value: crimeCountsByMonth[month],
//     };
//   });

export default function CrimeLevelsChartCard( { reportData }) {
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
    <Card className="m-4 p-0 overflow-hidden">
      <CardHeader className="pb-0">
        <h3 className="font-bold text-lg">Crime Levels Overview</h3>
      </CardHeader>
      <CardBody>
        <p className="text-sm mb-5 text-gray-500">
          Crime for the past year (monthly report)
        </p>
        <div className="w-full h-80 bg-white rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
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
      </CardBody>
    </Card>
  );
}
