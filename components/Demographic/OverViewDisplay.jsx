// DisplayLayout.jsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { Waypoint } from "react-waypoint";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import {LocationOverviewCard} from "./OverviewCards/location";
import DataOverview from "./Cards/demographics";
// import AgeCard from "./Cards/age";
// import DemographicSexRaceCard from "./Cards/demographicsexdata";
// import IncomeOverviewCard from "./Cards/income";
// import PovertyOverviewCard from "./Cards/poverty";
// import TransportationOverviewCard from "./Cards/transport";
// import OverviewCard from "./Cards/overview";
// import NeighbourhoodCard from "./Cards/neighborhood";

function OverviewDisplayLayout({}) {
  //   const getPricePaidData = async () => {
  //     try {
  //       const response = await fetch("/api/indevisual/get-price-paid", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           city: listingData?.analyticsTaxonomy || "N.A",
  //         }),
  //       });

  //       if (response.ok) {
  //         const resultData = await response.json();
  //         setPricePaidData(resultData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching price paid data:", error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     setLoading(true);
  //     await getSchoolData();
  //     await getPricePaidData();
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [listingData, postcode]);

  let pathname = usePathname();
  let hashId = pathname.split("#")[1];

  const [openSection, setOpenSection] = useState(hashId);
  const [hoveredSubElement, setHoveredSubElement] = useState(null);

  const navElements = [
    {
      name: "Overview",
      id: "about-home",
      subElements: [
        {
          name: "Location",
          icon: "mdi:map-marker",
          bgColor: "bg-pink-300",
          id: "location",
          Component: LocationOverviewCard,
        },
        {
          name: "Data Overview",
          icon: "mdi:email",
          bgColor: "bg-pink-400",
          id: "reachout",
          Component: DataOverview,
        },
        // {
        //   name: "Age",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "schools",
        //   Component: AgeCard,
        // },
        // {
        //   name: "Gender",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "gender",
        //   Component: DemographicSexRaceCard,
        // },
        // {
        //   name: "Income",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "demographics",
        //   Component: IncomeOverviewCard,
        // },
        // {
        //   name: "Poverty",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "income",
        //   Component: PovertyOverviewCard,
        // },
        // {
        //   name: "Transport",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "transport",
        //   Component: TransportationOverviewCard,
        // },
        // {
        //   name: "Overview",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "overview",
        //   Component: OverviewCard,
        // },
        // {
        //   name: "Neighbourhood",
        //   icon: "mdi:school",
        //   bgColor: "bg-pink-500",
        //   id: "neighbourhood",
        //   Component: NeighbourhoodCard,
        // },
      ],
    },
  ];

  const toggleSection = (id) => {
    if (openSection === id) {
      setOpenSection(null);
    }
    setOpenSection(id);
  };

  const handleMouseEnter = (id) => {
    setHoveredSubElement(id);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleIconClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="max-w-[87rem] mt-16 mx-auto flex flex-col items-center justify-center">
        {/* main div */}

        {/* lower div */}
        <div className="p-4 flex flex-col lg:flex-row justify-between w-full">
          <div className="flex-1">
            <div className="mb-4">
              <p className="font-bold text-md"></p>
            </div>

            {/* Existing styles for larger screens */}

            {navElements.map((element, index) => (
              <React.Fragment key={index}>
                <Waypoint onEnter={() => setOpenSection(element.id)} />

                {element.subElements.map((subElement, subIndex) => (
                  <div
                    className="pl-1"
                    key={subIndex}
                    id={subElement.id}
                    onMouseEnter={() => handleMouseEnter(subElement.id)}
                  >
                    <subElement.Component />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Sidebar Navigation */}
          <nav className="sticky top-6 p-4 bg-white w-45 h-fit hidden lg:block">
            <div className="w-full h-auto text-sm bg-transparent card flex flex-col relative border-gray-150 bg-gray-100 sm:rounded-lg">
              <div className="py-2 text-foreground h-full w-full overflow-hidden flex-1">
                {navElements.map((element, index) => (
                  <motion.div
                    key={index}
                    className="w-full h-auto text-sm bg-transparent card flex flex-col relative border-gray-150 bg-gray-100 sm:rounded-lg mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="py-2 text-foreground h-full w-full overflow-hidden flex-1">
                      <div className="w-full">
                        <button
                          className="w-full text-left"
                          aria-label=""
                          onClick={() => toggleSection(element.id)}
                        >
                          <h2 className="py-2 text-foreground border-subtle-border transition flex justify-between duration-300 leading-8 text-xl font-bold border-b">
                            {element.name}
                          </h2>
                        </button>
                        <AnimatePresence>
                          {openSection && element.id == openSection && (
                            <motion.div
                              key={openSection}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <motion.ul className="mt-1">
                                {element.subElements.map(
                                  (subElement, subIndex) => (
                                    <motion.li
                                      key={subElement.id}
                                      className={`rounded-lg flex items-center mb-1 text-foreground py-2 px-2 hover:${
                                        subElement.bgColor
                                      } ${
                                        hoveredSubElement === subElement.id
                                          ? subElement.bgColor
                                          : ""
                                      }`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.01 }}
                                    >
                                      <a
                                        href={"#" + subElement.id}
                                        onClick={() =>
                                          handleMouseEnter(subElement.id)
                                        }
                                        className="flex items-center space-x-4 w-full text-md font-semibold"
                                      >
                                        <div
                                          className={`rounded-full h-6 w-6 aspect-square flex items-center justify-center text-black ${subElement.bgColor}`}
                                        >
                                          <Icon icon={subElement.icon} />
                                        </div>
                                        <span className="text-base">
                                          {subElement.name}
                                        </span>
                                      </a>
                                    </motion.li>
                                  )
                                )}
                              </motion.ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default OverviewDisplayLayout;
