
import React from "react";
import { Button } from "@nextui-org/react";

const bedroomCounts = ["1", "2", "3", "4", "5", "6", "7+"];

const Step2 = ({ onBedroomSelect }) => (
  <div className="flex flex-col items-center">
    <p className="text-center text-lg text-default-700  mb-4">
      How many <strong>bedrooms</strong> are in your home?
    </p>
    <div className="flex     gap-4">
      {bedroomCounts.map((count) => (
        <Button
          radius="md"
          variant="ghost"
          color="secondary"
          key={count}
          bordered
          className="w-full"
          onClick={() => onBedroomSelect(count)}
        >
          {count}
        </Button>
      ))}
    </div>
  </div>
);

export default Step2;
