import React, { useState } from "react";
import { Button, Card, CardBody, Image, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatCurrency } from "@/utils/Helper";

const SearchCard = ({ property, setCardHover }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
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
    setIsLiked(!isLiked);
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
              icon={isLiked ? "twemoji:red-heart" : "ant-design:heart-twotone"}
              width="24"
              height="24"
              color={isLiked ? "" : "white"} // Change color based on state
              style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
            />
          </div>
          <div className="absolute top-2 left-2 z-10">listed 4 days ago</div>
          <div className="absolute right-0 bottom-0 z-10">
            <Image
              alt="Property"
              className="h-8 w-10"
              src={property?.developer_logo}
            />
          </div>

          <div className="w-full overflow-hidden rounded-none relative">
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
            <h3 className="font-bold text-2xl">£{humanReadablePrice}</h3>
            {/* <div className="text-sm uppercase flex text-bold">
              <span className="ml-0 text-bold flex justify-center gap-1">
                <Icon icon="mdi:bed-outline" width={16} height={16} />{" "}
                {property?.minBedrooms}
              </span>
              <span className="ml-2 text-bold flex justify-center gap-1">
                <Icon icon="bx:bath" width={16} height={16} />{" "}
                {property?.bathrooms}
              </span>
              <span className="ml-2 text-bold flex justify-center gap-1">
                <Icon icon="carbon:area" width={16} height={16} />{" "}
                {property?.areaSize}
              </span>
            </div> */}
            <div className="flex flex-row ml-[auto] mr-8 space-x-8 mt-2">
              <div className="">
                <h3 className="font-semibold text-xl">
                  {property?.minBedrooms}
                </h3>
                <p className="text-sm text-gray-600">beds</p>
              </div>
              <div className="">
                <h3 className="font-semibold text-xl">{property?.bathrooms}</h3>
                <p className="text-sm text-gray-600">baths</p>
              </div>
              <div className="">
                <h3 className="font-semibold text-xl">
                  {property?.areaSize || "NA"}
                </h3>
                <p className="text-sm text-gray-600">sqft</p>
              </div>
            </div>
            <p className="pt-2 text-default-500 text-sm">
              {property?.fullAddress || property?.address}
            </p>
            <div className="pt-2 flex space-x-2">
              {property?.highlights?.map((highlight, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {highlight?.label}
                </span>
              ))}

              {/* // show ROI, Gross Yield, Rent estimate, Anual cash flow */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="">
                  <div className="text-sm font-semibold text-gray-500">ROI</div>
                  <div className="text-lg font-bold text-gray-900">10%</div>
                </div>
                <div className="">
                  <div className="text-sm font-semibold text-gray-500">
                    Gross Yield
                  </div>
                  <div className="text-lg font-bold text-gray-900">8%</div>
                </div>
                <div className="">
                  <div className="text-sm font-semibold text-gray-500">
                    Rent estimate
                  </div>
                  <div className="text-lg font-bold text-gray-900">$1500</div>
                </div>
                <div className="">
                  <div className="text-sm font-semibold text-gray-500">
                    Anual cash flow
                  </div>
                  <div className="text-lg font-bold text-gray-900">$5000</div>
                </div>
              </div>

              <div className="grid grid-cols-2"></div>

              {/* <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                #bonus room
              </span>
              <span className="bg-gray-200 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                +6 more
              </span> */}
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
