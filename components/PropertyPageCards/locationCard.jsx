import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import LocationMap from './LocationComponents/Location';
import SchoolsMap from './LocationComponents/School';
import HomesForSaleMap from './LocationComponents/HomeForSale';
import WhatsNearbyMap from './LocationComponents/WhatsNearby';

export function LocationCard({ data, postcode, schoolData }) {
  const [activeMap, setActiveMap] = useState('location');
  const [nearByListingsData, setNearByListingsData] = useState([]);

  const center = {
    lat: data?.location?.coordinates?.latitude,
    lng: data?.location?.coordinates?.longitude,
  };

  useEffect(() => {
    const getNearbyListings = async () => {
      try {
        const res = await fetch('/api/indevisual/get-nearby-listing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
    switch (activeMap) {
      case 'location':
        return <LocationMap center={center} />;
      case 'schools':
        return <SchoolsMap data={data} schoolData={schoolData} />;
      case 'homes_for_sale':
        return <HomesForSaleMap center={center} nearByListingsData={nearByListingsData} />;
      case 'whats_nearby':
        return <WhatsNearbyMap center={center} />;
      default:
        return <LocationMap center={center} />;
    }
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
      <CardHeader className="bg-white inline p-4">
        <p className="text-xs font-bold mb-3">Location</p> 
        <p className="text-xs">{data?.address}</p>
      </CardHeader>
      <div className="sticky top-0 bg-white z-10 ">
        <Tabs
          radius="none"
          fullWidth
          className="divide-y  divide-gray-300"
          aria-label="Map Options"
          color="primary"
          variant="ghost"
          onSelectionChange={(key) => setActiveMap(key)}
          selectedKey={activeMap}
        >
          <Tab key="location" title={<div className="flex items-center  space-x-2"><Icon icon="mdi:map-marker" /><span>Location</span></div>} />
          <Tab key="schools" title={<div className="flex items-center space-x-2"><Icon icon="mdi:school" /><span>Schools</span></div>} />
          <Tab key="homes_for_sale" title={<div className="flex items-center space-x-2"><Icon icon="mdi:home-city" /><span>Homes For Sale</span></div>} />
          <Tab key="whats_nearby" title={<div className="flex items-center space-x-2"><Icon icon="mdi:compass-outline" /><span>What&#39;s Nearby</span></div>} />
        </Tabs>
      </div>
      <CardBody className="p-0 overflow-auto" style={{ maxHeight: '500px' }}>
        {renderMap()}
      </CardBody>
    </Card>
  );
}
