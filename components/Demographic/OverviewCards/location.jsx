import React, { useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Tabs, Tab, Switch } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export function LocationOverviewCard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  const toggleMapInteractivity = () => {
    setIsMapInteractive((prevState) => !prevState);
  };

  const renderMap = () => {
    return (
      <div className="relative w-full transition duration-300 overflow-hidden h-[40vh] md:h-[60vh] lg:h-[70vh] bg-gray-200 flex items-center justify-center">
        {/* Placeholder for the map with responsive width */}
        <p className="text-center text-lg font-semibold w-[1100px] ">
          Map Placeholder
        </p>
      </div>
    );
  };

  return (
    <div className="m-4">
      <Card className="p-0 overflow-hidden">
        <CardBody className="p-0 overflow-auto relative">
          {renderMap()}
        </CardBody>
      </Card>
    </div>
  );
}
