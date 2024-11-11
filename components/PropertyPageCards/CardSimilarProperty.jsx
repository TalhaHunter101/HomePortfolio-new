import { formatCurrency, timeAgo } from "@/utils/Helper";
import { Icon } from "@iconify/react";
import { Button, Image, Link } from "@nextui-org/react";
import React, { useState } from "react";

function CardSimilarProperty({ property }) {
    console.log("property is",property);
    
  const [currentIndex, setCurrentIndex] = useState(0);


  // Function to go to the previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property._source?.propertyImage - 1 : prevIndex - 1
    );
  };

  // Function to go to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === property._source?.propertyImage - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="relative">
      <div className="absolute top-2 left-2 z-10 flex">
        <span className="bg-[#fdfdfdb5] px-2 rounded-md text-sm">
          {timeAgo(property?._source?.publishedOn)}
        </span>
      </div>
      <div className="absolute right-0 bottom-0 z-10">
        <Image
          alt="Property"
          className="h-8 w-10 rounded-none"
          src={property?._source?.branch?.logoUrl}
        />
      </div>
      <div className="w-full overflow-hidden rounded-none relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {property?._source?.propertyImage?.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Link
                href={{
                  pathname: `/property/${String(property?._source?.adTargeting?.displayAddress || "")
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/,/g, "")}?id=${property?.id}`,
                }}
              >
                <Image
                  radius="none"
                  src={image?.original}
                  alt={`Property ${index + 1}`}
                  width={600}
                  height={160}
                  classNames={{
                    wrapper: "min-w-full",
                  }}
                />
              </Link>
            </div>
          ))}
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

      <div className="overflow-hidden py-2">
        <Link
          href={{
            pathname: `/property/${String(
              property?._source?.adTargeting?.displayAddress || ""
            )
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/,/g, "")}?id=${property?.id}`,
          }}
        >
          <div className="p-1">
            <p className="font-bold text-2xl">
              £
              {formatCurrency(
                property?._source?.analyticsTaxonomy?.priceActual
              )}
            </p>
            <div className="flex flex-row ml-[auto] mr-8 space-x-8 mt-2">
              <div>
                <p className="font-semibold text-xl">
                  {property?._source.counts?.numBedrooms || 0}
                </p>
                <p className="text-sm text-gray-600">beds</p>
              </div>
              <div>
                <p className="font-semibold text-xl">
                  {property?._source.counts?.numBathrooms || 0}
                </p>
                <p className="text-sm text-gray-600">baths</p>
              </div>
              <div>
                <p className="font-semibold text-xl">
                  {property?._source.analyticsTaxonomy?.sizeSqFeet
                    ? formatCurrency(
                        property?._source.analyticsTaxonomy?.sizeSqFeet
                      )
                    : "NA"}
                </p>
                <p className="text-sm text-gray-600">sqft</p>
              </div>
            </div>
            <h2 className="pt-2 text-default-500 text-sm">
              {property?._source?.adTargeting?.displayAddress}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardSimilarProperty;
