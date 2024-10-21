import { IndivisualProprtyMapStatic } from "@/components/Maps";
import React from "react";

const LocationMap = ({ center, postcode }) => {
  return (
    <div className="h-[40vh] md:h-[60vh]">
      <IndivisualProprtyMapStatic
        center={center}
        postcode={postcode}
        height="500px"
      />
    </div>
  );
};

export default LocationMap;
