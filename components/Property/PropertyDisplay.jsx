"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MainCard from "./MainCard";
import ThumbnailCard from "./ThumbnailCard";
import { Waypoint } from "react-waypoint";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { navElements } from "@/public/dummydata/listingData";

function PropertyDisplay({ listingData, params }) {
  const mainImages = listingData[0]?.imageUris;
  const thumbnailImages = listingData[0]?.imageUris.slice(0, 4);
  const { bedrooms, bathrooms } = listingData[0]?.attributes;

  let pathname = usePathname();

  let hashId = pathname.split("#")[1];

  const [openSection, setOpenSection] = useState(hashId);

  useEffect(() => {
    window.location.hash = openSection;
  }, [openSection]);

  return (
    <div className="max-w-[87rem] mx-auto flex flex-col items-center justify-center">
      <div className="p-4 flex items-center justify-between w-full">
        <Button size="lg" variant="flat" className="bg-transparent">
          <Icon icon="mdi:keyboard-arrow-left" />
          Back to {params.id}
        </Button>
        <div className="flex space-x-2">
          <Button size="lg" className="bg-transparent">
            <Icon icon="mdi:heart-outline" />
            Like
          </Button>
          <Button size="lg" className="bg-transparent">
            <Icon icon="bx:share" />
            Share
          </Button>
        </div>
      </div>

      {/* {/ main div /} */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 p-4 w-full">
        <div className="lg:col-span-7 max-w-screen">
          <MainCard images={mainImages} />
        </div>
        <div className="hidden lg:grid lg:col-span-3 grid-cols-1 md:grid-cols-2 gap-4">
          {thumbnailImages.map((imageUrl, index) => (
            <ThumbnailCard key={index} imageUrl={imageUrl} />
          ))}
        </div>
      </div>

      {/* {/ lower div /} */}
      <div className="p-4 flex justify-between w-full">
        <div className="flex-1">
          <div className="mb-4">
            <p className="font-bold text-md">
              <span className="px-1 text-gray-400">
                <Icon
                  width={10}
                  height={10}
                  className="inline mx-1"
                  icon="fluent-emoji-flat:green-circle"
                />
                {listingData[0].tags[0].label}
              </span>
              <span className="px-1 text-primary">
                <Icon
                  className="inline mx-1"
                  icon="gravity-ui:thunderbolt-fill"
                />
                {listingData[0].flag}
              </span>
              <span className="px-1 text-primary">
                <Icon className="inline mx-1" icon="fa-solid:walking" />
                {listingData[0].availability.label}:
              </span>
              <span className="px-1 text-primary">
                {listingData[0].availability.day}
              </span>
              <span className="px-1 text-primary">
                {listingData[0].availability.date},
              </span>
              <span className="px-1 text-primary">
                {listingData[0].availability.time[0].from}-
                {listingData[0].availability.time[0].to}
              </span>
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <div className="flex-1 text-left">
              <h3 className="font-bold text-4xl">
                {listingData[0].pricing.label}
              </h3>
              <span className="font-bold text-sm">
                {listingData[0].address},
              </span>
              <span className="font-bold text-gray-400 text-sm">
                {" "}
                {listingData[0].area}{" "}
              </span>
            </div>
            <div className="flex flex-row ml-[auto] mr-8 space-x-8">
              <div className="text-center">
                <h3 className="font-semibold text-4xl">{bedrooms}</h3>
                <p className="text-sm text-gray-600">beds</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-4xl">{bathrooms}</h3>
                <p className="text-sm text-gray-600">baths</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-4xl">
                  {listingData[0].dimensions.sqft}
                </h3>
                <p className="text-sm text-gray-600">sqft</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">
              {listingData[0].title} | on [{listingData[0].agent.branchName}]
            </p>
            <div className="pr-4 pt-4">
              <Button
                size="lg"
                className="w-full bg-neutral shadow-sm border rounded-md font-bold text-gray-600"
              >
                Talk to agent
              </Button>
            </div>
          </div>

          {navElements.map((element, index) => (
            <div key={index}>
              {element.subElements.map((subElement, subIndex) => (
                <div key={subIndex}>
                  <Waypoint
                    onEnter={() => setOpenSection(subElement.id)}
                    topOffset="20%" // Triggers earlier
                    bottomOffset="20%" // Triggers earlier
                  />
                  <Card
                    // isHoverable={true}
                    key={subIndex}
                    className="m-4"
                    id={subElement.id}
                    // ref={(el) => (sectionsRef.current[subElement.id] = el)}
                    style={{ minHeight: "150px" }}
                    // onMouseEnter={() => handleCardHover(element.name)}
                    // onMouseLeave={handleCardLeave}
                  >
                    <CardHeader>
                      <h2 className="text-xl font-bold">{subElement.name}</h2>
                    </CardHeader>
                    <CardBody>
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                      facere dicta odio est. Id sunt debitis modi eum aut cum
                      minima eaque pariatur aperiam explicabo.Lorem ipsum dolor
                      sit amet consectetur adipisicing elit. Possimus
                      repellendus, itaque cumque enim earum facere dicta odio
                      est. Id sunt debitis modi eum aut cum minima eaque
                      pariatur aperiam explicabo.Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Possimus repellendus, itaque
                      cumque enim earum facere dicta odio est. Id sunt debitis
                      modi eum aut cum minima eaque pariatur aperiam explicabo.
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 border-b border-divider backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"> */}
        <nav className="sticky top-2 p-4 bg-white w-45 h-fit">
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
                        onClick={() =>
                          setOpenSection(element.subElements[0].id)
                        }
                      >
                        <h2 className="py-2 text-foreground border-subtle-border transition flex justify-between duration-300 leading-8 text-xl font-bold border-b">
                          {element.name}
                        </h2>
                      </button>
                      <AnimatePresence>
                        {openSection &&
                          element.subElements.some(
                            (subElement) => subElement.id === openSection
                          ) && (
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
                                      className={`hover:bg-gray-250 hover:text-gray-800 rounded-lg flex items-center mb-1 text-foreground py-2 px-2 ${
                                        openSection === subElement.id
                                          ? "bg-slate-500"
                                          : ""
                                      }`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.1 }}
                                    >
                                      <a
                                        href={"#" + subElement.id}
                                        className="flex items-center space-x-4 w-full text-md font-semibold"
                                      >
                                        <div
                                          className={`rounded-full h-6 w-6 flex items-center justify-center text-black ${subElement.bgColor}`}
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default PropertyDisplay;
