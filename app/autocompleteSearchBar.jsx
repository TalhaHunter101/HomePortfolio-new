import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
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
      clearAllFilter()
      const response = await fetch(`/api/search/listing-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue: searchTerm }),
      });
      const postcodeResult = await response.json();

      if (postcodeResult && !areAllArraysEmpty(postcodeResult)) {
        setResults(postcodeResult);
      } else {
        setResults(null);
      }
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
    <div className="mt-4 bg-white shadow p-4 rounded-lg w-full overflow-hidden">
      <Tabs
        color="primary"
        initialValue="1"
        onChange={(tabKey) => setSelectedTab(tabKey)}
        selectedValue={selectedTab}
        className="flex rounded-lg justify-center"
      >
        <Tab key="1" title="Browse Listings">
          <div className="p-4">
            <motion.div
              key="1"
              custom={1}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col"
            >
              <Input
                startContent={<Icon icon="fluent:home-48-filled" width="20" height="20" color="gray" />}
                placeholder="Search for an address, MLS number or neighborhood"
                variant="bordered"
                className="flex-grow radius-lg min-w-xl"
                value={searchTerm}
                color="primary"
                size="lg"
                onChange={(e) => setSearchTerm(e.target.value)}
                endContent={<Icon icon="akar-icons:search" />}
              />

              {results && (
                <div>
                  <SearchDropdown results={results} isDataLoading={isDataLoading} />
                </div>
              )}
            </motion.div>
          </div>
        </Tab>

        <Tab key="2" title="Instant Home Evaluation">
          <div className="p-4">
            <motion.div
              key="2"
              custom={-1}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-row"
            >
              <Input
                startContent={<Icon icon="fluent:home-48-filled" width="20" height="20" color="gray" />}
                placeholder="Enter address"
                variant="bordered"
                className="flex-grow radius-lg"
                color="primary"
                size="lg"
              />
              <Button size="lg" color="primary" className="ml-4 text-xs">
                Get My Report
              </Button>
            </motion.div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
