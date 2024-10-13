import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { throttle } from "lodash"; // Import lodash throttle function
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import { areAllArraysEmpty } from "@/utils/Helper";
import useStore from "@/store/useStore";

export default function AutocompleteSearch({ properties }) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [selectedTab, setSelectedTab] = useState("1");
  const { clearAllFilter } = useStore();

  const searchPostcode = useCallback(
    async (term) => {
      try {
        setIsDataLoading(true);
        clearAllFilter();

        // Fetch results from /listing-search
        const listingResponse = await fetch(`/api/get-postcode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: term }), // Use the passed term, not searchTerm
        });
        const listingResult = await listingResponse.json();

        let mergedResults = {
          uk: [],
          county: [],
          address: [],
          regionName: [],
          housPricesAddress: [], // Initialize with empty array
        };

        if (listingResult && !areAllArraysEmpty(listingResult)) {
          mergedResults = { ...listingResult };
        }

        // Set the merged results
        setResults(mergedResults);
      } catch (error) {
        console.error(error);
        setResults(null);
      } finally {
        setIsDataLoading(false);
      }
    },
    [clearAllFilter]
  );

  // Create a stable throttled version of searchPostcode
  const throttledSearchPostcode = useCallback(
    throttle((term) => searchPostcode(term), 1000, { leading: true, trailing: true }), // Leading true to execute immediately
    [searchPostcode]
  );

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
    } else if (searchTerm.length >= 2) {
      throttledSearchPostcode(searchTerm); // Use the throttled version
    }
  }, [searchTerm, throttledSearchPostcode]);

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
      <div className="tabs-container flex justify-center "></div>
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
              <input
                type="text"
                placeholder="Search by location or address"
                className="custom-input flex-1 p-2 border-none outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon
                icon="akar-icons:search"
                className="search-icon ml-2 cursor-pointer"
              />
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
        }

        .active-tab {
          background-color: #d8e9f9;
          color: #333;
          box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.3);
        }

        .tab-content-container {
          padding: 15px;
          border-radius: 0 0 15px 15px;
          background-color: white;
          border-top: 1px solid #ddd;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
          transition: box-shadow 0.3s;
        }

        .input-wrapper:hover {
          box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15);
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
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s;
        }

        .get-report-button:hover {
          background-color: #000;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
