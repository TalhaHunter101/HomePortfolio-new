import React from 'react';
import { Card, CardBody, CardHeader, Divider, Progress, Badge } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export function NoiseDataCard({ noiseData }) {
  // Sample data for demonstration
  const sampleNoiseData = {
    city: "London",
    country: "United Kingdom",
    averageNoiseLevel: "65 dB",
    peakNoiseLevel: "85 dB",
    peakNoiseLocation: "Trafalgar Square",
    commonSources: ["Traffic", "Construction", "Public Events"],
    noiseTrends: "High noise levels during peak hours and weekends.",
  };

  // Use the provided data or fallback to sample data
  const data = noiseData || sampleNoiseData;

  return (
    <Card className="  m-4 p-0 overflow-hidden shadow-lg">
      {/* Header with City and Country */}
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{data.city}</h2>
          <p className="text-sm">{data.country}</p>
        </div>
        <Badge color="secondary" variant="flat">
          Noise Data
        </Badge>
      </CardHeader>

      {/* Body with Noise Details */}
      <CardBody className="p-6">
        {/* Average Noise Level */}
        <div className="mb-4">
          <p className="text-sm font-semibold">Average Noise Level</p>
          <p className="text-xl font-bold text-indigo-600">{data.averageNoiseLevel}</p>
          <Progress
            value={parseInt(data.averageNoiseLevel)}
            color="primary"
            className="mt-2"
            max={100}
          />
        </div>

        <Divider />

        {/* Peak Noise Level and Location */}
        <div className="mt-4 mb-4">
          <p className="text-sm font-semibold">Peak Noise Level</p>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:volume-high" width="24" className="text-indigo-600" />
            <p className="text-lg font-bold">{data.peakNoiseLevel}</p>
          </div>
          <p className="text-sm text-gray-500">Location: {data.peakNoiseLocation}</p>
        </div>

        <Divider />

        {/* Common Noise Sources */}
        <div className="mt-4 mb-4">
          <p className="text-sm font-semibold">Common Noise Sources</p>
          <div className="flex space-x-2 mt-1">
            {data.commonSources.map((source, index) => (
              <Badge key={index} color="primary" variant="flat">
                {source}
              </Badge>
            ))}
          </div>
        </div>

        <Divider />

        {/* Noise Trends */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Noise Trends</p>
          <p className="text-sm text-gray-700 mt-1">{data.noiseTrends}</p>
        </div>
      </CardBody>
    </Card>
  );
}
