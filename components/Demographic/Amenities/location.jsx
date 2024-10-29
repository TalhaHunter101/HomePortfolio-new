import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Tabs, Tab, Switch } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export function LocationCard({ data = {}, postcode = "12345", schoolData = [] }) {
  const [activeMap, setActiveMap] = useState("location");
  const [nearByListingsData, setNearByListingsData] = useState([]);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  const center = {
    lat: data?.location?.coordinates?.latitude || 37.7749, // Default coordinates for demo
    lng: data?.location?.coordinates?.longitude || -122.4194,
  };

  // Sample data for testing
  const sampleAddress = "123 Sample St, Sample City";
  const sampleSchoolData = [
    { name: "Sample High School", location: { latitude: 37.779, longitude: -122.419 } },
    { name: "Sample Elementary", location: { latitude: 37.778, longitude: -122.422 } },
  ];

  const sampleNearByListingsData = [
    { id: 1, title: "Home 1", lat: 37.774, lng: -122.421 },
    { id: 2, title: "Home 2", lat: 37.775, lng: -122.420 },
  ];

  useEffect(() => {
    if (!postcode) return;
    // Using sample data for nearby listings
    setNearByListingsData(sampleNearByListingsData);
  }, [postcode]);

  const renderMap = () => {
    const mapProps = { center, isMapInteractive };

    // Using placeholder divs for each map type
    switch (activeMap) {
      case "location":
        return <div style={{ ...mapProps, height: '100%', backgroundColor: '#e0e0e0' }}>Location Map Placeholder</div>;
      case "schools":
        return <div style={{ ...mapProps, height: '100%', backgroundColor: '#c8e6c9' }}>Schools Map Placeholder</div>;
      case "homes_for_sale":
        return (
          <div style={{ ...mapProps, height: '100%', backgroundColor: '#ffcdd2' }}>
            Homes For Sale Map Placeholder
          </div>
        );
      case "whats_nearby":
        return <div style={{ ...mapProps, height: '100%', backgroundColor: '#bbdefb' }}>Whats Nearby Map Placeholder</div>;
      default:
        return <div style={{ ...mapProps, height: '100%', backgroundColor: '#e0e0e0' }}>Location Map Placeholder</div>;
    }
  };

  return (
    <Card className="m-4 p-0 overflow-hidden w-full lg:w-[1100px]">
      {/* Card Header */}
      <CardHeader className="bg-white flex justify-between items-center p-4">
        <div>
          <p className="text-xs font-bold mb-1">Location</p> 
          <p className="text-xs">{data?.address || sampleAddress}</p>
        </div>
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
          <Tab key="location" title={<Icon icon="mdi:map-marker" />} />
          <Tab key="schools" title={<Icon icon="mdi:school" />} />
          <Tab key="homes_for_sale" title={<Icon icon="mdi:home-city" />} />
          <Tab key="whats_nearby" title={<Icon icon="mdi:compass-outline" />} />
        </Tabs>
      </div>

      {/* Map rendering */}
      <CardBody className="p-0 overflow-auto relative" style={{ maxHeight: '500px' }}>
        <div className="relative w-full transition duration-300 overflow-hidden h-[40vh] md:h-[60vh] lg:h-[80vh]">
          {renderMap()}
        </div>
      </CardBody>
    </Card>
  );
}
