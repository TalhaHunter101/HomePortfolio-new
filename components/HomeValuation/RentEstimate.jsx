import { Card, Progress } from "@nextui-org/react";
import React from "react";

function RentEstimate({ data }) {
  const { lowerPrice, currentPrice, upperPrice, confidenceLevel, valueChange } =
    data.saleEstimate;
  const progressValue =
    ((currentPrice - lowerPrice) / (upperPrice - lowerPrice)) * 100;

  return (
    <Card className="p-4 flex-1">
      <div className="flex flex-col items-center text-center">
        <p h4 css={{ color: "#17C964", mb: "£5" }}>
          Estimated Monthly Rent
        </p>
        <p h2 css={{ mb: "$4" }}>
          £{parseInt(currentPrice).toLocaleString()}
        </p>
        <div className="flex justify-center space-x-8 mb-4">
          <div>
            <p size={14}>£{(lowerPrice / 750).toFixed(2)}</p>
            <p size={12} color="gray">
              per sq.ft.
            </p>
          </div>
          <div>
            <p size={14}>£{(upperPrice / 750).toFixed(2)}</p>
            <p size={12} color="gray">
              per bedroom
            </p>
          </div>
        </div>
        <div className="w-full">
          <Progress value={progressValue} color="primary" className="mb-4" />
          <div className="flex justify-between text-sm">
            <div>
              <p>£{parseInt(lowerPrice).toLocaleString()}</p>
              <p size={12} color="gray">
                £{(lowerPrice / 750).toFixed(2)} /sq.ft.
              </p>
            </div>
            <div>
              <p>£{parseInt(upperPrice).toLocaleString()}</p>
              <p size={12} color="gray">
                £{(upperPrice / 750).toFixed(2)} /sq.ft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RentEstimate;
