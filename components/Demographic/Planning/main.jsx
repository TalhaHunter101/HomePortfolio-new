import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { StatusCard } from "./Status";

const countStatus = (data, decisions) => {
    return data?.filter((item) =>
      decisions.includes(item?._source?.other_fields?.decision)
    ).length || 0;
  };
const PlanningCard = (postcode) => {
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
          "Application Granted",
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
        setPlanningData(data || []);
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
    <Card className="m-4 p-0 overflow-hidden ">
        <CardBody>
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
        </CardBody>
    </Card>
    )
};

export default PlanningCard