import React from "react";
import { Card, CardBody, Chip, Image } from "@nextui-org/react";

const CardItem = ({
  title1,
  address1,
  description1,
  svgIcon1,
  title2,
  address2,
  description2,
  svgIcon2,
  type,
  status
}) => {
  return (
    <Card className="w-full h-[50vh]" shadow="none">
      <CardBody className="p-4 flex flex-col justify-between">
        {/* First Section */}
        <div className="flex items-start  border h-1/2 p-2 rounded-lg shadow bg-green-100 border-green-100 justify-between">
          <div className="">
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              {title1}
            </p>
            <div className="text-sm text-gray-600">{address1}</div>
            <div className="text-sm text-gray-600">{description1}</div>
            <Image src="/icons/charging.svg" alt="SVG Icon" className="h-10" />
            <div className="text-sm text-gray-600 my-2">{type}</div>
            <Chip color="primary">{status}</Chip>
            <div className="flex mb-2 flex-col items-center">
              {/*  Icon for chargers */}
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex items-start mt-2 border h-1/2 p-2 rounded-lg shadow bg-green-100 border-green-100 justify-between">
          <div>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              {title2}
            </p>
            <div className="text-sm text-gray-600">{address2}</div>
            <div className="text-sm text-gray-600">{description2}</div>
              <Image src="/icons/charging.svg" alt="SVG Icon" className="h-10" />
            <div className="text-sm text-gray-600 my-2">{type}</div>
            <Chip color="primary">{status}</Chip>
            <div className="flex flex-col items-center">
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItem;
