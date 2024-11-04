"use client";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ShowDataCards from "@/components/ListingSearch/ShowDataCards";
import Beds from "@/components/SearchPage/beds";
import Baths from "@/components/SearchPage/baths";
import Price from "@/components/SearchPage/price";
import useStore from "@/store/useStore";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import withClickOutside from "@/components/DropdownHOC";
import { usePathname } from "next/navigation";
import Filter from "@/components/SearchPage/filter";

const SearchDropdownWithClickOutside = withClickOutside(SearchDropdown);

const SearchPage = ({ params }) => {
  const encodedPage = params.page;  
  const page = decodeURIComponent(encodedPage.split("%3Ftype")[0].replace(/-/g, " "));
  let pathname = usePathname();
  const typeis = pathname.split("=")[1] || "";

  const [listingData, setListingData] = useState([]);
  const [isnewDataLoading, setisnewDataLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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

      const fullAddress = [address1, address2, address3, postcode, town]
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
          type: typeis,
          filters,
          currentPage,
          pageSize,
        }),
      });
  
      const result = await response.json();
      const properties = result?.results || [];

      const updatedProperties = await Promise.all(
        properties.map(async (property) => {
          try {
            const uprn = property?._source?.location?.uprn;
            let epcData = {
              totalFloorArea: null,
              fullAddress: null,
            };
  
            // If `uprn` exists, fetch EPC data, otherwise keep default values
            if (uprn) {
              epcData = await fetchEPCData(uprn);
            }
  
            // Return the updated property data
            return {
              ...property,
              _source: {
                ...property._source,
                totalFloorArea: epcData.totalFloorArea,
                fullAddress: epcData.fullAddress,
              },
            };
          } catch (error) {
            console.error(`Error fetching EPC data for property with UPRN ${property?._source?.location?.uprn}:`, error);
  
            // If there's an error, return the property as it is, without modifying it
            return property;
          }
        })
      );

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
    setListingData([]);
    setCurrentPage(1);
  }, [minPrice, maxPrice, selectedBeds, selectedBaths]);

  useEffect(() => {
    fetchProperties();
  }, [page, currentPage, minPrice, maxPrice, selectedBeds, selectedBaths, fetchProperties]); 
  return (
    <main className="flex mt-16 flex-col h-screen">
      {/* Navbar */}
      <div className="w-screen fixed flex flex-wrap bg-content1 z-40 justify-between items-center p-2">
        {/* Search Input */}
        <div className="flex items-center w-full md:w-auto gap-2">
          <Input
            bordered
            type="text"
            value={searchTerm}
            contentLeftStyling={false}
            placeholder={page}
            size="lg"
            className="w-full max-w-md z-40"
            endContent={<Icon icon="carbon:close-filled" className="text-2xl" />}
            onChange={handleChange}
          />
        </div>

        {/* Filters and Buttons */}
        {/* On large screens */}
        <div className="hidden lg:flex items-center gap-2 mt-2 md:mt-0">
          <Beds />
          <Baths />
          <Price />
          <Filter />
          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2 text-white font-semibold"
            auto
            onClick={() => fetchProperties()}
            isLoading={isnewDataLoading}
          >
            Search
          </Button>
        </div>

        {/* Hamburger Menu for Small Screens */}
        {/* <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => {
              setIsFiltersOpen(!isFiltersOpen);
              console.log("Filters Open State:", isFiltersOpen); 
            }}
            className="text-3xl p-2"
          >
            <Icon icon="mdi:menu" />
          </button>
        </div> */}

        {/* Dropdown */}
        <div className="w-full md:w-[40vw] mx-3 pt-20 absolute top-2">
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
                  onClose={() => setIsDropdownOpen(false)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Filters Section on Small Screens */}
      {isFiltersOpen && (
        <div className="flex flex-wrap items-center gap-2 p-4 bg-content1 z-50 fixed top-[72px] w-full lg:hidden">
          {/* Adjusted 'top' for correct positioning below navbar */}
          <Beds />
          <Baths />
          <Price />
          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2 text-white font-semibold"
            auto
            onClick={() => {
              fetchProperties();
              setIsFiltersOpen(false);
            }}
            isLoading={isnewDataLoading}
          >
            Search
          </Button>
        </div>
      )}

      {/* Main Content */}
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
