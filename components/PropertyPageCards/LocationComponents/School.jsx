import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { SchoolMapStatic } from "@/components/Maps";

const SchoolsMap = ({ data, schoolData }) => {
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
            <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-bold">
                {school?._source?.OfstedRating}
              </h2>
              <p className="font-medium text-sm">
                {school?._source?.EstablishmentName}
              </p>
              <p className="text-xs text-gray-600">
                {school?._source?.["PhaseOfEducation (name)"]}
              </p>
              <p className="text-xs text-gray-600">
                {school?._source?.StatutoryLowAge} -{" "}
                {school?._source?.StatutoryHighAge} years
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No schools found.</div>
        )}
      </div>

      {/* Map container */}
      <div className="absolute inset-0 z-0">
        <SchoolMapStatic center={center} height="500px" />
      </div>
    </div>
  );
};

export default SchoolsMap;
