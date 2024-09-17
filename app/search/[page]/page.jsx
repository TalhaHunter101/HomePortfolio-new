"use client";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ShowDataCards from "@/components/ListingSearch/ShowDataCards";
import Beds from "@/components/SearchPage/beds";
import Baths from "@/components/SearchPage/baths";
import Price from "@/components/SearchPage/price";
import Filter from "@/components/SearchPage/filter";
import useStore from "@/store/useStore";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import withClickOutside from "@/components/DropdownHOC";

const SearchDropdownWithClickOutside = withClickOutside(SearchDropdown);

const SearchPage = ({ params }) => {
  const encodedPage = params.page;
  const page = decodeURIComponent(encodedPage.replace(/-/g, " "));
  const [listingData, setListingData] = useState([]);
  const [isnewDataLoading, setisnewDataLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  
  const pageSize = 20;

  const {
    searchTerm,
    setSearchTerm,
    results,
    isDataLoading,
    searchPostcode,
    selectedBeds,
    selectedBaths,
    minPrice,
    maxPrice,
  } = useStore();

  const handleChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      await searchPostcode(searchTerm);
      setIsDropdownOpen(true);
    }
  };

  const fetchEPCData = async (uprn) => {
    try {
      const response = await fetch("/api/indevisual/get-epc-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uprn }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch EPC data");
      }

      const { epcData } = await response.json();

      const address1 = epcData[0]?._source?.ADDRESS1 || "";
      const address2 = epcData[0]?._source?.ADDRESS2 || "";
      const address3 = epcData[0]?._source?.ADDRESS3 || "";
      const postcode = epcData[0]?._source?.POSTCODE || "";
      const town = epcData[0]?._source?.POSTTOWN || "";

      // Combine the addresses to create a full address
      const fullAddress = [address1, address2, address3,postcode, town]
        .filter(Boolean)
        .join(", ");

      return {
        totalFloorArea: epcData[0]?._source?.TOTAL_FLOOR_AREA || null,
        fullAddress,
      };
    } catch (error) {
      console.error(`Error fetching EPC data for UPRN ${uprn}:`, error);
      return null;
    }
  };

  const fetchProperties = useCallback(async () => {
    setisnewDataLoading(true);
    const filters = {
      minPrice,
      maxPrice,
      bedrooms: selectedBeds,
      bathrooms: selectedBaths,
    };

    try {
      const response = await fetch(`/api/search/get-listing-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchValue: page,
          filters,
          currentPage,
          pageSize,
        }),
      });

      const result = await response.json();
      const properties = result?.results || [];

      // Process EPC data if necessary
      const updatedProperties = await Promise.all(
        properties.map(async (property) => {
          const uprn = property?._source?.location?.uprn;
          let epcData = {
            totalFloorArea: null,
            fullAddress: null,
          };

          if (uprn) {
            epcData = await fetchEPCData(uprn);
          }

          return {
            ...property,
            _source: {
              ...property._source,
              totalFloorArea: epcData.totalFloorArea,
              fullAddress: epcData.fullAddress,
            },
          };
        })
      );

      // Replace existing listingData with new data
      setListingData(updatedProperties);
      setTotalCount(result?.totalCount || 0);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setisnewDataLoading(false);
      setIsInitialLoading(false); 
    }
  }, [page, currentPage, minPrice, maxPrice, selectedBeds, selectedBaths]);

  useEffect(() => {
    // Reset listing data when filters change
    setListingData([]);
    setCurrentPage(1);
  }, [minPrice, maxPrice, selectedBeds, selectedBaths]);

  useEffect(() => {
    fetchProperties();
  }, [page, currentPage]);




  return (
    <main className="flex mt-16 flex-col h-screen">
      <div className="w-screen fixed flex bg-content1 z-40 justify-between items-center ">
        <div className="flex items-center p-2 w-full gap-2">
          <Input
            bordered
            type="text"
            value={searchTerm}
            contentLeftStyling={false}
            placeholder={page}
            size="lg"
            className="w-full max-w-md z-40"
            endContent={
              <Icon icon="carbon:close-filled" className="text-2xl" />
            }
            onChange={handleChange} // debounce to reduce API calls
          />
        </div>

        <div className="flex items-center gap-2">
          <Beds />
          <Baths />
          <Price />

          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2 text-white font-semibold"
            auto
            onPress={() => fetchProperties()}
            isLoading={isnewDataLoading}
          >
            Search
          </Button>
        </div>

        <div className="w-[40vw] mx-3 pt-20 absolute top-2">
          {isDataLoading ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-2"
            >
              <Card className="max-h-[50vh] overflow-y-auto py-2">
                <Spinner label="Loading..." color="warning" />
              </Card>
            </motion.div>
          ) : (
            <>
              {isDropdownOpen && results && results?.length !== 0 && (
                <SearchDropdownWithClickOutside
                  results={results}
                  onClose={() => setIsDropdownOpen(false)} // Handle closing of dropdown
                />
              )}
            </>
          )}
        </div>
      </div>

      {isInitialLoading ? (
        <div className="w-screen flex justify-center items-center h-[85vh]">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <ShowDataCards
          totalcount={totalCount}
          cardData={listingData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          isLoading={isnewDataLoading}
        />
      )}
    </main>
  );
};

export default SearchPage;
