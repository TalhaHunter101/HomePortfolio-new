import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Tabs, Tab, Switch } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import LocationMap from "./LocationComponents/Location";
import SchoolsMap from "./LocationComponents/School";
import HomesForSaleMap from "./LocationComponents/HomeForSale";
import WhatsNearbyMap from "./LocationComponents/WhatsNearby";

export function LocationCard({ data, postcode, schoolData, geom }) {
  const [activeMap, setActiveMap] = useState("location");
  const [nearByListingsData, setNearByListingsData] = useState([]);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  const center = {
    lat: data?.location?.coordinates?.latitude,
    lng: data?.location?.coordinates?.longitude,
  };

  useEffect(() => {
    const getNearbyListings = async () => {
      try {
        const res = await fetch("/api/indevisual/get-nearby-listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postcode }),
        });

        if (!res.ok) return;

        const data = await res.json();
        setNearByListingsData(data);
      } catch (error) {}
    };
    getNearbyListings();
  }, [postcode]);

  const renderMap = () => {
    const mapProps = { center, isMapInteractive };

    switch (activeMap) {
      case "location":
        return (
          <LocationMap
            {...mapProps}
            postcode={postcode}
            center={center}
            geom={geom}
          />
        );
      case "schools":
        return (
          <SchoolsMap
            data={data}
            schoolData={schoolData}
            isInteractive={isMapInteractive}
            geom={geom}
          />
        );
      case "homes_for_sale":
        return (
          <HomesForSaleMap
            {...mapProps}
            nearByListingsData={nearByListingsData}
            isInteractive={isMapInteractive}
            geom={geom}
          />
        );
      case "whats_nearby":
        return (
          <WhatsNearbyMap
            {...mapProps}
            isInteractive={isMapInteractive}
            geom={geom}
          />
        );
      default:
        return <LocationMap {...mapProps} postcode={postcode} geom={geom} />;
    }
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header with the switch */}
      <CardHeader className="bg-white flex justify-between items-center p-4">
        <div>
          <p className="text-xs font-bold mb-1">Location</p>
          <p className="text-xs">{data?.address}</p>
        </div>

        {/* <CardHeader className="bg-white inline p-4">
        <p className="text-xs font-bold mb-3">Location</p>
        <p className="text-xs">{data?.address}</p> */}
      </CardHeader>

      {/* Tabs for selecting different map views */}
      <div className="sticky top-0 bg-white z-10">
        <Tabs
          radius="none"
          fullWidth
          className="divide-y divide-gray-300"
          aria-label="Map Options"
          color="primary"
          variant="ghost"
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

      {/* Map rendering */}
      <CardBody
        className="p-0 overflow-auto relative"
        style={{ maxHeight: "500px" }}
      >
        <div
          className={`relative w-full  transition duration-300 overflow-hidden h-[40vh] md:h-[60vh]
          
          `}
        >
          {renderMap()}
        </div>
      </CardBody>
    </Card>
  );
}
