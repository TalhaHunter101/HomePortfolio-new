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

const defaultProps = {
  lat: Number(23.079727),
  lng: Number(77.37855),

  zoom: 13,
};

function ShowDataCards({ cardData }) {
  const [cardHover, setCardHover] = useState(null);
  const [filter, setfilter] = useState();
  const [toLocation, setToLocation] = useState("");

  const getPropsData = () => {
    const groupedData = [];
    cardData.forEach((property) => {

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
        maxPrice: price,
        images: images[0],
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
  }, []);

  return (
    <div className="w-screen flex flex-grow pt-20">
      {/* static */}
      <div className="w-1/2 flex flex-col gap-4 p-4 mb-10 fixed ">
        <Card className="h-[70vh] ">
          <SearchMap
            center={toLocation}
            hovercard={cardHover}
            setfilter={setfilter}
          />
        </Card>
      </div>
      {/* scrollable */}

      <div className="w-1/2 flex flex-col p-6 overflow-y-auto ml-auto height-full">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-3xl uppercase font-bold">35000+ Properties</h3>
          <div className="flex space-x-2">
            <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
              hide map
            </Button>
            <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
              sort
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 w-full">
          <ButtonGroup
            radius="sm"
            size="lg"
            className="w-full border-default-300"
          >
            <Button className="flex-1">Homes</Button>
            <Button className="flex-1">Neighborhood</Button>
          </ButtonGroup>
        </div>

        <div className="grid p-4 grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-full">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="py-4"
              onMouseEnter={() => setCardHover(card?.id)}
              // onMouseLeave={() => setCardHover(null)}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  {card.description}
                </p>
                <small className="text-default-500">{card.address}</small>
                <h4 className="font-bold text-large">{card.title}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt={`Card background for ${card.title}`}
                  className="object-cover rounded-xl"
                  src={card.imageUris[0]}
                  width={270}
                />
              </CardBody>
            </Card>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ShowDataCards;
