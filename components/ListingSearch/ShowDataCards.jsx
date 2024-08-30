import {
  Button,
  Card,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchMap } from "../Maps/index";
import SearchCard from "../SearchPage/SearchCrd";
import { motion } from "framer-motion";

const defaultProps = {
  lat: Number(23.079727),
  lng: Number(77.37855),

  zoom: 13,
};

function ShowDataCards({ cardData, totalcount }) {
  const [cardHover, setCardHover] = useState(null);
  const [filter, setfilter] = useState();
  const [toLocation, setToLocation] = useState("");

  const getPropsData = () => {
    const groupedData = [];
    cardData?.forEach((property) => {
      const { numBedrooms, numBathrooms, numLivingRooms } = property?._source?.counts;
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
    setfilter(uniqueDevelopmentData);
  };

  useEffect(() => {
    getPropsData();
  }, [cardData]);
  

  return (
    <div className="w-screen    flex flex-grow pt-12">
      {/* static */}
      <div className="w-3/5 flex flex-col gap-4 p-4  h-full fixed ">
        {toLocation && (
          <motion.div
            className="w-full h-full "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Card className=" h-full rounded-none ">
              <SearchMap
                center={toLocation}
                hovercard={cardHover}
                setfilter={setfilter}
                height={"100vh"}
              />
            </Card>
          </motion.div>
        )}
      </div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="h-[100vh]  ">
          <div className="w-2/5 flex flex-col p-6  ml-auto">
            <h3 className="text-md uppercase font-bold ">
              {totalcount} Properties
            </h3>

            <div className="flex space-x-2 p-4">
              <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
                hide map
              </Button>
              <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
                sort
              </Button>
            </div>
            <div className="grid p-4 grid-cols-1 md:grid-cols-1 2xl:grid-cols-2 gap-4 overflow-y-auto max-h-full">
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ShowDataCards;
