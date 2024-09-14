import { marketInfoStore } from "@/store/listingStore";
import { Card, CardHeader, Chip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import ComparesionTable from "./ComparesionTable";

function MarketInfoPage() {
  const { marketInfo } = marketInfoStore();
  const [mergedData, setMergedData] = useState([]);

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
    <Card className="m-4" style={{ minHeight: "150px", minWidth: "800px" }}>
      <CardHeader className="gap-7">
        <h1 className="text-2xl font-bold">Market Information</h1>
        <h2 className="text-xl font-semibold text-gray-400">
          Property Count:{" "}
        </h2>
        <Chip color="primary">{marketInfo?.totalCount}</Chip>
      </CardHeader>

      {mergedData.length === 0 && <p>No data available</p>}

     
        <ComparesionTable data={mergedData} />
    </Card>
  );
}

export default MarketInfoPage;
