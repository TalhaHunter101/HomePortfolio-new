"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
// import { StatusCard } from "./CrimeComponents/Status";
import Carousel from "./CrimeComponents/GraphCarousal";
import { Icon } from "@iconify/react";

const statusData = [
  { label: "Approved", count: 27, iconColor: "bg-green-500" },
  { label: "In progress", count: 27, iconColor: "bg-blue-500" },
  { label: "Pending", count: 27, iconColor: "bg-orange-500" },
  { label: "Rejected", count: 27, iconColor: "bg-red-500" },
  { label: "Withdrawn", count: 27, iconColor: "bg-gray-500" },
];
const dummyData = [
  { leftContent: "Left Content 1", rightContent: "Right Content 1" },
  { leftContent: "Left Content 2", rightContent: "Right Content 2" },
  { leftContent: "Left Content 3", rightContent: "Right Content 3" },
];
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
    if (postcode) getCrimeData(postcode);
  }, [postcode]);

  return (
    <Card className="m-4" style={{ minHeight: "200px" }}>
      <CardHeader>
      <div className="flex items-center my-2">
    <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
      <Icon
        icon="game-icons:crime-scene-tape"
        width={16} // Adjust the icon size to fit well within the circle
        className="text-purple-700" // Adjust the icon color if needed
      />
    </div>
    <h2 className="text-xl font-bold text-gray-700">Crime Rates in this area?</h2>
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
          <div className="flex flex-col  rounded-md">
            {/* Status Cards */}
            {/* <div className="flex p-2  justify-between ">
              {statusData.map((status, index) => (
                <StatusCard
                  key={index}
                  label={status.label}
                  count={status.count}
                  iconColor={status.iconColor}
                />
              ))}
            </div> */}

            {/* Additional Content */}
            <div className="">
              <Carousel data={crimeData} />
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}
