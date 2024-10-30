import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { SchoolMapStatic } from "@/components/Maps";
import { smallString } from "@/utils/Helper";

const SchoolsMap = ({ data, schoolData, isInteractive, geom }) => {
  const [selectedType, setSelectedType] = useState("All grades");

  const center = [
    {
      lat: data?.location?.coordinates?.latitude,
      lng: data?.location?.coordinates?.longitude,
    },
  ];

  // Filtering logic based on selectedType and schoolData
  const filteredSchools = schoolData?.filter((school) => {
    if (selectedType === "All grades") return true;
    return school?._source?.["PhaseOfEducation (name)"]?.includes(selectedType);
  });

  return (
    <div className="relative h-[60vh] w-full">
      {/* Simple buttons for selecting school type */}
      <div className="absolute top-8 pl-4 left-4 z-20 flex space-x-2">
        <button
          onClick={() => setSelectedType("Primary")}
          className={`flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md shadow-md whitespace-nowrap ${
            selectedType === "Primary"
              ? "text-blue-800 bg-blue-200"
              : "text-gray-800"
          }`}
        >
          <Icon icon="tabler:school" width="20" height="20" />
          <span>Primary</span>
        </button>
        <button
          onClick={() => setSelectedType("Secondary")}
          className={`flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap ${
            selectedType === "Secondary"
              ? "text-blue-800 bg-blue-200"
              : "text-gray-800"
          }`}
        >
          <Icon icon="tabler:school" width="20" height="20" />
          <span>Secondary</span>
        </button>
        <button
          onClick={() => setSelectedType("Independent")}
          className={`flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap ${
            selectedType === "Independent"
              ? "text-blue-800 bg-blue-200"
              : "text-gray-800"
          }`}
        >
          <Icon icon="tabler:school" width="20" height="20" />
          <span>Independent</span>
        </button>
        <button
          onClick={() => setSelectedType("All grades")}
          className={`flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap ${
            selectedType === "All grades"
              ? "text-blue-800 bg-blue-200"
              : "text-gray-800"
          }`}
        >
          <Icon icon="tabler:school" width="20" height="20" />
          <span>All grades</span>
        </button>
      </div>

      {/* Content boxes hovering over the map on the left side */}
      <div className="absolute top-20 left-4 bg-transparent p-4 w-[400px] max-h-[50vh] overflow-y-auto z-10 scrollbar-hide">
        {filteredSchools && filteredSchools.length > 0 ? (
          filteredSchools.map((school, index) => (
            // <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
            //   <h2 className="text-xl font-bold">
            //     {school?._source?.OfstedRating}
            //   </h2>
            //   <p className="font-medium text-sm">
            //     {school?._source?.EstablishmentName}
            //   </p>
            //   <p className="text-xs text-gray-600">
            //     {school?._source?.["PhaseOfEducation (name)"]}
            //   </p>
            //   <p className="text-xs text-gray-600">
            //     {school?._source?.StatutoryLowAge} -{" "}
            //     {school?._source?.StatutoryHighAge} years
            //   </p>
            // </div>
            <button key={index} className="w-full h-auto text-left pt-2 pr-2">
            <div className="relative flex flex-col h-full p-2 pl-6 border rounded-md sm:mr-2 sm:rounded-lg border-purple-150 bg-purple-100">
              <div className="flex flex-row items-center h-full space-x-4 truncate flex-1  relative overflow-hidden text-foreground">
                <div className="flex flex-row sm:flex-col">
                  <div
                    className={`text-4xl font-bold text-blue-600 ${
                      school?._source?.["OfstedRating (name)"] === "Outstanding"
                        ? " text-green-900"
                        : school?._source?.["OfstedRating (name)"] === "Good"
                        ? " text-yellow-800"
                        : " text-red-800"
                    }`}
                    style={{ minWidth: "45px" }}
                  >
                    {school?._source?.["OfstedRating (name)"] === "" ||
                    school?._source?.["OfstedRating (name)"].trim() === ""
                      ? "Don't know"
                      : school?._source?.["OfstedRating (name)"]}
                  </div>
                  <div className="flex flex-col text-sm">
                    <p
                      className="truncate text-base font-bold text-purple-800 pr-4"
                      style={{
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        display: "-webkit-box",
                      }}
                      title={school?._source?.EstablishmentName}
                    >
                      {smallString(school?._source?.EstablishmentName, 24)}
                    </p>
                    <span>
                      {parseInt(school?._source?.StatutoryLowAge)}-
                      {parseInt(school?._source?.StatutoryHighAge)},{" "}
                      {school?._source?.["Gender (name)"]},
                      {school?._source?.NumberOfPupils},{" "}
                      {school?._source?.["PhaseOfEducation (name)"]}
                    </span>
                    <div>
                      {school?._source?.Street}, {school?._source?.Postcode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          ))
        ) : (
          <div className="text-gray-500 text-center">No schools found.</div>
        )}
      </div>

      {/* Map container */}
      <div className={`absolute inset-0 z-0 ${ isInteractive ? 'pointer-events-auto' : 'pointer-events-none' }` }>
        <SchoolMapStatic center={center} height="500px" />
      </div>
    </div>
  );
};

export default SchoolsMap;
