"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { StatusCard } from "./PlanningComponents/Status";
import Carousel from "./PlanningComponents/GraphCarousal";

import { ConstraintsList } from "./PlanningComponents/ConstraintList";
import FloatingCard from "./PlanningComponents/FloatingCard";
import { PlanningApplicationMapStatic } from "../Maps";

const countStatus = (data, status) => {
  return data.filter((item) => item.app_state === status).length;
};

const dummyData = [
  { leftContent: "Left Content 1", rightContent: "Right Content 1" },
  { leftContent: "Left Content 2", rightContent: "Right Content 2" },
  { leftContent: "Left Content 3", rightContent: "Right Content 3" },
];
export function PlanningCard({ postcode }) {
  const [planningData, setPlanningData] = useState([]);

  const statusData = [
    {
      label: "Approved",
      count: countStatus(planningData, "Permitted"),
      iconColor: "text-green-500",
      icon: "mdi:check-circle",
    },
    {
      label: "In progress",
      count: countStatus(planningData, "In Progress"),
      iconColor: "text-blue-500",
      icon: "mdi:progress-clock",
    },
    {
      label: "Pending",
      count: countStatus(planningData, "Pending"),
      iconColor: "text-orange-500",
      icon: "mdi:clock-outline",
    },
    {
      label: "Rejected",
      count: countStatus(planningData, "Rejected"),
      iconColor: "text-red-500",
      icon: "mdi:close-circle",
    },
    {
      label: "Withdrawn",
      count: countStatus(planningData, "Withdrawn"),
      iconColor: "text-gray-500",
      icon: "mdi:minus-circle",
    },
  ];

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
            <div className="flex p-2  justify-between ">
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
              <Carousel data={dummyData} />
            </div>
            <div className="z-10 w-full  overflow-hidden rounded-br-lg rounded-bl-lg">
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