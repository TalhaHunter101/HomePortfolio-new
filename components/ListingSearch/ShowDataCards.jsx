import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SearchMap } from "../Maps/index";
import SearchCard from "../SearchPage/SearchCrd";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { convertToSquareFeet } from "@/utils/Helper";
import pb from "@/lib/pocketbase";

function ShowDataCards({
  cardData,
  totalcount,
  currentPage,
  setCurrentPage,
  pageSize,
  isLoading,
  isFavorite,
}) {
  const [cardHover, setCardHover] = useState(null);
  const [filter, setFilter] = useState([]);
  const [toLocation, setToLocation] = useState("");
  const [showMap, setShowMap] = useState(!isFavorite);
  const [sortOrder, setSortOrder] = useState("asc");
  const [likedProperties, setLikedProperties] = useState([]);

  useEffect(() => {
    const fetchLikedProperties = async () => {
      try {
        const userData = JSON.parse(localStorage?.getItem("pocketbase_auth"));
        if (userData && userData?.token) {
          // Disable auto-cancellation for this request by setting autoCancel to false
          const response = await pb.collection("favorite").getFullList({
            filter: `userId='${userData.model.id}'`,
            $autoCancel: false, // This prevents the request from being cancelled
          });
          const likedPropertyIds = response.map((fav) => fav.property_id);
          setLikedProperties(likedPropertyIds);
        }
      } catch (error) {
        console.error("Error fetching liked properties:", error);
      }
    };
    fetchLikedProperties();
  }, []);

  const sortData = () => {
    const sortedData = [...filter].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.minPrice - b.minPrice;
      } else {
        return b.minPrice - a.minPrice;
      }
    });
    setFilter(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const getPropsData = () => {
      const groupedData = [];
      cardData?.forEach((property) => {
        const { numBedrooms, numBathrooms } = property?._source?.counts;
        const price = parseInt(
          property?._source?.analyticsTaxonomy?.priceActual
        );
        const images = property?._source?.propertyImage;
        const id = property?._source?.listingId;
        const description = property?._source?.summaryDescription;

        // Calculate total price change
        const priceChanges =
          property?._source?.priceHistory?.priceChanges || [];
        const totalPriceChange = priceChanges.reduce((acc, change) => {
          const priceChangeLabel = change?.priceChangeLabel || "£0";
          const numericValue = parseFloat(
            priceChangeLabel.replace(/[£,]/g, "") // remove '£' and commas
          );
          return acc + numericValue;
        }, 0);

        // Format the total price change
        const formattedPriceChange =
          totalPriceChange > 0
            ? `${(totalPriceChange / 1000).toFixed(0)}k drop`
            : "No price change";

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
          areaSize:
            property?._source?.analyticsTaxonomy?.sizeSqFeet ||
            convertToSquareFeet(property?._source?.totalFloorArea),
          fullAddress: property?._source?.fullAddress,
          address: property?._source?.analyticsTaxonomy?.displayAddress,
          lng: parseFloat(property?._source?.location?.coordinates?.longitude),
          lat: parseFloat(property?._source?.location?.coordinates?.latitude),
          date: property?._source?.publishedOn,
          totalPriceChange: formattedPriceChange,
          displayAddress: property?._source?.analyticsTaxonomy?.displayAddress,
        });
      });
      const uniqueDevelopmentData = Object.values(groupedData);
      setToLocation(uniqueDevelopmentData);
      setFilter(uniqueDevelopmentData);
    };

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
    <div className="w-screen flex flex-grow pt-16">
      {/* Map Section */}
      { !isFavorite &&   showMap && (
        <div className="hidden lg:flex w-full lg:w-3/5 flex-col gap-4 p-4 h-full fixed">
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
                  height={"100vh"}
                  key={currentPage}
                />
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* Card List Section */}
      <motion.div
        className={`w-full ${showMap ? "lg:ml-[60%]" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="h-full">
          <div className="flex flex-col p-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center hidden md:block">
              <h1 className="text-md uppercase font-bold mb-2 md:mb-0">
                {totalcount} Properties
              </h1>

              {
                !isFavorite && (
                  <div className="flex space-x-2">
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
                    >
                      <DropdownItem key="roi">Sort by ROI</DropdownItem>
                      <DropdownItem key="price">Sort by Price</DropdownItem>
                      <DropdownItem key="nil">None</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                )
              }
             
            </div>

            {/* Cards */}
            <div className="relative mt-4">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                  <Spinner color="primary" size="lg" />
                </div>
              )}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-${
                  showMap ? "1" : "4"
                } xl:grid-cols-${
                  showMap ? "1" : "5"
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
                      <SearchCard
                        property={card}
                        setCardHover={setCardHover}
                        isLiked={likedProperties.includes(card.id)}
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Pagination */}
            {totalcount > pageSize && (
              <div className="flex justify-center mt-4">
                <Pagination
                  total={Math.ceil(totalcount / pageSize)}
                  page={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ShowDataCards;
