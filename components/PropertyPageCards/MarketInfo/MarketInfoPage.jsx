import { market_info_menu } from "@/public/dummydata/listingData";
import { Card, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";

function MarketInfoPage() {
  const [selectedMarketInfo_menu, setSelectedMarketInfo_menu] =
    useState("Summary");
  return (
    <Card className="m-4" style={{ minHeight: "150px", minWidth: "800px" }}>
      <CardHeader>Market Information</CardHeader>

      <div className="flex flex-row overflow-x-scroll scrollbar-narrow ">
        {market_info_menu?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedMarketInfo_menu(item);
            }}
            className={`transition-all duration-500 ease-in-out cursor-pointer flex-shrink-0 font-semibold  m-4 ${
              selectedMarketInfo_menu === item
                ? "shadow-cardShadow rounded-md bg-gray-200 text-primary"
                : "text-primaryfonts"
            } px-4 py-1`}
          >
            <h2 className="text-sm">{item}</h2>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MarketInfoPage;
