"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { EnergyPerformanceTable } from "./EPCcomponents/table";
import { PerformanceSection } from "./EPCcomponents/PerformanceSection";
import ECPBarChart from "./ECPBarChart";
import { useListingStore } from "@/store/listingStore";

export function EPCCard({ title, price, roi, uprn }) {
  const [epcData, setEpcData] = useState(null);
  const [currentColour, setCurrentColour] = useState("");
  const { setSquarfoot } = useListingStore();

  useEffect(() => {
    const fetchEpcData = async () => {
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
        const data = await response.json();
        setEpcData(data[0]?._source);
        setSquarfoot(data[0]?._source?.TOTAL_FLOOR_AREA);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchEpcData();
  }, [uprn]);

  const breakdownData = [
    {
      feature: "Walls",
      description: epcData?.WALLS_DESCRIPTION,
      rating: epcData?.WALLS_ENERGY_EFF,
    },
    {
      feature: "Roof",
      description: epcData?.ROOF_DESCRIPTION,
      rating: epcData?.ROOF_ENERGY_EFF,
    },
    {
      feature: "Floor",
      description: epcData?.FLOOR_DESCRIPTION,
      rating: epcData?.FLOOR_ENERGY_EFF,
    },
    {
      feature: "Windows",
      description: epcData?.WINDOWS_DESCRIPTION,
      rating: epcData?.WINDOWS_ENERGY_EFF,
    },
    {
      feature: "Main heating",
      description: epcData?.MAINHEAT_DESCRIPTION,
      rating: epcData?.MAINHEAT_ENERGY_EFF,
    },
    {
      feature: "Main heating control",
      description: epcData?.MAINHEATCONT_DESCRIPTION,
      rating: epcData?.MAINHEATC_ENERGY_EFF,
    },
    {
      feature: "Hot water",
      description: epcData?.HOTWATER_DESCRIPTION,
      rating: epcData?.HOT_WATER_ENERGY_EFF,
    },
    {
      feature: "Lighting",
      description: epcData?.LIGHTING_DESCRIPTION,
      rating: epcData?.LIGHTING_ENERGY_EFF,
    },
    {
      feature: "Air tightness",
      description: epcData?.AIR_DESCRIPTION || "-",
      rating: epcData?.AIR_ENERGY_EFF || "-",
    },
    {
      feature: "Secondary heating",
      description: epcData?.SECONDHEAT_DESCRIPTION,
      rating: epcData?.SECONDHEAT_ENERGY_EFF || "-",
    },
  ];
  return (
    <Card className="m-4  " style={{ maxHeight: "800px", minWidth: "800px" }}>
      <CardHeader></CardHeader>
      <CardBody>
        {epcData && (
          <div className="overflow-hidden ">
            <div className="flex p-4 border border-subtle-border rounded-md">
              <div className="w-1/2 pr-4">
                <h3 className="font-semibold mb-2">
                  Energy Performance Certificate (EPC)
                </h3>
                <span className="mb-4 text-gray-500 text-xs">
                  This property&apos;s current energy rating is{" "}
                  <strong>{epcData?.CURRENT_ENERGY_RATING}</strong>. It has the
                  potential to be{" "}
                  <strong>
                    {epcData && epcData["POTENTIAL_ENERGY_RATING"]}
                  </strong>
                  .
                  <svg
                    aria-hidden="true"
                    x="515"
                    y="320"
                    width="50"
                    height="30"
                    className={`rating-current rating-label `}
                  >
                    <polygon
                      points="0,15 15,30 60,30 60,0 15,0 0,15"
                      class={`${currentColour.class}`}
                    ></polygon>
                    <text x="20" y="20" class="govuk-!-font-weight-bold">
                      {epcData?.CURRENT_ENERGY_EFFICIENCY}{" "}
                      {epcData?.CURRENT_ENERGY_RATING}
                    </text>
                  </svg>
                </span>

                {/* Placeholder for EPC graph */}
                <ECPBarChart
                  data={epcData}
                  setCurrentColour={setCurrentColour}
                />

                <Divider className="my-4" />

                <EnergyPerformanceTable data={breakdownData} />
              </div>

              <Divider orientation="vertical" className="mx-4 h-auto" />

              {/* Right Column for Performance */}
              <PerformanceSection />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
