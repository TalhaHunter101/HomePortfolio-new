'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { navElements } from '@/public/dummydata/listingData';

export function AirQualityCard({ title, cards, id }) {
  const [currentIndex, setCurrentIndex] = useState(0);
 
  

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
        <div className='border bg-default-white border-subtle-border rounded-md'>
        <div className=" p-4 sm:p-6 lg:flex relative cursor-pointer overflow-hidden rounded-t-lg">
          <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground text-lg">
            <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-green-300">
            <Icon icon="mdi:weather-windy" />
            </div>
            <span>Is the air quality good in East Simi Valley?</span>
          </h2>
          <div className="w-full lg:w-1/2 pr-2 sm:pr-10 relative z-10 max-w-md text-foreground">
            <p>
              The air quality in 93063 was <span className="bg-green-200">good</span> last year, with 1 day when the Air Quality Index exceeded 100.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="mt-4 relative">
          <div className="w-full overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards?.map((card, index) => (
                <div key={index} className="flex-shrink-0  w-full">
                  <div className="mx-2 p-4 bg-white  shadow-none rounded-lg shadow-md" style={{ minHeight: '150px' }}>
                    <div className='flex w-full h-full flex-row'>
                      <div className='w-3/5 justify-start bg-gray-200'>
                       left content
                      </div>
                      <div className='w-2/5 justify-end bg-gray-300'>
                        right right
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
            <Button
              isIconOnly
              variant="ghost"
              radius="full"
              size="sm"
              onClick={handlePrevious}
            >
              <Icon color="gray" icon="bx:bx-chevron-left" width={24} height={24} />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              isIconOnly
              variant="ghost"
              radius="full"
              size="sm"
              onClick={handleNext}
            >
              <Icon color="gray" icon="bx:bx-chevron-right" width={24} height={24} />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        </div>
      </CardBody>
    </Card>
  );
}
