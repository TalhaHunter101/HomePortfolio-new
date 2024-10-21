import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

const neighborhoods = [
  'Old Trafford',
  'Altrichan',
  'Salford',
  'Stockport',
  'Bury',
  'Bolton',
  'Rochdale',
];

const postcodes = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M25'];

function NeighbourhoodCard() {
  return (
    <Card className="m-4 p-0 overflow-hidden">
      <CardBody className="grid grid-cols-2 text-left gap-4">
        {/* Left Column: Popular Neighbourhoods */}
        <div>
          <h2 className="font-bold text-xl mb-4 text-purple-500">Popular Neighbourhoods in Manchester</h2>
          <ul className="space-y-2 text-gray-700">
            {neighborhoods.map((neighbourhood, index) => (
              <li key={index} className="text-lg font-semibold">
                {neighbourhood}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Postcodes */}
        <div>
          <h2 className="font-bold text-xl mb-4 text-purple-500">Postcodes in Manchester</h2>
          <ul className="space-y-2 text-gray-700">
            {postcodes.map((postcode, index) => (
              <li key={index} className="text-lg font-semibold">
                {postcode}
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}

export default NeighbourhoodCard;
