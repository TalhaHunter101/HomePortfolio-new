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
          "https://environment.data.gov.uk/flood-monitoring/id/floods"
        );
        const data = await response.json();
  
        // Extract polygon URLs and severity level
        const areasWithPolygons = data.items
          .map((area) => ({
            polygon: area.floodArea?.polygon,
            severityLevel: area.severityLevel
          }))
          .filter((area) => area.polygon); // Ensure only areas with polygons are included
  
          // console.log("areasWithPolygons is",areasWithPolygons);
          
          const polygons = await Promise.all(
            areasWithPolygons.map(async (area) => {
              let { polygon, severityLevel } = area;
              try {
                // Convert HTTP to HTTPS if needed
                if (polygon && polygon.startsWith("http://")) {
                  polygon = polygon.replace("http://", "https://");
                }
          
                // Fetch the polygon data
                const polygonResponse = await fetch(polygon);
                
                if (!polygonResponse.ok) {
                  throw new Error(`Failed to fetch polygon data from ${polygon}`);
                }
          
                const polygonData = await polygonResponse.json();
                
                // Debug logs for polygon and severity level
                console.log("polygonData is", polygonData);
                console.log("severityLevel is", severityLevel);
                
                return { polygonData, severityLevel };
                
              } catch (error) {
                console.error(`Error fetching polygon data for area ${polygon}:`, error);
                return null; // Return null to handle failed fetches
              }
            })
          );
          
          // Filter out null values in case any of the fetch calls failed
          const validPolygons = polygons.filter(polygon => polygon !== null);
          
          // Debug log for the final polygons array
          console.log("polygons is", validPolygons);
          
  
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
