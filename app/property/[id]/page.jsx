"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MainCard from "@/components/Property/MainCard";
import ThumbnailCard from "@/components/Property/ThumbnailCard";
import Footer from "@/components/common/Footer/Footer";
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyPage({ params }) {
  const listingData = [
    {
      address: "Empire Reach, 4 Dowells Street",
      area: "London SE10",
      agent: {
        logoUri: "https://st.zoocdn.com/zoopla_static_agent_logo_(752658).png",
        branchId: "31334",
        branchName: "LiFE Residential - Greenwich",
        phone: "020 3463 0317",
      },
      attributes: {
        bedrooms: 1,
        bathrooms: 1,
        livingRooms: 1,
      },
      flag: "Just added",
      highlights: [],
      imageUris: [
        "https://lid.zoocdn.com/645/430/a08c736ce5863ea7e1d28e8834ef032d25011549.jpg",
        "https://lid.zoocdn.com/645/430/b7d352c4100ea22ee0162f31be3f82de2ac11fd9.jpg",
        "https://lid.zoocdn.com/645/430/466e8ce79cbe34a5e2e8124f88cd00b1d10e4292.jpg",
        "https://lid.zoocdn.com/645/430/2a740be0ac3200de968f6ef4a9c717d1da2e71ba.jpg",
        "https://lid.zoocdn.com/645/430/7a3009780254e834419408b627968011e110f916.jpg",
        "https://lid.zoocdn.com/645/430/e2e2d7eafeeedd44898ea415ba5b903944703329.jpg",
        "https://lid.zoocdn.com/645/430/a698c47f9b3943190dce49b9114ebf685e7b220e.jpg",
        "https://lid.zoocdn.com/645/430/f3e6db80ed786d8b65abe9c0606ce09860a11716.jpg",
        "https://lid.zoocdn.com/645/430/50082152336b5553adcf53570316232bf0220b37.jpg",
        "https://lid.zoocdn.com/645/430/40af41626ae5ce9382405a6f375a1ef10b14ebc7.jpg",
        "https://lid.zoocdn.com/645/430/45d137179ac6ff27c40a16426099bb01c6f3c203.jpg",
      ],
      isExpired: false,
      isFeatured: false,
      isPremium: false,
      listingId: "67980248",
      location: {
        coordinates: {
          latitude: 51.48246,
          longitude: -0.017057,
        },
      },
      pricing: {
        value: 400000,
        qualifier: "",
        qualifierLabel: "",
        label: "£400,000",
      },
      availability: {
        label: "Open",
        day: "Monday",
        date: "(8/10)",
        time: [
          {
            from: "10:00",
            to: "18:00",
          },
        ],
      },
      dimensions: {
        sqft: "1200",
      },
      publicationStatus: "Live",
      tags: [
        {
          label: "Leasehold",
        },
      ],
      title: "1 bed flat for sale",
      grossYields: 7.2,
      rentEstimate: 1300,
      roi: 2.5,
      cashOnCash: 13.2,
    },
  ];

  const mainImages = listingData[0].imageUris; // All images for MainCard
  const thumbnailImages = listingData[0].imageUris.slice(0, 4); // First 4 images for thumbnails
  const { bedrooms, bathrooms } = listingData[0].attributes;

  const [openSection, setOpenSection] = useState(null);
  const sectionsRef = useRef({});
  const [hoveredSubElement, setHoveredSubElement] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const handleCardHover = (subElementId) => {
    setHoveredSection(subElementId);
    setOpenSection(subElementId);
    setHoveredSubElement(subElementId);
  };

  const handleCardLeave = () => {
    setHoveredSection(null);
    setHoveredSubElement(null);
  };

  const toggleSection2 = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  const handleMouseEnter = (subElementId) => {
    setHoveredSubElement(subElementId);
  };
  
  const handleMouseLeave = () => {
    setHoveredSubElement(null);
  };
  

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setOpenSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleSection = (sectionName) => {
    setOpenSection((prevSection) => (prevSection === sectionName ? null : sectionName));
  };

  const navElements = [
    {
      name: "All about the Home",
      subElements: [
        {
          name: "The Basics",
          icon: "mdi:home",
          bgColor: "bg-peach-200",
          id: "basics",
        },
        {
          name: "Location",
          icon: "mdi:map-marker",
          bgColor: "bg-peach-300",
          id: "location",
        },
        {
          name: "Reach Out to us",
          icon: "mdi:email",
          bgColor: "bg-peach-400",
          id: "reach-out",
        },
      ],
    },
    {
      name: "Financials",
      subElements: [
        {
          name: "Price history",
          icon: "mdi:history",
          bgColor: "bg-green-200",
          id: "price-history",
        },
        {
          name: "Is this a good time to buy?",
          icon: "mdi:chart-line",
          bgColor: "bg-green-300",
          id: "good-time-to-buy",
        },
        {
          name: "Price tracker",
          icon: "mdi:currency-usd",
          bgColor: "bg-green-400",
          id: "price-tracker",
        },
        {
          name: "Market Comparison",
          icon: "mdi:scale-balance",
          bgColor: "bg-green-500",
          id: "market-comparison",
        },
      ],
    },
    {
      name: "Around the Neighborhood",
      subElements: [
        {
          name: "How are the Schools?",
          icon: "mdi:school",
          bgColor: "bg-purple-200",
          id: "schools",
        },
        {
          name: "Can I raise a family here?",
          icon: "mdi:human-child",
          bgColor: "bg-purple-300",
          id: "family",
        },
        {
          name: "What's nearby?",
          icon: "mdi:map",
          bgColor: "bg-purple-400",
          id: "nearby",
        },
        {
          name: "Public Transport",
          icon: "mdi:bus",
          bgColor: "bg-purple-500",
          id: "public-transport",
        },
        {
          name: "Recently Sold homes",
          icon: "mdi:home-group",
          bgColor: "bg-purple-600",
          id: "recently-sold",
        },
      ],
    },
    {
      name: "Quality of Life",
      subElements: [
        {
          name: "Crime Rate",
          icon: "mdi:shield-alert",
          bgColor: "bg-red-200",
          id: "crime-rate",
        },
        {
          name: "Is the air quality good?",
          icon: "mdi:weather-windy",
          bgColor: "bg-red-300",
          id: "air-quality",
        },
        {
          name: "How are the noise levels?",
          icon: "mdi:volume-high",
          bgColor: "bg-red-400",
          id: "noise-levels",
        },
        {
          name: "Will I like my neighbors?",
          icon: "mdi:account-group",
          bgColor: "bg-red-500",
          id: "neighbors",
        },
      ],
    },
  ];
 
 

  return (
    <>
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
              <Icon className="inline mx-1" icon="gravity-ui:thunderbolt-fill" />
              {listingData[0].flag}
            </span>
            <span className="px-1 text-primary">
              <Icon className="inline mx-1" icon="fa-solid:walking" />
              {listingData[0].availability.label}:
            </span>
            <span className="px-1 text-primary">{listingData[0].availability.day}</span>
            <span className="px-1 text-primary">{listingData[0].availability.date},</span>
            <span className="px-1 text-primary">
              {listingData[0].availability.time[0].from}-
              {listingData[0].availability.time[0].to}
            </span>
          </p>
        </div>
        <div className="mb-4 flex items-center">
          <div className="flex-1 text-left">
            <h3 className="font-bold text-4xl">{listingData[0].pricing.label}</h3>
            <span className="font-bold text-sm">{listingData[0].address},</span>
            <span className="font-bold text-gray-400 text-sm"> {listingData[0].area} </span>
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
              <h3 className="font-semibold text-4xl">{listingData[0].dimensions.sqft}</h3>
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
              <Card
                isHoverable={true}
                key={subIndex}
                className="m-4"
                id={subElement.id}
                ref={(el) => (sectionsRef.current[subElement.id] = el)}
                onMouseEnter={() => handleCardHover(element.name)}
                onMouseLeave={handleCardLeave}
              >
                <CardHeader>
                  <h2 className="text-xl font-bold">{subElement.name}</h2>
                </CardHeader>
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
                  repellendus, itaque cumque enim earum facere dicta odio est. Id sunt
                  debitis modi eum aut cum minima eaque pariatur aperiam explicabo.
                </CardBody>
              </Card>
            ))}
          </div>
        ))}
      </div>
      <div className="w-84 h-full">
        <nav className="sticky top-2 p-4 bg-white w-full h-fit">
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
                        onClick={() => toggleSection2(element.name)}
                      >
                        <h2 className="py-2 text-foreground border-subtle-border transition flex justify-between duration-300 leading-8 text-xl font-bold border-b">
                          {element.name}
                        </h2>
                      </button>
                      <AnimatePresence>
                        {(openSection === element.name || hoveredSection === element.name) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <motion.ul className="mt-1">
                              {element.subElements.map((subElement, subIndex) => (
                                <motion.li
                                  key={subIndex}
                                  className="hover:bg-gray-250 hover:text-gray-800 rounded-lg flex items-center mb-1 text-foreground py-2 px-2"
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
                                    <span className="text-base">{subElement.name}</span>
                                  </a>
                                </motion.li>
                              ))}
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
  </div>
  <Footer />
</>

  );
}
