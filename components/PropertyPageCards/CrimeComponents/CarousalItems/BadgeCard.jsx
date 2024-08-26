'use client';
import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export const BadgeCard = () => {
  return (
    <Card className="p-4 w-full shadow-none rounded-lg flex flex-col items-center justify-center text-center  border-none" >
      {/* Icon in the center */}
      <div className="relative flex mt-16 justify-center items-center mb-10">
        <Icon icon="mdi:shield-star" width={100} height={100} color="#40c4b5" />
        {/* Decorative stars */}
        <Icon icon="mdi:star-four-points" className="absolute top-0 left-1/4" width={12} height={12} color="#b2ece1" />
        <Icon icon="mdi:star-four-points" className="absolute bottom-0 right-1/4" width={16} height={16} color="#b2ece1" />
      </div>
      {/* Text content */}
      <h1 className="mb-2 pb-2 text-xl font-bold" size={14} color="#4a4a4a">
        <Icon className='inline' icon="mdi:trending-down" width={16} height={16} color="#4a4a4a" /> Crime <span style={{ color: '#40c4b5' }}>decreased</span> by <span style={{ color: '#40c4b5' }}>11.5%</span> during last 3 months
      </h1>
    </Card>
  );
};
