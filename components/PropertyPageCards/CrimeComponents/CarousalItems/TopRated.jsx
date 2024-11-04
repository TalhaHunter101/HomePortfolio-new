import React from "react";
import { Card, Chip, Text } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export const CrimeReportCard = ({ reportData }) => {
  // Calculate total crimes in the last 12 months
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

  // Find the latest month in the data
  const latestMonth = reportData.reduce((latest, report) => {
    const currentMonth = report._source.Month;
    return new Date(currentMonth) > new Date(latest) ? currentMonth : latest;
  }, reportData[0]?._source?.Month);

  // Format the latest month as "MMM YYYY"
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month] = latestMonth.split("-");
  const formattedLatestMonth = `${monthNames[parseInt(month) - 1]} ${year}`;

  return (
    <div className="flex w-full justify-between">
      {/* Left Section */}
      {/* <div className="w-1/2 p-6 bg-white rounded-lg  flex flex-col">
        <Chip className="bg-yellow-200 rounded-full mb-5  px-3 py-1 inline-block mb-2">
          <span className="text-sm font-medium pb-5 text-gray-700">
            Average crime
          </span>
        </Chip>

        {/* Dynamically updated total crime count */}
        {/* <div className="text-4xl pt-4 font-bold text-gray-800 mb-2">
          {totalCrimes.toLocaleString()} reported crimes
        </div>
        <p className="text-sm mb-8 text-gray-500 mb-4">
          in this area in the last 12 months.
        </p> */}
        {/* <p className="text-sm mt-5 text-gray-600">
          If an area has an average crime rating, it means that for every 1,000
          inhabitants, between 140 and 225 residents have been affected by a
          crime.
        </p>
      </div> */}

      {/* Right Section (Crimes List) */}
      <div className="w-full p-6 bg-white rounded-lg ">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-800 mb-1">
            Top Reported Crimes
          </p>
          <p className="text-sm text-gray-500">
            Crime for latest month ({formattedLatestMonth})
          </p>
        </div>

        {/* Scrollable crimes list */}
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
          {crimeData.map((crime, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div className="flex items-center">
                <p className="text-base font-medium text-gray-700">
                  {crime.type}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base font-semibold text-gray-800">
                  {crime.count}
                </p>
                {crime.trend === "up" ? (
                  <Icon icon="mdi:arrow-up-bold" color="red" className="ml-2" />
                ) : crime.trend === "down" ? (
                  <Icon
                    icon="mdi:arrow-down-bold"
                    color="green"
                    className="ml-2"
                  />
                ) : (
                  <Icon icon="mdi:minus" color="grey" className="ml-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          {/* Placeholder for any further actions */}
        </div>
      </div>
    </div>
  );
};
