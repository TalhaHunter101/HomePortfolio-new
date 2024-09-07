"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { StatusCard } from "./PlanningComponents/Status";
import Carousel from "./PlanningComponents/GraphCarousal";
import { ConstraintsList } from "./PlanningComponents/ConstraintList";
import FloatingCard from "./PlanningComponents/FloatingCard";
import { PlanningApplicationMapStatic } from "../Maps";

// Function to count statuses by matching multiple decision values
const countStatus = (data, decisions) => {
  return data.filter((item) => decisions.includes(item?._source?.other_fields?.decision)).length;
};

export function PlanningCard({ postcode }) {
  const [planningData, setPlanningData] = useState([]);

  // Define the status categories and their corresponding decision values
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

  return (
    <Card className="m-4" style={{ minHeight: "200px" }}>
      <CardHeader></CardHeader>

      {planningData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <CardBody>
          <div className="flex flex-col border border-subtle-border rounded-md">
            {/* Status Cards */}
            <div className="flex p-2 justify-between ">
              {statusData.map((status, index) => (
                <StatusCard
                  key={index}
                  label={status.label}
                  count={status.count}
                  iconColor={status.iconColor}
                  icon={status.icon}
                />
              ))}
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
