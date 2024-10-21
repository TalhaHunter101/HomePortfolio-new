import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
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
      <div className={`relative w-full transition duration-300 overflow-hidden h-[40vh] md:h-[60vh] bg-gray-200`}>
        {/* Placeholder for the map */}
        <p className="text-center text-lg font-semibold">Map Placeholder</p>
      </div>
    );
  };

  return (
    <Card className="m-4 p-0 overflow-hidden">
      {/* Header with the switch */}
      <CardHeader className="bg-white flex justify-between items-center p-4">
        <div>
          <p className="text-xs font-bold mb-1">Overview</p> 
          <p className="text-xs">Location details and information</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isMapInteractive}
            onChange={toggleMapInteractivity}
            aria-label="Map Interactivity Toggle"
            startContent={<Icon icon="hugeicons:touch-locked-04" />}
            endContent={<Icon icon="carbon:touch-1-filled" />}
          />
          <span className="text-gray-500 font-semibold text-xs">
            {isMapInteractive ? 'Disable Map Interactions' : 'Enable Map Interactions'}
          </span>
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
          onSelectionChange={(key) => setActiveTab(key)}
          selectedKey={activeTab}
        >
          <Tab key="overview" title={<div className="flex items-center space-x-2"><Icon icon="mdi:view-dashboard" /><span>Overview</span></div>} />
          <Tab key="demographics" title={<div className="flex items-center space-x-2"><Icon icon="mdi:account-group" /><span>Demographics</span></div>} />
          <Tab key="affluence" title={<div className="flex items-center space-x-2"><Icon icon="mdi:currency-usd" /><span>Affluence</span></div>} />
          <Tab key="crime" title={<div className="flex items-center space-x-2"><Icon icon="mdi:shield-alert" /><span>Crime</span></div>} />
          <Tab key="environment" title={<div className="flex items-center space-x-2"><Icon icon="mdi:tree" /><span>Environment</span></div>} />
          <Tab key="transport" title={<div className="flex items-center space-x-2"><Icon icon="mdi:bus" /><span>Transport</span></div>} />
          <Tab key="amenities" title={<div className="flex items-center space-x-2"><Icon icon="mdi:store" /><span>Amenities</span></div>} />
          <Tab key="schools" title={<div className="flex items-center space-x-2"><Icon icon="mdi:school" /><span>Schools</span></div>} />
          <Tab key="noise" title={<div className="flex items-center space-x-2"><Icon icon="mdi:volume-high" /><span>Noise</span></div>} />
        </Tabs>
      </div>

      {/* Map rendering */}
      <CardBody className="p-0 overflow-auto relative" style={{ maxHeight: '500px' }}>
        {renderMap()}
      </CardBody>
    </Card>
  );
}
