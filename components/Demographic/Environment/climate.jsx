import React from 'react';
import { Card, CardBody, CardHeader, Divider, Badge } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export function ClimateDataCard({ climateData }) {
  // Sample data for demonstration
  const sampleClimateData = {
    city: "London",
    country: "United Kingdom",
    temperature: "15°C",
    humidity: "78%",
    rainfall: "60 mm",
    climateTrends: "Cooler temperatures in the evenings; high humidity levels year-round.",
  };

  const data = climateData || sampleClimateData;

  return (
    <Card className=" m-4 p-0 overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{data.city} - Climate Data</h2>
          <p className="text-sm">{data.country}</p>
        </div>
        <Badge color="primary" variant="flat">Environment Data</Badge>
      </CardHeader>

      <CardBody className="p-6">
        {/* Temperature */}
        <div className="mb-4 flex items-center space-x-4">
          <Icon icon="mdi:thermometer" width="24" className="text-blue-600" />
          <div>
            <p className="text-sm font-semibold">Temperature</p>
            <p className="text-xl font-bold text-blue-600">{data.temperature}</p>
          </div>
        </div>

        <Divider />

        {/* Humidity */}
        <div className="mt-4 mb-4 flex items-center space-x-4">
          <Icon icon="mdi:water-percent" width="24" className="text-blue-600" />
          <div>
            <p className="text-sm font-semibold">Humidity</p>
            <p className="text-xl font-bold text-blue-600">{data.humidity}</p>
          </div>
        </div>

        <Divider />

        {/* Rainfall */}
        <div className="mt-4 mb-4 flex items-center space-x-4">
          <Icon icon="mdi:weather-rainy" width="24" className="text-blue-600" />
          <div>
            <p className="text-sm font-semibold">Rainfall</p>
            <p className="text-xl font-bold text-blue-600">{data.rainfall}</p>
          </div>
        </div>

        <Divider />

        {/* Climate Trends */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Climate Trends</p>
          <p className="text-sm text-gray-700 mt-1">{data.climateTrends}</p>
        </div>
      </CardBody>
    </Card>
  );
}
