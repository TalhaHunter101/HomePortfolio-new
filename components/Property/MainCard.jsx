'use client';
import React, { useState } from "react";
import { Card, Image, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const MainCard = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card className="w-full h-full p-0 overflow-hidden rounded-md">
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width="100%"
                height={415}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
        isIconOnly
        variant="ghost"
        radius="full"
        size="sm"
          auto
          className="absolute left-2 bg-transparent hover:bg-default top-1/2 transform -translate-y-1/2"
          onClick={handlePrevious}
        >
           <Icon color="gray" icon="bx:bx-chevron-left" width={24} height={24} />
           <span className="sr-only">Next</span>
        </Button>
        <Button
        isIconOnly
        variant="ghost"
        radius="full"
        size="sm"
          auto
          className="absolute right-2 bg-  top-1/2 transform -translate-y-1/2"
          onClick={handleNext}
        >
          <Icon color="gray" icon="bx:bx-chevron-right" width={24} height={24} />
          <span className="sr-only">Next</span>
        </Button>
        <Button
        variant="flat"
        radius="sm"
          auto
          className="absolute  right-5 howver:bg-default  bottom-1 transform -translate-y-1/2"
          startContent={<Icon width={24} height={24} icon="material-symbols:imagesmode-outline" />}
          >
            <p className="text-lg">See all 50 photos</p>
        </Button>
      </div>
    </Card>
  );
};

export default MainCard;
