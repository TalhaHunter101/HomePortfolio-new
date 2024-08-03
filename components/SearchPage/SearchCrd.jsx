import React, { useState } from 'react';
import { Button, Card, CardBody, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';

const SearchCard = ({ property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property.imageUris.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === property.imageUris.length - 1 ? 0 : prevIndex + 1
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
              {property.imageUris.map((image, index) => (
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
          <h3 className="text-bold text-2xl">{property.pricing.label}</h3>
          <p className="pt-4 flex items-center space-x-4">
            <span>• Beds: {property.attributes.bedrooms}</span>
            <span>• Baths: {property.attributes.bathrooms}</span>
            <span>• {property.title}</span>
          </p>
          <p className="pt-4 text-default-500">{property.address}</p>
          <p className="text-tiny uppercase font-bold">{property.description}</p>
          {/* <p className="font-bold text-large">{property.title}</p> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
//def