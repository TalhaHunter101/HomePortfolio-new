import React from 'react';
import { Card, CardBody, CardHeader, Divider, Progress, Badge } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export function AirQualityCard({ airQualityData }) {
  // Sample data for demonstration
  const sampleAirQualityData = {
    city: "London",
    country: "United Kingdom",
    aqi: 78,
    mainPollutants: {
      pm10: "30 µg/m³",
      pm2_5: "15 µg/m³",
      no2: "40 µg/m³",
      o3: "25 µg/m³",
    },
    airQualityTrends: "Moderate pollution during morning hours and rush hour times.",
  };

  const data = airQualityData || sampleAirQualityData;

  return (
    <Card className=" m-4 p-0 overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{data.city} - Air Quality</h2>
          <p className="text-sm">{data.country}</p>
        </div>
        <Badge color="success" variant="flat">Environment Data</Badge>
      </CardHeader>

      <CardBody className="p-6">
        {/* AQI Level */}
        <div className="mb-4">
          <p className="text-sm font-semibold">Air Quality Index (AQI)</p>
          <p className="text-xl font-bold text-green-600">{data.aqi}</p>
          <Progress
            value={data.aqi}
            color="success"
            className="mt-2"
            max={500}
          />
        </div>

        <Divider />

        {/* Main Pollutants */}
        <div className="mt-4 mb-4">
          <p className="text-sm font-semibold">Main Pollutants</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {Object.entries(data.mainPollutants).map(([pollutant, level], index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon icon="mdi:chemical-weapon" width="24" className="text-green-600" />
                <div>
                  <p className="text-sm font-bold uppercase">{pollutant}</p>
                  <p className="text-sm text-gray-600">{level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Air Quality Trends */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Air Quality Trends</p>
          <p className="text-sm text-gray-700 mt-1">{data.airQualityTrends}</p>
        </div>
      </CardBody>
    </Card>
  );
}
