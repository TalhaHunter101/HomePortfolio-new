import React, { useState } from "react";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const SearchCard = ({ property }) => {  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card className="py-4">
      <CardBody className="overflow-hidden py-2">
        <div className="relative">
          <div className="w-full overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {property?.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <Image
                    src={image}
                    alt={`Property ${index + 1}`}
                    width="100%" // Full width
                    height={200}
                    className="object-cover w-full h-full" // Ensure the image covers the container
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
            <Button size="sm" variant="light" onClick={handlePrevious}>
              <Icon icon="bx:bx-chevron-left" width={24} height={24} />
              <span className="sr-only">Previous</span>
            </Button>
            <Button size="sm" variant="light" onClick={handleNext}>
              <Icon icon="bx:bx-chevron-right" width={24} height={24} />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-bold text-2xl">
            {property?.maxPrice}
            <span className="ml-4 text-xl text-bold">
              | {property?.bedrooms} Beds |
            </span>
            <span className="ml-4 text-xl text-bold">
              | {property?.bathrooms} Baths |
            </span>
            <span className="ml-4 text-xl text-bold">
              {property?.squareFeet} Sqft
            </span>
          </h3>
          <p className="pt-4 text-default-500">{property?.address}</p>
          <p className="text-tiny uppercase font-bold">
            {property?.description}
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center p-2 rounded-lg">
              <div className="w-1 h-full bg-gray-500 mr-2"></div>
              <div>
                <span className=" text-gray-400 font-bold">Gross Yields:</span>
                <span className="block">{property?.grossYields}%</span>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-lg">
              <div className="w-1 h-full bg-gray-500 mr-2"></div>
              <div>
                <span className=" text-gray-400 font-bold">Rent Estimate:</span>
                <span className="block">£{property?.rentEstimate}</span>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-lg">
              <div className="w-1 h-full bg-gray-500 mr-2"></div>
              <div>
                <span className="text-gray-400 font-bold">ROI:</span>
                <span className="block">{property?.roi}%</span>
              </div>
            </div>
            <div className="flex items-center p-2 rounded-lg">
              <div className="w-1 h-full bg-gray-500 mr-2"></div>
              <div>
                <span className="text-gray-400 font-bold">Cash on Cash:</span>
                <span className="block">{property?.cashOnCash}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
