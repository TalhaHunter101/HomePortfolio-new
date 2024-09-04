import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import SearchCard from "@/components/SearchPage/SearchCrd";
import { SearchMap } from "@/components/Maps";

const HomesForSaleMap = ({ center, nearByListingsData }) => {
  const [cardHover, setCardHover] = useState(null);
  const [filter, setFilter] = useState();
  const [toLocation, setToLocation] = useState("");

  const getPropsData = () => {
    const groupedData = [];
    nearByListingsData?.forEach((property) => {
      const { numBedrooms, numBathrooms } = property?._source?.counts;
      const price = parseInt(property?._source?.analyticsTaxonomy?.priceActual);
      const images = property?._source?.propertyImage;
      const id = property?._source?.listingId;
      const description = property?._source?.summaryDescription;

      groupedData.push({
        id: id,
        branch_name: property?._source?.branch?.name,
        description: description,
        development_address: property?._source?.address,
        minBedrooms: numBedrooms,
        minPrice: price,
        maxBedrooms: numBedrooms,
        bathrooms: numBathrooms,
        maxPrice: price,
        images: images,
        developer_logo: property?._source?.branch?.logoUrl,
        developer_name: property?._source?.branch?.name,
        postcode: property?._source?.ref_postcode,
        address: property?._source?.analyticsTaxonomy?.displayAddress,
        lng: parseFloat(property?._source?.location?.coordinates?.longitude),
        lat: parseFloat(property?._source?.location?.coordinates?.latitude),
      });
    });
    const uniqueDevelopmentData = Object.values(groupedData);
    setToLocation(uniqueDevelopmentData);
    setFilter(uniqueDevelopmentData);
  };

  useEffect(() => {
    getPropsData();
  }, [nearByListingsData]);

  return (
    <div className="relative h-[80vh] w-full">
      {/* Cards Section */}
      <div className="absolute top-4 left-4  p-4 w-[300px] max-h-[70vh] overflow-y-auto z-[100] scrollbar-hide">
        {filter &&
          filter.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SearchCard property={card} setCardHover={setCardHover} />
            </motion.div>
          ))}
      </div>

      {/* Map Section */}
      <div className="absolute inset-0 z-0">
        {toLocation && (
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Card className="h-full rounded-none">
              <SearchMap
                center={toLocation}
                hovercard={cardHover}
                setfilter={setFilter}
              />
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomesForSaleMap;
