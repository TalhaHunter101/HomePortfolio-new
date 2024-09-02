import React, { useState } from "react";
import { Button, Card, CardBody, Image, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const SearchCard = ({ property, setCardHover }) => {
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
    <Card
      className=""
      onMouseEnter={() => {
        setCardHover(property.id)

      }}
    >
      <CardHeader
      className="p-0">
      <div className="relative">
          <div className="w-full overflow-hidden rounded-none">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {property?.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <Image
                  radius="none"
                    src={image?.original}
                    alt={`Property ${index + 1}`}
                    width={600} // Full width
                    height={200}
                    classNames={{ wrapper: "min-w-full" }}
                  />
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
              <Icon
                color="gray"
                icon="bx:bx-chevron-left"
                width={24}
                height={24}
              />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              isIconOnly
              variant="ghost"
              radius="full"
              size="sm"
              onClick={handleNext}
            >
              <Icon
                color="gray"
                icon="bx:bx-chevron-right"
                width={24}
                height={24}
              />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden py-2">
        
        <Link href={`/property/${property.id}`}>
          <div className="p-1">
            <h3 className="text-bold text-2xl">£{property?.maxPrice}</h3>
            <div className="text-sm uppercase font-bold">
              <span className="ml-0  text-bold">
                {property?.minBedrooms} Beds
              </span>
              <span className="ml-2 text-bold">
                | {property?.bathrooms} Baths
              </span>
              <span className="ml-2 text-bold">
                | {property?.squareFeet} Sqft
              </span>
            </div>
            <p className="pt-2 text-default-500 text-sm">{property?.address}</p>
            <p className="text-tiny uppercase font-bold">
              {property?.description}
            </p>

            <div className="pt-1 grid grid-cols-2 gap-4 ">
              <div className="flex items-center p-1  border-l-2 border-l-gray-400">
                {/* <div className="w-1 h-full bg-gray-500 mr-2"></div> */}
                <div>
                  <span className=" text-gray-400 text-xs">Gross Yields:</span>
                  <span className="block text-sm">
                    {property?.grossYields || "NA"}%
                  </span>
                </div>
              </div>
              <div className="flex items-center p-1 border-l-2 border-l-gray-400">
                <div>
                  <span className=" text-gray-400 text-xs">Rent Estimate:</span>
                  <span className="block text-sm">
                    £{property?.rentEstimate || "NA"}
                  </span>
                </div>
              </div>
              <div className="flex items-center p-1 border-l-2 border-l-gray-400">
                <div>
                  <span className="text-gray-400 text-xs">ROI:</span>
                  <span className="block text-sm">{property?.roi || "NA"}%</span>
                </div>
              </div>
              <div className="flex items-center p-1 border-l-2 border-l-gray-400">
                <div>
                  <span className="text-gray-400 text-xs">Cash on Cash:</span>
                  <span className="block text-sm">{property?.cashOnCash || "NA"}%</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
