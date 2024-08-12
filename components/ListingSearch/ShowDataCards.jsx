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
    <div className="w-screen flex flex-grow pt-20">
      {/* static */}
      <div className="w-1/2 flex flex-col gap-4 p-4 mb-10 fixed ">
        {toLocation && (
          <Card className="h-[70vh] ">
            <SearchMap
              center={toLocation}
              hovercard={cardHover}
              setfilter={setfilter}
            />
          </Card>
        )}
      </div>
      {/* scrollable */}

      <div className="w-1/2 flex flex-col p-6 overflow-y-auto ml-auto height-full">
        <div className="flex justify-between items-center p-4">
          <h3 className="hidden md:flex text-3xl uppercase font-bold">
            {totalcount} Properties
          </h3>
          <div className="flex space-x-2">
            <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
              hide map
            </Button>
            <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
              sort
            </Button>
          </div>
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

        <div className="grid p-4 grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-full">
          {filter &&
            filter.map((card, index) => (
              // <Link key={index} href={`/property/${card.id}`}>
              <SearchCard key={index} property={card} />
              // </Link>
            ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ShowDataCards;
