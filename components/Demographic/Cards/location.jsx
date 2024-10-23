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
      <div className="relative w-full transition duration-300 overflow-hidden h-[40vh] md:h-[60vh] bg-gray-200">
        {/* Switch in top right corner */}
        <div className="absolute top-2 right-2 flex items-center space-x-2 z-10">
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
        
        {/* Placeholder for the map */}
        <p className="text-center text-lg font-semibold">Map Placeholder</p>
      </div>
    );
  };

  return (
    <div className="m-4">
      {/* Tabs for selecting different map views */}
      <div className="sticky top-0 bg-transparent z-10 mb-4">
        <Tabs
          radius="full"
          fullWidth
          className="bg-transparent shadow-none"
          aria-label="Map Options"
          variant="flat"
          onSelectionChange={(key) => setActiveTab(key)}
          selectedKey={activeTab}
        >
          <Tab
            key="overview"
            className={activeTab === 'overview' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:view-dashboard" />
                <span>Overview</span>
              </div>
            }
          />
          <Tab
            key="demographics"
            className={activeTab === 'demographics' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:account-group" />
                <span>Demographics</span>
              </div>
            }
          />
          <Tab
            key="affluence"
            className={activeTab === 'affluence' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:currency-usd" />
                <span>Affluence</span>
              </div>
            }
          />
          <Tab
            key="crime"
            className={activeTab === 'crime' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:shield-alert" />
                <span>Crime</span>
              </div>
            }
          />
          <Tab
            key="environment"
            className={activeTab === 'environment' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:tree" />
                <span>Environment</span>
              </div>
            }
          />
          <Tab
            key="transport"
            className={activeTab === 'transport' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:bus" />
                <span>Transport</span>
              </div>
            }
          />
          <Tab
            key="amenities"
            className={activeTab === 'amenities' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:store" />
                <span>Amenities</span>
              </div>
            }
          />
          <Tab
            key="schools"
            className={activeTab === 'schools' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:school" />
                <span>Schools</span>
              </div>
            }
          />
          <Tab
            key="noise"
            className={activeTab === 'noise' ? 'bg-transparent text-white shadow-md' : 'bg-white text-gray-500'}
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:volume-high" />
                <span>Noise</span>
              </div>
            }
          />
        </Tabs>
      </div>

      {/* The card now only contains the map */}
      <Card className="p-0 overflow-hidden">
        <CardBody className="p-0 overflow-auto relative" style={{ maxHeight: '500px' }}>
          {renderMap()}
        </CardBody>
      </Card>
    </div>
  );
}
