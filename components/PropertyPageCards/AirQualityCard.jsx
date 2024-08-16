'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function AirQualityCard({ title, airQuality, cards }) {
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
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="bg-gray-100 border border-subtle-border p-4 sm:p-6 lg:flex relative cursor-pointer overflow-hidden rounded-t-lg">
          <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground text-lg">
            <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" height="1em" fill="currentColor" className="text-foreground">
                <path d="M320 0c17.7 0 32 14.3 32 32V164.1c0 16.4 8.4 31.7 22.2 40.5l9.8 6.2V165.3C384 127 415 96 453.3 96c21.7 0 42.8 10.2 55.8 28.8c15.4 22.1 44.3 65.4 71 116.9c26.5 50.9 52.4 112.5 59.6 170.3c.2 1.3 .2 2.6 .2 4v7c0 49.1-39.8 89-89 89c-7.3 0-14.5-.9-21.6-2.7l-72.7-18.2C414 480.5 384 442.1 384 398V325l90.5 57.6c7.5 4.7 17.3 2.5 22.1-4.9s2.5-17.3-4.9-22.1L384 287.1v-.4l-44.1-28.1c-7.3-4.6-13.9-10.1-19.9-16.1c-5.9 6-12.6 11.5-19.9 16.1L256 286.7 161.2 347l-13.5 8.6c-7.4 4.8-9.6 14.6-4.8 22.1c4.7 7.5 14.6 9.7 22.1 4.9l91.1-58V398c0 44.1-30 82.5-72.7 93.1l-72.7 18.2c-7.1 1.8-14.3 2.7-21.6 2.7c-49.1 0-89-39.8-89-89v-7c0-1.3 .1-2.7 .2-4c7.2-57.9 33.1-119.4 59.6-170.3c26.8-51.5 55.6-94.8 71-116.9c13-18.6 34-28.8 55.8-28.8C225 96 256 127 256 165.3v45.5l9.8-6.2c13.8-8.8 22.2-24.1 22.2-40.5V32c0-17.7 14.3-32 32-32z"></path>
              </svg>
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
                <div key={index} className="flex-shrink-0 w-full">
                  <div className="mx-2 p-4 bg-white rounded-lg shadow-md" style={{ minHeight: '150px' }}>
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
      </CardBody>
    </Card>
  );
}
