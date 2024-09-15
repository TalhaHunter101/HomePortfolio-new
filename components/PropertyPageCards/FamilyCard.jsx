"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FamilyCustomPieChart } from "./Charts/FamilyPieChart";
import Peoplegender from "./Demographic/Peoplegender";

export function FamilyCard({ postcode }) {
  const [PeopleGenderData, setPeopleGenderData] = useState([]);
  useEffect(() => {
    const getPeopleGenderData = async (postcode) => {
      try {
        const data = await fetch(
          "/api/indevisual/demographic/get-people-gender-data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postcode }),
          }
        );
        if (!data.ok) {
          return null;
        }

        const response = await data.json();

        setPeopleGenderData(response);
      } catch (error) {}
    };

    getPeopleGenderData(postcode);
  }, [postcode]);

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardBody>
        <div className="rounded-md ">
          <div className="bg-default-white  p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden rounded-lg">
            <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground text-lg">
              <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-purple-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0"
                  className="inline-block text-sm md:text-md w-6 lg:w-8 text-foreground"
                >
                  <path d="M120 88a72 72 0 1 1 144 0A72 72 0 1 1 120 88zM7.7 144.5c13-17.9 38-21.8 55.9-8.8L99.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H96V251.7c-15.2-6.7-29.7-15.1-43.3-25L16.5 200.3c-17.9-13-21.8-38-8.8-55.9zM97.5 329.3l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C38 438.6 36.1 417 47.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L252 419.4l-26-37.2z"></path>
                </svg>
              </div>
              <span>Can I raise a family in East Simi Valley?</span>
            </h2>
            <div className="leading-6 w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 grid items-start sm:items-center grid-cols-2">
              <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                <div className="text-xs md:text-sm capitalize text-foreground">
                  # daycares nearby
                </div>
                <div className="text-xl text-foreground font-medium">3</div>
              </div>
              <div className="flex flex-col items-center mb-2 pr-2 text-center justify-between">
                <div className="text-xs md:text-sm capitalize text-foreground">
                  Percentage of Families
                </div>
                <div className="text-xl text-muted-foreground font-medium">
                  68%
                </div>
              </div>
            </div>
          </div>
          <Peoplegender PeopleGenderData={PeopleGenderData} />
          {/* lowerdiv */}
        </div>
      </CardBody>
    </Card>
  );
}
