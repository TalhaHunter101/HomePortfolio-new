import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const CrimeReportCard = ({ reportData }) => {
  const totalCrimes = reportData.length;

  // Calculate the crime data dynamically (for the right section)
  const crimeDataMap = reportData.reduce((acc, report) => {
    const crimeType = report._source["Crime type"];
    if (!acc[crimeType]) {
      acc[crimeType] = { count: 0, trend: "stable" }; // Assuming stable as default trend
    }
    acc[crimeType].count += 1;
    return acc;
  }, {});

  const crimeData = Object.keys(crimeDataMap).map((crimeType) => ({
    type: crimeType,
    count: crimeDataMap[crimeType].count,
    trend: crimeDataMap[crimeType].trend, // This will need real data to set trend
  }));

  // Find the latest month in the data, with a fallback if reportData is empty or invalid
  const latestMonth = reportData.length > 0
    ? reportData.reduce((latest, report) => {
        const currentMonth = report._source?.Month;
        return currentMonth && new Date(currentMonth) > new Date(latest) ? currentMonth : latest;
      }, reportData[0]?._source?.Month)
    : null;

  // Format the latest month as "MMM YYYY" if latestMonth is valid
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  let formattedLatestMonth = "N/A"; // Default if no valid date found
  if (latestMonth) {
    const [year, month] = latestMonth.split("-");
    formattedLatestMonth = `${monthNames[parseInt(month) - 1]} ${year}`;
  }

  return (
    <Card className="m-4 p-4 h-full ">
      <CardBody className="h-full">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800 mb-1">
            Top Reported Crimes
          </h1>
          <h2 className="text-sm text-gray-500">
            Crime for latest month ({formattedLatestMonth})
          </h2>
        </div>

        {/* Scrollable crimes list */}
        <div className="space-y-3 max-h-64 h-64 overflow-y-auto mb-4">
          {crimeData.map((crime, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div className="flex items-center">
                <h3 className="text-base font-medium text-gray-700">
                  {crime.type}
                </h3>
              </div>
              <div className="flex items-center">
                <span className="text-base font-semibold text-gray-800">
                  {crime.count}
                </span>
                {crime.trend === "up" ? (
                  <Icon icon="mdi:arrow-up-bold" color="red" className="ml-2" />
                ) : crime.trend === "down" ? (
                  <Icon icon="mdi:arrow-down-bold" color="green" className="ml-2" />
                ) : (
                  <Icon icon="mdi:minus" color="grey" className="ml-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart to display crime data */}
        <div className="mt-6 text-xs">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={crimeData}
              layout="vertical" // Set layout to vertical for horizontal bars
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#33b5b5" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};

export default CrimeReportCard;
