
import React from "react";
import { Button } from "@nextui-org/react";

const propertyTypes = [
  "Detached",
  "Semi Detached",
  "Freehold Townhouse",
  "Condo Townhouse",
  "Condominium",
  "Multiplex",
  "Vacant Land",
  "Other",
];

const Step2 = ({ onPropertyTypeSelect }) => (
  <div className="flex flex-col items-center">
    <p className="text-center text-lg text-default-700  mb-4">
      I&#39;ll need to know some more details about your home to make an accurate prediction. Please select a <strong>property type</strong> from the options below:
    </p>
    <div className="grid grid-cols-3 gap-4">
      {propertyTypes.map((type) => (
        <Button
          radius="md"
          variant="ghost"
          color="secondary"
          key={type}
          bordered
          className="w-full"
          onClick={() => onPropertyTypeSelect(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  </div>
);

export default Step2;
