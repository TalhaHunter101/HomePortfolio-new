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
  status,
  isFree,
}) => {
  return (
    <Card className="w-full h-[50vh]" shadow="none">
      <CardBody className="p-4 flex flex-col justify-between">
        {/* Charging Location Section */}
        <div className="flex items-start border h-1/2 p-2 rounded-lg shadow bg-green-100 border-green-100 justify-between">
          <div>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">{title1}</p>
            <div className="text-sm text-gray-600">{address1}</div>
            <div className="text-sm text-gray-600">{description1}</div>
            {svgIcon1 && <Image src={svgIcon1} alt="Operator Logo" className="h-10 my-2" />}
            <div className="text-sm text-gray-600 my-2">Connector Type: {type}</div>
            <Chip color="primary">Power Type: {status}</Chip>
            <div className="text-sm text-gray-600 my-2">
              {isFree ? (
                <Chip color="success">Free Charging</Chip>
              ) : (
                <Chip color="warning">Paid Charging</Chip>
              )}
            </div>
          </div>
        </div>

        {/* Operator and Owner Section */}
        <div className="flex items-start  border pt-10 h-1/2 p-2 py-4 rounded-lg shadow bg-green-100 border-green-100 justify-between">
          <div>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">{title2}</p>
            <div className="text-sm text-gray-600">{address2}</div>
            <div className="text-sm text-gray-600">{description2}</div>
            {svgIcon2 && <Image src={svgIcon2} alt="Operator Banner" className="h-10 my-2" />}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItem;
