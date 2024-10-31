import { IndivisualProprtyMapStatic } from "@/components/Maps";
import React from "react";

const LocationMap = ({ center, isInteractive, postcode, geom }) => {
  console.log("LocationMap received geom:", geom);
  console.log("LocationMap received center:", center);

  const floodZoneData = {
    geometry:
      "MULTIPOLYGON (((-0.229424 51.226478,-0.229367 51.226477,-0.229365 51.226513,-0.229407 51.226513,-0.229407 51.226527,-0.229464 51.226527,-0.229465 51.226492,-0.229423 51.226491,-0.229424 51.226478)))",
    "flood-risk-level": "3",
    "flood-risk-type": "Fluvial Models",
  };

  return (
    <div
      className={`h-[40vh] md:h-[60vh] ${
        isInteractive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <IndivisualProprtyMapStatic
        center={center}
        floodZoneData={floodZoneData}
        height="500px"
        postcode={postcode}
        geom={geom}
      />
    </div>
  );
};

export default LocationMap;
