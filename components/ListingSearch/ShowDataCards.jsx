import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchMap } from "../Maps/index";
import SearchCard from "../SearchPage/SearchCrd";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { convertToSquareFeet } from "@/utils/Helper";

const defaultProps = {
  lat: Number(23.079727),
  lng: Number(77.37855),
  zoom: 13,
};

function ShowDataCards({ cardData, totalcount }) {
  const [cardHover, setCardHover] = useState(null);
  const [filter, setFilter] = useState([]);
  const [toLocation, setToLocation] = useState("");
  const [showMap, setShowMap] = useState(true); // Toggle map visibility
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order state

  const getPropsData = () => {
    const groupedData = [];
    cardData?.forEach((property) => {
      const { numBedrooms, numBathrooms, numLivingRooms } =
        property?._source?.counts;
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
        areaSize: property?._source?.analyticsTaxonomy?.sizeSqFeet || convertToSquareFeet(property?._source?.totalFloorArea),
        fullAddress: property?._source?.fullAddress,
        address: property?._source?.analyticsTaxonomy?.displayAddress,
        lng: parseFloat(property?._source?.location?.coordinates?.longitude),
        lat: parseFloat(property?._source?.location?.coordinates?.latitude),

      });
    });
    const uniqueDevelopmentData = Object.values(groupedData);
    setToLocation(uniqueDevelopmentData);
    setFilter(uniqueDevelopmentData); // Set initial filter data
  };

  const sortData = () => {
    const sortedData = [...filter].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.minPrice - b.minPrice;
      } else {
        return b.minPrice - a.minPrice;
      }
    });
    setFilter(sortedData); // Update the filtered data with sorted results
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  useEffect(() => {
    getPropsData();
  }, [cardData]);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Sort by"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = (openState) => {
    setIsOpen(openState);
  };

  return (
    <div className="w-screen flex flex-grow pt-12">
      {/* Map Section */}
      <div className="w-3/5 flex flex-col gap-4 p-4 h-full fixed">
        {showMap && toLocation && (
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
                height={"100vh"}
              />
            </Card>
          </motion.div>
        )}
      </div>

      {/* Card List Section */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="h-[100vh]">
          <div
            className={`${
              showMap ? "w-[40%]" : "w-full"
            } flex flex-col p-6 ml-auto`}
          >
            <h3 className="text-md uppercase font-bold">
              {totalcount} Properties
            </h3>

            <div className="flex space-x-2 p-4">
              <Button
                radius="sm"
                size="lg"
                className="w-full max-w-xs"
                auto
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "Hide Map" : "Show Map"}
              </Button>
              <Dropdown onOpenChange={handleToggle}>
                <DropdownTrigger>
                  <Button
                    endContent={
                      <Icon
                        icon={
                          isOpen ? "ph:caret-up-fill" : "ph:caret-down-fill"
                        }
                      />
                    }
                    radius="sm"
                    size="lg"
                    className="w-full max-w-xs"
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort by selection"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  // onClick={sortData}
                >
                  <DropdownItem key="roi">Sort by ROI</DropdownItem>
                  <DropdownItem key="  price">Sort by Price</DropdownItem>
                  <DropdownItem key="nil">none</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Cards */}
            <div
              className={`grid p-4 grid-cols-1 md:grid-cols-1 ${
                showMap ? "2xl:grid-cols-2" : "2xl:grid-cols-4"
              } gap-4 overflow-y-auto max-h-full`}
            >
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
