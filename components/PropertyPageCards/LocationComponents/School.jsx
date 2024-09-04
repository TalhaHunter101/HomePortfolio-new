import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
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
    <div className="relative h-[80vh] w-full">
      {/* Button Group for selecting school type */}
      <div className="absolute top-8 pl-4 left-4 z-20">
        <ButtonGroup size="" variant="faded" className="w-full">
          <Button
            startContent={<Icon icon="tabler:school" />}
            onClick={() => setSelectedType("Primary")}
            className={`${
              selectedType === "Primary"
                ? "text-blue-800 bg-blue-200"
                : "text-gray-800"
            }`}
          >
            Primary
          </Button>
          <Button
            startContent={<Icon icon="tabler:school" />}
            onClick={() => setSelectedType("Secondary")}
            className={`${
              selectedType === "Secondary"
                ? "text-blue-800 bg-blue-200"
                : "text-gray-800"
            }`}
          >
            Secondary
          </Button>
          <Button
            startContent={<Icon icon="tabler:school" />}
            onClick={() => setSelectedType("Independent")}
            className={`${
              selectedType === "Independent"
                ? "text-blue-800 bg-blue-200"
                : "text-gray-800"
            }`}
          >
            Independent
          </Button>
          <Button
            startContent={<Icon icon="tabler:school" />}
            onClick={() => setSelectedType("All grades")}
            className={`${
              selectedType === "All grades"
                ? "text-blue-800 bg-blue-200"
                : "text-gray-800"
            }`}
          >
            All grades
          </Button>
        </ButtonGroup>
      </div>

      {/* Content boxes hovering over the map on the left side */}
      <div className="absolute top-20 left-4 bg-transparent p-4 w-[400px] max-h-[70vh] overflow-y-auto z-10 scrollbar-hide">
        {filteredSchools && filteredSchools.length > 0 ? (
          filteredSchools.map((school, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
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
        <SchoolMapStatic center={center} />
      </div>
    </div>
  );
};

export default SchoolsMap;
