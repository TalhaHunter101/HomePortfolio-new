import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchMap } from "../Maps/index";
import Footer from "../common/Footer/Footer";
import SearchCard from "../SearchPage/SearchCrd";
import Link from "next/link";
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
      const { bedrooms, bathrooms, livingRooms } = property?.attributes;
      const price = parseInt(property?.pricing?.value);
      const images = property?.imageUris;
      const id = property?.listingId;
      const description = property?.description;

      groupedData.push({
        id: id,
        branch_name: property?.agent?.branchName,
        description: description,
        development_address: property?.address,
        minBedrooms: bedrooms,
        minPrice: price,
        maxBedrooms: bedrooms,
        bathrooms: bathrooms,
        maxPrice: price,
        images: images,
        developer_logo: property?.agent?.logoUri,
        developer_name: property?.agent?.name,
        postcode: property?.postcode,
        address: property?.address,
        lng: parseFloat(property?.location?.coordinates?.longitude),
        lat: parseFloat(property?.location?.coordinates?.latitude),
      });
    });
    const uniqueDevelopmentData = Object.values(groupedData);
    setToLocation(uniqueDevelopmentData);
    setfilter(uniqueDevelopmentData);
  };

  useEffect(() => {
    getPropsData();
  }, [cardData]);

  console.log(filter, "filter");

  return (
    <div className="w-screen flex flex-grow pt-12">
      {/* static */}
      <div className="w-3/5 flex flex-col gap-4 p-4  fixed ">
        {toLocation && (
          <motion.div className="w-full"         
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay:  0.5 }}>
          <Card className="h-[100vh] rounded-none ">
            <SearchMap
              center={toLocation}
              hovercard={cardHover}
              setfilter={setfilter}
            />
          </Card>
          </motion.div>
        )}
      </div>
      {/* scrollable */}
      <motion.div className="w-full"         
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay:  0.6 }}>
<div className="h-[100vh] overflow-y-scroll" >
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

        {/* <div className="flex justify-between items-center p-4 w-full">
          <ButtonGroup
            radius="sm"
            size="lg"
            className="w-full border-default-300"
          >
            <Button className="flex-1">Homes</Button>
            <Button className="flex-1">Neighborhood</Button>
          </ButtonGroup>
        </div> */}

          <div className="grid p-4 grid-cols-1 md:grid-cols-1 2xl:grid-cols-2 gap-4 overflow-y-auto max-h-full">
          {filter &&
            filter.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SearchCard property={card} />
              </motion.div>
            ))}
        </div>
        {/* <Footer /> */}
      </div>
</div>
    
    </motion.div>
    </div>
  );
}

export default ShowDataCards;
