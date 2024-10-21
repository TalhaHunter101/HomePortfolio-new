import React, { useEffect, useState } from "react";
import { FloodMapMapsStatic } from "../Maps";
import { Card, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const FloodData = ({ latitude, longitude }) => {
  const [floodAreas, setFloodAreas] = useState([]);

  useEffect(() => {
    const fetchFloodAreas = async () => {
      try {
        const response = await fetch(
          "https://environment.data.gov.uk/flood-monitoring/id/floodAreas"
        );
        const data = await response.json();

        // Extract polygon URLs
        const polygonUrls = data.items
          .map((area) => area.polygon)
          .filter(Boolean);

        const polygons = await Promise.all(
          polygonUrls.map(async (url) => {
            //check if url is http or https if it is http then convert it to https
            if (url.startsWith("http://")) {
              url = url.replace("http://", "http://");
            }

            const polygonResponse = await fetch(url);
            const polygonData = await polygonResponse.json();

            return polygonData;
          })
        );

        setFloodAreas(polygons);
      } catch (error) {
        console.error("Error fetching flood areas:", error);
      }
    };

    fetchFloodAreas();
  }, []);

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <div className="h-[50vh] md:h-[60vh]">
        <CardHeader>
          <div className="flex items-center my-2">
            <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
              <Icon
                icon="mdi:person-details"
                width={16}
                className="text-purple-700"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-700">Flood Risk Map</h2>
          </div>
        </CardHeader>

        <FloodMapMapsStatic floodAreas={floodAreas} latitude={latitude} longitude={longitude} height="400px" />
      </div>
    </Card>
  );
};

export default FloodData;
