import { Card, Progress } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";

function RentEstimate({ data, colors }) {
  const { lowerPrice, currentPrice, upperPrice, confidenceLevel, valueChange } =
    data.saleEstimate;
  const progressValue =
    ((currentPrice - lowerPrice) / (upperPrice - lowerPrice)) * 100;

  return (
    <Card className="p-6">
      <div className="flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Estimated Monthly Rent
          </h3>
          <p className="text-sm text-gray-500">
            Based on current market analysis
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary-600" style={{ color: colors.primary }}>
            £{parseInt(currentPrice).toLocaleString()}
          </h2>
          <div className="flex justify-center gap-6 mt-3">
            <div className="flex items-center">
              <Icon icon="mdi:square-foot" className="w-5 h-5 mr-2 text-gray-600" />
              <div>
                <p className="text-sm font-medium">
                  £{(currentPrice / 750).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">per sq.ft.</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icon icon="mdi:bed" className="w-5 h-5 mr-2 text-gray-600" />
              <div>
                <p className="text-sm font-medium">
                  £{(currentPrice / data.attributes.bedrooms).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">per bedroom</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2">
            <p className="text-sm font-medium text-gray-600">Price Range</p>
          </div>
          <Progress 
            value={progressValue} 
            className="mb-4"
            classNames={{
              base: "h-3",
              indicator: "bg-gradient-to-r from-blue-500 to-violet-500",
            }}
          />
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">£{parseInt(lowerPrice).toLocaleString()}</p>
              <p className="text-xs text-gray-500">Minimum</p>
            </div>
            <div className="text-right">
              <p className="font-medium">£{parseInt(upperPrice).toLocaleString()}</p>
              <p className="text-xs text-gray-500">Maximum</p>
            </div>
          </div>
        </div>

        {valueChange && (
          <div className="mt-4 flex items-center justify-center">
            <Icon 
              icon={valueChange?.numericChange > 0 ? "mdi:trending-up" : "mdi:trending-down"} 
              className={`w-5 h-5 mr-2 ${valueChange?.numericChange > 0 ? 'text-green-500' : 'text-red-500'}`}
            />
            <p className="text-sm">
              <span className={valueChange?.numericChange > 0 ? 'text-green-500' : 'text-red-500'}>
                {valueChange?.numericChange > 0 ? '+' : ''}{valueChange?.numericChange}%
              </span>
              {' '}from last year
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default RentEstimate;
