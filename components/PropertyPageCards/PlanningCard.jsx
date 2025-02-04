"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { StatusCard } from "./PlanningComponents/Status";
import Carousel from "./PlanningComponents/GraphCarousal";
import { ConstraintsList } from "./PlanningComponents/ConstraintList";
import FloatingCard from "./PlanningComponents/FloatingCard";
import { PlanningApplicationMapStatic } from "../Maps";
import { Icon } from "@iconify/react";
import PlanningApplicationsTable from "./PlanningComponents/PanningTable";
import TimeFrameDropdown from "./PlanningComponents/Dropdown";

// Function to count statuses by matching multiple decision values
const countStatus = (data, decisions) => {
  return (
    data?.filter((item) =>
      decisions.includes(item?._source?.app_state)
    ).length || 0
  );
};

export function PlanningCard({ postcode, ShortAddress }) {
  const [planningData, setPlanningData] = useState([]);
  const [timeFrame, setTimeFrame] = useState(6);


  const filteredPlanningData = useMemo(() => {
    const now = new Date();
    const monthsAgo = new Date();
    monthsAgo.setMonth(now.getMonth() - timeFrame);

    return planningData.filter((item) => {
      const dateReceivedStr = item._source.other_fields?.date_received;
      if (!dateReceivedStr) return false;

      const dateReceived = new Date(dateReceivedStr);
      return dateReceived >= monthsAgo && dateReceived <= now;
    });
  }, [planningData, timeFrame]);
  
  const statusData = [
    {
      label: "Approved",
      count: countStatus(filteredPlanningData, [
        "Application Permitted",
        "Grant",
        "Granted",
        "Approved",
        "Approve",
        "Approval",
        "Approve with Conditions",
        "Application Granted",
      ]),
      iconColor: "text-green-500",
      icon: "mdi:check-circle",
    },
    {
      label: "Pending",
      count: countStatus(filteredPlanningData, ["Undecided"]),
      iconColor: "text-blue-500",
      icon: "mdi:progress-clock",
    },
    {
      label: "Rejected",
      count: countStatus(filteredPlanningData, ["Refuse", "Refused", "Rejected"]),
      iconColor: "text-red-500",
      icon: "mdi:close-circle",
    },
    {
      label: "Withdrawn",
      count: countStatus(filteredPlanningData, ["Withdrawn"]),
      iconColor: "text-gray-500",
      icon: "mdi:minus-circle",
    },
  ];

  const timeFrameOptions = [
    { key: 6, label: "Last 6 Months" },
    { key: 12, label: "Last 12 Months" },
  ];

  // Fetch planning data based on postcode and time frame
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
      setPlanningData(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

 


  useEffect(() => {
    if (postcode) getPlanningData(postcode);
  }, [postcode, timeFrame]);

  const handleTimeFrameChange = (key) => {
    setTimeFrame(Number(key));
  };

  return (
    <Card className="m-4" style={{ minHeight: "200px" }}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full my-2">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
              <Icon icon="mdi:planner" width={16} className="text-purple-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 text-center sm:text-left">
              What are the Planning applications in {ShortAddress}?
            </h2>
          </div>
          {/* Dropdown for selecting time frame */}
          <TimeFrameDropdown
            options={timeFrameOptions}
            selectedKey={timeFrame}
            onSelectionChange={handleTimeFrameChange}
          />
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
          <div className="flex flex-col rounded-md">
            {/* Status Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap p-2 justify-between">
              {statusData.map((status, index) => (
                <StatusCard
                  key={index}
                  label={status?.label}
                  count={status?.count}
                  iconColor={status?.iconColor}
                  icon={status?.icon}
                  className="w-full sm:w-auto mb-2 sm:mb-0"
                />
              ))}
            </div>
            <div className="p-2 overflow-x-auto">
              <PlanningApplicationsTable planningData={filteredPlanningData} timeFrame={timeFrame} />
            </div>
            <div className="z-10 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
              <div className="hidden xl:flex h-96">
                <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                  <div className="flex-1 z-40 h-full">
                    <div className="h-full w-full">
                      <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                        <PlanningApplicationMapStatic
                          center={
                            filteredPlanningData.length > 0
                              ? filteredPlanningData?.map((data) => ({
                                  lat: data?._source?.location_y || 51.999668,
                                  lng: data?._source?.location_x || -0.267018,
                                }))
                              : []
                          }
                        />
                        <div className="absolute top-4 gap-2 right-4 z-[1000]">
                          <FloatingCard data={filteredPlanningData} />
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
