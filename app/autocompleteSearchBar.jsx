import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import { areAllArraysEmpty } from "@/utils/Helper";
import useStore from "@/store/useStore";

export default function AutocompleteSearch({ properties }) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [selectedTab, setSelectedTab] = useState("1");
  const {clearAllFilter} = useStore()

  const searchPostcode = useCallback(async () => {
    try {
      setIsDataLoading(true);
      clearAllFilter();

      // Fetch results from /listing-search
      const listingResponse = await fetch(`/api/get-postcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });
      const listingResult = await listingResponse.json();

      let mergedResults = {
        uk: [],
        county: [],
        address: [],
        regionName: [],
        housPricesAddress: [] // Initialize with empty array
      };
      console.log("mergedResults", mergedResults);
      

      if (listingResult && !areAllArraysEmpty(listingResult)) {
        mergedResults = { ...listingResult };
      }

      // Fetch results from /get-house-prices
      // const housePriceResponse = await fetch(`/api/search/get-house-prices`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ searchValue: searchTerm }),
      // });
      // const housePriceResult = await housePriceResponse.json();

      // // Merge house price results if they exist
      // if (housePriceResult && housePriceResult.housPricesAddress) {
      //   mergedResults.housPricesAddress = housePriceResult.housPricesAddress;
      // }

      // Set the merged results
      setResults(mergedResults);

    } catch (error) {
      console.error(error);
      setResults(null);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm]);

  

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
    } else if (searchTerm.length >= 2) {
      searchPostcode();
    }
  }, [searchTerm, searchPostcode]);

  const tabVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="mt-4 p-4 rounded-lg w-full overflow-hidden">
     
      <div className="tabs-container flex justify-center ">
        {/* <div className="tabs-wrapper">
          <button
            onClick={() => setSelectedTab("1")}
            className={`tab-button ${selectedTab === "1" ? "active-tab" : ""}`}
          >
            Browse Listings
          </button>
          <button
            onClick={() => setSelectedTab("2")}
            className={`tab-button ${selectedTab === "2" ? "active-tab" : ""}`}
          >
            Instant Home Valuation
          </button>
        </div> */}
      </div>

      
      <motion.div
        key={selectedTab}
        custom={selectedTab === "1" ? 1 : -1}
        variants={tabVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="tab-content-container"
      >
        {selectedTab === "1" ? (
          <div className="search-container max-w-[90vw] w-full mx-auto ">
            <div className="input-wrapper flex items-center w-full p-2 border border-gray-300 rounded bg-white">
              {/* <Icon
                icon="fluent:home-48-filled"
                width="20"
                height="20"
                color="gray"
                className="mr-2"
              /> */}
              <input
                type="text"
                placeholder="Search for any address, city, neighbourhood or postcode"
                className="custom-input flex-1 p-2 border-none outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon icon="akar-icons:search" className="search-icon ml-2 cursor-pointer" />
            </div>
          
            {results && (
              <div>
                <SearchDropdown results={results} isDataLoading={isDataLoading} />
              </div>
            )}
          </div>
        ) : (
          <div className="evaluation-container">
            <div className="input-wrapper large-input">
              {/* <Icon
                icon="fluent:home-48-filled"
                width="20"
                height="20"
                color="gray"
                className="mr-2"
              /> */}
              <input
                type="text"
                placeholder="Enter address"
                className="custom-input"
              />
              <Icon
                icon="bi:info-circle"
                width="20"
                height="20"
                color="gray"
                className="unit-info-icon "
              />
              <button className="get-report-button">Get My Report</button>
            </div>
          </div>
        )}
      </motion.div>

      <style jsx>{`
  .tabs-container {
    display: flex;
    justify-content: center;
  }

  .tabs-wrapper {
    display: flex;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    background-color: #f5f8fa;
    // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); / 3D shadow effect /
  }

  .tab-button {
    flex: 1;
    padding: 6px 15px;
    cursor: pointer;
    border: none;
    background-color: #f5f8fa;
    font-size: 14px;
    color: #666;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); / Tab 3D effect /
  }

  .active-tab {
    background-color: #d8e9f9;
    color: #333;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.3); / Deeper shadow for active tab /
  }

  .tab-content-container {
    padding: 15px;
    border-radius: 0 0 15px 15px;
    background-color: white;
    border-top: 1px solid #ddd;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15); / 3D effect on content /
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); / Input 3D effect /
    transition: box-shadow 0.3s;
  }

  .input-wrapper:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15); / Hover effect /
  }

  .large-input {
    width: 100%;
    padding: 15px;
  }

 

  .custom-input {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 16px;
   

  }

  .search-icon {
    margin-left: 10px;
  }

  .get-report-button {
    padding: 5px 15px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); / 3D button effect /
    transition: box-shadow 0.3s;
  }

  .get-report-button:hover {
    background-color: #000;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); / Hover effect /
  }
`}</style>

    </div>
  );
}
//working