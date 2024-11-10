import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { throttle } from "lodash";
import useStore from "@/store/useStore";
import { Card, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { usePostcodeStore } from "@/store/neighbourhoodStore";
import Link from "next/link";

export default function AutoCompleteSearchNew({ properties }) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedTab, setSelectedTab] = useState("1");
  const { clearAllFilter } = useStore();
  const { setCurrentPostcode } = usePostcodeStore();

  const searchPostcode = useCallback(
    async (term) => {
      try {
        setIsDataLoading(true);
        clearAllFilter();

        // Fetch results from the new API endpoint
        const response = await fetch(
          `/api/neighbourhood/neighbourhood-search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: term }),
          }
        );
        const result = await response.json();

        // If results are returned, set them directly as an array
        const mergedResults = result;

        // Set the merged results
        setResults(mergedResults);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsDataLoading(false);
      }
    },
    [clearAllFilter]
  );

  // Create a stable throttled version of searchPostcode
  const throttledSearchPostcode = useCallback(
    throttle((term) => searchPostcode(term), 1000, {
      leading: true,
      trailing: true,
    }),
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

  console.log("resultis is", results);

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
              <>
                {isDataLoading && (
                  <Card className="max-h-[50vh] overflow-y-auto py-2">
                    <Spinner label="Loading..." color="warning" />
                  </Card>
                )}

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-2"
                >
                  <Card className="max-h-[50vh] overflow-y-auto py-2">
                    <div className="px-2 ">
                      <div>
                        <div>
                          {results?.outcode?.length !== 0 && (
                            <>
                              <h2>Postcode</h2>

                              {results?.outcode?.map((item, i) => {
                                console.log("outcide", item);
                                const formattedPostcode = item.outcode.replace(
                                  " ",
                                  "-"
                                );
                                return (
                                  <Link
                                    className="flex my-3 cursor-pointer"
                                    key={i}
                                    href={`/neighbourhood-guide/${formattedPostcode}`}
                                    onClick={() => {
                                      setCurrentPostcode(item.outcode);
                                      localStorage.setItem(
                                        "selectedPostcode",
                                        item.outcode
                                      );
                                      setResults([]);
                                    }}
                                  >
                                    <Image
                                      src="/icons/location.svg"
                                      height={20}
                                      width={20}
                                      alt="dev"
                                      className="mx-2"
                                    />
                                    <div>
                                      <p className="text-sm text-primaryfonts">
                                        {item.outcode}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </>
                          )}

                          {results?.district_code?.length !== 0 && (
                            <>
                              <h2>District</h2>

                              {results?.district_code?.map((item, i) => {
                                const formattedPostcode = item.outcode.replace(
                                  " ",
                                  "-"
                                );
                                return (
                                  <Link
                                    className="flex my-3 cursor-pointer"
                                    key={i}
                                    href={`/neighbourhood-guide/${formattedPostcode}`}
                                    onClick={() => {
                                      setCurrentPostcode(item.outcode);
                                      localStorage.setItem(
                                        "selectedPostcode",
                                        item.outcode
                                      );
                                      setResults([]);
                                    }}
                                  >
                                    <Image
                                      src="/icons/location.svg"
                                      height={20}
                                      width={20}
                                      alt="dev"
                                      className="mx-2"
                                    />
                                    <div>
                                      <p className="text-sm text-primaryfonts">
                                        {item.district_code}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </>
                          )}

                          {results?.District_name?.length !== 0 && (
                            <>
                              <h2>District</h2>

                              {results?.District_name?.map((item, i) => {
                                const formattedPostcode = item.outcode.replace(
                                  " ",
                                  "-"
                                );
                                return (
                                  <Link
                                    className="flex my-3 cursor-pointer"
                                    key={i}
                                    href={`/neighbourhood-guide/${formattedPostcode}`}
                                    onClick={() => {
                                      setCurrentPostcode(item.outcode);
                                      localStorage.setItem(
                                        "selectedPostcode",
                                        item.outcode
                                      );
                                      setResults([]);
                                    }}
                                  >
                                    <Image
                                      src="/icons/location.svg"
                                      height={20}
                                      width={20}
                                      alt="dev"
                                      className="mx-2"
                                    />
                                    <div>
                                      <p className="text-sm text-primaryfonts">
                                        {item.District_name}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </>
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
