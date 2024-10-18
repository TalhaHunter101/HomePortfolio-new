"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import Carousel from "./CrimeComponents/GraphCarousal";
import { Icon } from "@iconify/react";

export function CrimeCard({ postcode }) {
  const [crimeData, setCrimeData] = useState([]);

  const getCrimeData = async (postcode) => {
    try {
      const response = await fetch("/api/indevisual/get-crime-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postcode }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      setCrimeData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (postcode){
      getCrimeData(postcode);
    }
  }, [postcode]);

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="game-icons:crime-scene-tape"
              width={16} // Adjust the icon size to fit well within the circle
              className="text-purple-700" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            Crime Rates in this area?
          </h2>
        </div>
      </CardHeader>

      {crimeData.length === 0 ? (
        <CardBody className="flex flex-col items-center justify-center">
          <Image
            src="/undraw_no_data_re_kwbl (1).svg"
            alt="No data found"
            className="w-40 h-40 mb-4"
          />
          <div className="text-gray-500 text-lg">No data available</div>
        </CardBody>
      ) : (
        <CardBody>
          <CrimeReportCard reportData={crimeData} />
        </CardBody>
      )}
    </Card>
  );
}

export const CrimeReportCard = ({ reportData }) => {
  const totalCrimes = reportData.length;

  // Calculate the crime data dynamically
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
  }, reportData[0]._source.Month);

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
    <div className="flex flex-col lg:flex-row w-full justify-between">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full p-6 bg-white rounded-lg flex flex-col justify-center mb-6 lg:mb-0">
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

      {/* Right Section */}
      <div className="lg:w-1/2 w-full bg-white rounded-lg">
        <Carousel data={reportData} />
      </div>
    </div>
  );
};
