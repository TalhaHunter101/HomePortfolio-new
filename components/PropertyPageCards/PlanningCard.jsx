"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { StatusCard } from "./PlanningComponents/Status";
import Carousel from "./PlanningComponents/GraphCarousal";
import { ConstraintsList } from "./PlanningComponents/ConstraintList";
import FloatingCard from "./PlanningComponents/FloatingCard";
import { PlanningApplicationMapStatic } from "../Maps";
import { Icon } from "@iconify/react";
import PlanningApplicationsTable from "./PlanningComponents/PanningTable";

// Function to count statuses by matching multiple decision values
const countStatus = (data, decisions) => {
  return data.filter((item) =>
    decisions.includes(item?._source?.other_fields?.decision)
  ).length;
};

export function PlanningCard({ postcode }) {
  const [planningData, setPlanningData] = useState([]);
  const statusData = [
    {
      label: "Approved",
      count: countStatus(planningData, [
        "Application Permitted",
        "Grant",
        "Granted",
        "Approved",
        "Approve",
        "Approval",
        "Approve with Conditions",
      ]),
      iconColor: "text-green-500",
      icon: "mdi:check-circle",
    },
    {
      label: "Pending",
      count: countStatus(planningData, ["Undecided"]),
      iconColor: "text-blue-500",
      icon: "mdi:progress-clock",
    },
    {
      label: "Rejected",
      count: countStatus(planningData, ["Refuse", "Refused", "Rejected"]),
      iconColor: "text-red-500",
      icon: "mdi:close-circle",
    },
    {
      label: "Withdrawn",
      count: countStatus(planningData, ["Withdrawn"]),
      iconColor: "text-gray-500",
      icon: "mdi:minus-circle",
    },
  ];

  // Fetch planning data based on postcode
  const getPlanningData = async (postcode) => {
    try {
      const response = await fetch("/api/indevisual/get-planning-data", {
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
      setPlanningData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  // Effect to fetch data when postcode changes
  useEffect(() => {
    if (postcode) getPlanningData(postcode);
  }, [postcode]);


  console.log("planningData is",planningData);
  

  return (
    <Card className="m-4" style={{ minHeight: "200px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:planner"
              width={16} // Adjust the icon size to fit well within the circle
              className="text-purple-700" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            What are the Planning application in {postcode}?
          </h2>
        </div>
      </CardHeader>

      {planningData.length === 0 ? (
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
          <div className="flex flex-col border border-subtle-border rounded-md">
            {/* Status Cards */}
            <div className="flex p-2 justify-between ">
              {/* {statusData.map((status, index) => (
                <StatusCard
                  key={index}
                  label={status.label}
                  count={status.count}
                  iconColor={status.iconColor}
                  icon={status.icon}
                />
              ))} */}

              <PlanningApplicationsTable planningData={planningData} />
            </div>
            <div className="">
              <Carousel data={planningData} />
            </div>
            <div className="z-10 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
              <div className="hidden xl:flex h-96">
                <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                  <div className="flex-1 z-40 h-full">
                    <div className="h-full w-full">
                      <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                        <PlanningApplicationMapStatic
                          center={
                            planningData.length > 0
                              ? planningData.map((data) => ({
                                  lat: data?._source?.location_y,
                                  lng: data?._source?.location_x,
                                }))
                              : []
                          }
                        />
                        <div className="absolute top-4 gap-2 right-4 z-[1000]">
                          <FloatingCard data={planningData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}
