"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { smallString } from "@/utils/Helper";

export function SchoolsCard({ schoolData = [], address, ShortAddress }) {
  const [selectedType, setSelectedType] = useState("All grades");

  const schoolType = ["Independent", "Primary", "Secondary", "All grades"];

  function formatString(inputString) {
    return inputString.replace(/ /g, "-").toLowerCase();
  }

  // Dummy data for schoolData
  const dummySchoolData = [
    {
      _source: {
        EstablishmentName: "Greenwood Primary School",
        "PhaseOfEducation (name)": "Primary",
        "OfstedRating (name)": "Good",
        StatutoryLowAge: "5",
        StatutoryHighAge: "11",
        "Gender (name)": "Mixed",
        NumberOfPupils: "450",
        Street: "Green St",
        Postcode: "12345",
      },
    },
    {
      _source: {
        EstablishmentName: "Sunnydale High School",
        "PhaseOfEducation (name)": "Secondary",
        "OfstedRating (name)": "Outstanding",
        StatutoryLowAge: "11",
        StatutoryHighAge: "18",
        "Gender (name)": "Mixed",
        NumberOfPupils: "1200",
        Street: "Sunset Blvd",
        Postcode: "54321",
      },
    },
  ];

  const schools = schoolData.length ? schoolData : dummySchoolData;

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon icon="mdi:school" width={16} className="text-purple-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            How Are the Schools near {ShortAddress}?
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="rounded-md">
          <div className="flex justify-center gap-2 pb-4 flex-wrap">
            {schoolType.map((type) => (
              <Button
                key={type}
                size="sm"
                className={`flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 ${
                  selectedType === type
                    ? "text-blue-800 bg-blue-200 border border-blue-300 hover:bg-blue-200 "
                    : "text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200"
                }`}
                onPress={() => setSelectedType(type)}
              >
                <span>{type}</span>
              </Button>
            ))}
          </div>

          <div className="flex-1 w-full overflow-y-scroll scrollbar snap-mandatory space-x-2 ml-2 mb-2">
            <div className="flex flex-row sm:flex-col">
              {schools
                .filter((item) =>
                  selectedType === "All grades"
                    ? true
                    : item?._source?.["PhaseOfEducation (name)"].includes(
                        selectedType
                      )
                )
                .filter(
                  (item) =>
                    item?._source?.["OfstedRating (name)"] !== "" &&
                    item?._source?.["OfstedRating (name)"].trim() !== "" &&
                    item?._source?.["OfstedRating (name)"] !== "Don't know"
                ).length > 0 ? (
                schools
                  .filter((item) =>
                    selectedType === "All grades"
                      ? true
                      : item?._source?.["PhaseOfEducation (name)"].includes(
                          selectedType
                        )
                  )
                  .filter(
                    (item) =>
                      item?._source?.["OfstedRating (name)"] !== "" &&
                      item?._source?.["OfstedRating (name)"].trim() !== "" &&
                      item?._source?.["OfstedRating (name)"] !== "Don't know"
                  )
                  .map((item, index) => (
                    <div
                      className="flex-shrink-0 snap-start map-list-item mb-0 w-auto"
                      key={index}
                    >
                      <button className="w-full h-auto text-left pt-2 pr-2">
                        <div className="relative flex flex-col h-full p-2 pl-6 border rounded-md sm:mr-2 sm:rounded-lg border-purple-150 bg-purple-100">
                          <div className="flex flex-row items-center h-full space-x-4 truncate flex-1 relative overflow-hidden text-foreground">
                            <div className="flex flex-row sm:flex-col">
                              <div
                                className={`text-4xl font-bold text-blue-600 ${
                                  item?._source?.["OfstedRating (name)"] ===
                                  "Outstanding"
                                    ? " text-green-900"
                                    : item?._source?.["OfstedRating (name)"] ===
                                      "Good"
                                    ? " text-yellow-800"
                                    : " text-red-800"
                                }`}
                                style={{ minWidth: "45px" }}
                              >
                                {item?._source?.["OfstedRating (name)"] || "N/A"}
                              </div>
                              <div className="flex flex-col text-sm">
                                <p
                                  className="truncate text-base font-bold text-purple-800 pr-4"
                                  style={{
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    display: "-webkit-box",
                                  }}
                                  title={item?._source?.EstablishmentName}
                                >
                                  {smallString(
                                    item?._source?.EstablishmentName,
                                    24
                                  )}
                                </p>
                                <span>
                                  {parseInt(item?._source?.StatutoryLowAge)}-
                                  {parseInt(item?._source?.StatutoryHighAge)},
                                  {item?._source?.["Gender (name)"]},{" "}
                                  {item?._source?.NumberOfPupils},{" "}
                                  {item?._source?.["PhaseOfEducation (name)"]}
                                </span>
                                <div>
                                  {item?._source?.Street},{" "}
                                  {item?._source?.Postcode}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))
              ) : (
                <div className="flex justify-center items-center text-xl w-full h-full p-4 text-center text-gray-500">
                  No data found
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
