import React, { useEffect, useState } from "react";
import { FloodMapMapsStatic } from "../Maps";
import { Card, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const FloodData = ({ latitude, longitude }) => {
  const [floodAreas, setFloodAreas] = useState([]);

  useEffect(() => {
    const fetchFloodAreas = async () => {
      try {
        // Fetch flood data with severity level
        const floodResponse = await fetch(
          "https://environment.data.gov.uk/flood-monitoring/id/floods"
        );
        const floodData = await floodResponse.json();
  
        // Fetch flood areas (larger dataset)
        const areasResponse = await fetch(
          "https://environment.data.gov.uk/flood-monitoring/id/floodAreas"
        );
        const areasData = await areasResponse.json();
  
        // Extract flood areas with polygons from the second API
        const areasWithPolygons = areasData.items
          .map((area) => ({
            polygon: area.polygon,
            floodAreaID: area.notation, // Use 'notation' as the common key
            lat: area.lat,
            long: area.long,
          }))
          .filter((area) => area.polygon); // Only include areas with polygons
  
        // Create a mapping of floodAreaID to severityLevel from the first API
        const severityMapping = floodData.items.reduce((acc, flood) => {
          if (flood.floodAreaID) {
            acc[flood.floodAreaID] = flood.severityLevel;
          }
          return acc;
        }, {});
  
        // Combine both datasets by adding severityLevel to areas with polygons
        const combinedFloodAreas = await Promise.all(
          areasWithPolygons.map(async (area) => {
            let { polygon } = area;
  
            try {
              if (polygon && polygon.startsWith("http://")) {
                polygon = polygon.replace("http://", "https://");
              }
  
              const polygonResponse = await fetch(polygon);
              if (!polygonResponse.ok) {
                throw new Error(`Failed to fetch polygon data from ${polygon}`);
              }
  
              const polygonData = await polygonResponse.json();
  
              return {
                polygonData,
                severityLevel: severityMapping[area.floodAreaID] || 3, 
                lat: area.lat,
                long: area.long,
              };
            } catch (error) {
              console.error(`Error fetching polygon data for area ${polygon}:`, error);
              return null;
            }
          })
        );
  
        const validPolygons = combinedFloodAreas.filter((area) => area !== null);
        setFloodAreas(validPolygons);
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
