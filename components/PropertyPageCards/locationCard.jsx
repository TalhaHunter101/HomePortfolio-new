"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import LocationMap from "./LocationComponents/Location";
import SchoolsMap from "./LocationComponents/School";
import HomesForSaleMap from "./LocationComponents/HomeForSale";
import WhatsNearbyMap from "./LocationComponents/WhatsNearby";

export function LocationCard({ data, postcode,schoolData }) {
  const [activeMap, setActiveMap] = useState("location");
  const [nearByListingsData, setNearByListingsData] = useState([]);

  const center = {
    lat: data?.location?.coordinates?.latitude,
    lng: data?.location?.coordinates?.longitude,
  };

  useEffect(() => {
    const getNearbyListings = async () => {
      try {
        const res = await fetch("/api/indevisual/get-nearby-listing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postcode,
          }),
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setNearByListingsData(data);
      } catch (error) {}
    };
    getNearbyListings();
  }, [postcode]);

  

  // Render the map based on the activeMap state
  const renderMap = () => {
    switch (activeMap) {
      case "location":
        return <LocationMap center={center} />;
      case "schools":
        return <SchoolsMap data={data} schoolData={schoolData} />;
      case "homes_for_sale":
        return <HomesForSaleMap center={center} nearByListingsData={nearByListingsData} />;
      case "whats_nearby":
        return <WhatsNearbyMap center={center} />;
      default:
        return <LocationMap center={center} />;
    }
  };

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className=" w-full p-4 bg-default-white  rounded-md">
          <p className="text-[12px] font-bold text-base mb-3">Location</p>
          <p className="text-[12px] font-medium">{data?.address}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className=" w-full flex divide-x bg-gray-250 p-2 mb-2 rounded-lg sm:pr-4">
          <Tabs
            fullWidth
            className=" w-full flex justify-between"
            aria-label="Map Options"
            color="primary"
            variant="bordered"
            onSelectionChange={(key) => setActiveMap(key)}
            selectedKey={activeMap}
          >
            <Tab
              key="location"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:map-marker" />
                  <span>Location</span>
                </div>
              }
            />
            <Tab
              key="schools"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:school" />
                  <span>Schools</span>
                </div>
              }
            />
            <Tab
              key="homes_for_sale"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:home-city" />
                  <span>Homes For Sale</span>
                </div>
              }
            />
            <Tab
              key="whats_nearby"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:compass-outline" />
                  <span>What&#39;s Nearby</span>
                </div>
              }
            />
          </Tabs>
        </div>
        {renderMap()}
      </CardBody>
    </Card>
  );
}
