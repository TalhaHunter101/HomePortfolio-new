import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react"; 

export default function MainCard({ reportData }) {
  // const totalCrimes = reportData.length;

  // // Calculate the crime data dynamically (for the right section)
  // const crimeDataMap = reportData.reduce((acc, report) => {
  //   const crimeType = report._source["Crime type"];
  //   if (!acc[crimeType]) {
  //     acc[crimeType] = { count: 0, trend: "stable" }; // Assuming stable as default trend
  //   }
  //   acc[crimeType].count += 1;
  //   return acc;
  // }, {});

  // const crimeData = Object.keys(crimeDataMap).map((crimeType) => ({
  //   type: crimeType,
  //   count: crimeDataMap[crimeType].count,
  //   trend: crimeDataMap[crimeType].trend, // This will need real data to set trend
  // }));

  // // Find the latest month in the data
  // const latestMonth = reportData.reduce((latest, report) => {
  //   const currentMonth = report._source.Month;
  //   return new Date(currentMonth) > new Date(latest) ? currentMonth : latest;
  // }, reportData[0]?._source?.Month);
  const totalCrimes = reportData.length;
  
  return (
    <Card className="m-4 p-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left section - Crime overview */}
        <Chip className="bg-yellow-200 rounded-full mb-5 px-3 py-1 inline-block mb-2">
          <span className="text-sm font-medium pb-5 text-gray-700">
            Average crime
          </span>
        </Chip>
        <div className="text-4xl pt-4 font-bold text-gray-800 mb-2">
          {totalCrimes} reported crimes
        </div>
        <p className="text-sm mb-8 text-gray-500 mb-4">
          in this area in the last 12 months.
        </p>
        {/* <p className="text-sm mt-5 text-gray-600">
          If an area has an average crime rating, it means that for every 1,000
          inhabitants, between 140 and 225 residents have been affected by a
          crime.
        </p> */}
      </div>
    </Card>
  );
}
