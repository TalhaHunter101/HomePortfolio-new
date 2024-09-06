import React, { useState } from "react";
import { Button, Card, CardBody, Image, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatCurrency } from "@/utils/Helper";

const SearchCard = ({ property, setCardHover }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // State to track the heart icon
  const maxPrice = property?.maxPrice;
  const humanReadablePrice = formatCurrency(maxPrice);

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

  const handleLikeToggle = () => {
    setIsLiked(!isLiked); // Toggle the liked state
  };

  return (
    <Card
      className=""
      onMouseEnter={() => {
        setCardHover(property.id);
      }}
    >
      <CardHeader className="p-0 relative">
        {/* Wrapper for positioning */}
        <div className="relative">
          {/* Heart Icon */}
          <div className="absolute top-2 right-2 z-10">
            <Icon
              onClick={handleLikeToggle} // Toggle like on click
              icon={ isLiked ? "twemoji:red-heart" : "ant-design:heart-twotone"}
              width="24"
              height="24"
              color={isLiked ? "" : "white"} // Change color based on state
              style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
            />
          </div>

          <div className="w-full overflow-hidden rounded-none">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {property?.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <Link href={`/property/${property.id}`}>
                    <Image
                      radius="none"
                      src={image?.original}
                      alt={`Property ${index + 1}`}
                      width={600} // Full width
                      height={200}
                      classNames={{ wrapper: "min-w-full" }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
            <Button
              isIconOnly
              variant="flat"
              radius="full"
              size="sm"
              onClick={handlePrevious}
            >
              <Icon
                color="white"
                icon="bx:bx-chevron-left"
                width={24}
                height={24}
              />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              isIconOnly
              variant="flat"
              radius="full"
              size="sm"
              onClick={handleNext}
            >
              <Icon
                color="white"
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
            <h3 className="text-bold text-2xl">£{humanReadablePrice}</h3>
            <div className="text-sm uppercase font-bold">
              <span className="ml-0 text-bold">
                &bull; {property?.minBedrooms} Beds
              </span>
              <span className="ml-2 text-bold">
                &bull; {property?.bathrooms} Baths
              </span>
              <span className="ml-2 text-bold">
                &bull; {property?.squareFeet} Sqft
              </span>
            </div>
            <p className="pt-2 text-default-500 text-sm">{property?.address}</p>
            <div className="pt-2 flex space-x-2">
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                #bonus room
              </span>
              <span className="bg-gray-200 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                +6 more
              </span>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
