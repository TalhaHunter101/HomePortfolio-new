import { marketInfoStore } from "@/store/listingStore";
import { Card, CardHeader, Chip, CardBody, Switch } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import ComparesionTable from "./ComparesionTable";
import { RecentlySoldCard } from "../RecentlySoldCard";
import { Icon } from "@iconify/react";

function MarketInfoPage({ city, postcode }) {
  const { marketInfo } = marketInfoStore();
  const [mergedData, setMergedData] = useState([]);
  const [activeView, setActiveView] = useState("table");
  const [isHidden, setIsHidden] = useState(false);

  const fetchEPCData = async (uprn) => {
    setIsHidden(true);
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
      <div className={`${isHidden ? "hidden" : "block"}`}>
        <RecentlySoldCard city={city} postcode={postcode} ishideen={true} />
      </div>
      <CardHeader className="">
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="icon-park-outline:market-analysis"
              width={16}
              className="text-purple-700"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            How is the Market here?
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <p className="text-xl font-semibold text-gray-400">Property Count: </p>
          <Chip color="primary">{marketInfo?.totalCount}</Chip>

          {/* Switch for view selection */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:ml-auto">
            <Switch
              checked={activeView === "map"}
              size="lg"
              color="success"
              onChange={(e) => setActiveView(e.target.checked ? "map" : "table")}
              startContent={<Icon icon="fluent:table-copy-20-regular" width={24} />}
              endContent={<Icon icon="mdi:map-outline" width={24} />}
            >
              {activeView === "map" ? "Map View" : "Table View"}
            </Switch>
          </div>
        </div>

        {/* Conditionally render the table or the map based on active view */}
        {activeView === "table" && mergedData.length === 0 && (
          <p>No data available</p>
        )}
        {activeView === "table" && mergedData.length > 0 && (
          <ComparesionTable data={mergedData} />
        )}

        {activeView === "map" && (
          <RecentlySoldCard city={city} postcode={postcode} ishideen={true} />
        )}
      </CardBody>
    </Card>
  );
}

export default MarketInfoPage;
