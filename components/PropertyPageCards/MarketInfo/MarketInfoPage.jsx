import { marketInfoStore } from "@/store/listingStore";
import { Card, CardHeader, Chip, Button, CardBody } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import ComparesionTable from "./ComparesionTable";
import { RecentlySoldCard } from "../RecentlySoldCard";
import { Icon } from "@iconify/react";

function MarketInfoPage({ city, postcode }) {
  const { marketInfo } = marketInfoStore();
  const [mergedData, setMergedData] = useState([]);
  const [activeView, setActiveView] = useState("table"); // State to track which view is active

  const fetchEPCData = async (uprn) => {
    try {
      const response = await fetch("/api/indevisual/get-epc-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uprn }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch EPC data");
      }

      const { epcData } = await response.json();
      if (epcData.length > 0) {
        const epc = epcData[0]._source;
        return {
          currentEnergyEfficiency: epc.CURRENT_ENERGY_EFFICIENCY,
          currentEnergyRating: epc.CURRENT_ENERGY_RATING,
          totalFloorArea: epc.TOTAL_FLOOR_AREA,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching EPC data:", error);
      return null;
    }
  };

  useEffect(() => {
    const mergeDataWithEPC = async () => {
      const updatedData = await Promise.all(
        marketInfo?.hits?.map(async (property) => {
          const uprn = property._source.uprn;
          const epcData = await fetchEPCData(uprn);

          // Merge market info with EPC data
          return {
            ...property._source,
            epcData: epcData || {},
          };
        })
      );

      setMergedData(updatedData);
    };

    if (marketInfo?.hits) {
      mergeDataWithEPC();
    }
  }, [marketInfo]);

  return (
    <Card className="m-4">
      <CardHeader className="">
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="icon-park-outline:market-analysis"
              width={16} // Adjust the icon size to fit well within the circle
              className="text-purple-700" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            How is the Market here?
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <h1 className="text-2xl font-bold">Market Information</h1>
          <h2 className="text-xl font-semibold text-gray-400">
            Property Count:{" "}
          </h2>
          <Chip color="primary">{marketInfo?.totalCount}</Chip>
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:ml-auto">
            <Button
              auto
              color={activeView === "table" ? "primary" : "default"}
              onClick={() => setActiveView("table")}
            >
              Table View
            </Button>
            <Button
              auto
              color={activeView === "map" ? "primary" : "default"}
              onClick={() => setActiveView("map")}
            >
              Map View
            </Button>
          </div>
        </div>
        {/* Buttons for switching views */}

        {/* Conditionally render the table or the map based on active view */}
        {activeView === "table" && mergedData.length === 0 && (
          <p>No data available</p>
        )}
        {activeView === "table" && mergedData.length > 0 && (
          <ComparesionTable data={mergedData} />
        )}

        {activeView === "map" && (
          <RecentlySoldCard city={city} postcode={postcode} />
        )}
      </CardBody>
    </Card>
  );
}

export default MarketInfoPage;
