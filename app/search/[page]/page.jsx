"use client";
import {
  Button,
  Card,
  Input,
  CardHeader,
  CardBody,
  Image,
  ButtonGroup,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Footer from "@/components/common/Footer/Footer";
import { SearchMap } from "@/components/Maps/index";
import { lisitngData } from "@/public/dummydata/listingData";
import ShowDataCards from "@/components/ListingSearch/ShowDataCards";

// Data for the cards
const cardData = [
  {
    title: "Frontend Radio",
    subtitle: "12 Tracks",
    description: "Daily Mix",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "Backend Beats",
    subtitle: "15 Tracks",
    description: "Weekly Highlights",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "UI/UX Essentials",
    subtitle: "10 Tracks",
    description: "Top Picks",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "JavaScript Jams",
    subtitle: "20 Tracks",
    description: "New Releases",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "React Rhythms",
    subtitle: "8 Tracks",
    description: "Best of the Week",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "CSS Classics",
    subtitle: "22 Tracks",
    description: "Trending Now",
    imageUrl: "https://nextui.org/images/hero-card-complete.jpeg",
  },
];

const defaultProps = {
  lat: Number(23.079727),
  lng: Number(77.37855),

  zoom: 13,
};

export default function SearchPage({ params }) {
  const encodedPage = params.page;
  const page = decodeURIComponent(encodedPage.replace(/-/g, " "));
  const locationValue = page.split(/[\s,]+/)[0];

  const [listingData, setListingData] = useState(lisitngData)

  useEffect(() => {
    const fetchProperties = async () => {
      const url = `https://zoopla.p.rapidapi.com/properties/v2/list?locationValue=${locationValue}&locationIdentifier=${locationValue}&furnishedState=Any&sortOrder=newest_listings&page=1`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "bcf46a0d4dmsh548b3c3c39ac8aap150bddjsn2d66c886abc8",
          "x-rapidapi-host": "zoopla.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setListingData(result?.data?.listings?.regular);
      } catch (error) {
        console.error(error);
      }
    };

    // fetchProperties();
  }, [page]);



  return (
    <main className="flex flex-col h-screen">
      <div className="w-screen fixed flex bg-content1 z-40 justify-between items-center px-10">
        <div className="flex items-center p-2 w-full gap-2">
          <Input
            bordered
            clearable
            type="text"
            label="Enter any location.."
            value={page}
            contentLeft={<Icon icon="search" fill="currentColor" />}
            contentLeftStyling={false}
            placeholder={page}
            size="lg"
            className="w-full max-w-xs"
            endContent={<Icon icon="fluent-emoji-high-contrast:cross-mark" />}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            endContent={<Icon icon="ph:caret-down-fill" />}
            radius="sm"
            size="lg"
            className="w-full justify-between max-w-xs"
            auto
          >
            Beds
          </Button>
          <Button
            endContent={<Icon icon="ph:caret-down-fill" />}
            radius="sm"
            size="lg"
            className="w-full justify-between max-w-xs"
            auto
          >
            Baths
          </Button>
          <Button
            endContent={<Icon icon="ph:caret-down-fill" />}
            radius="sm"
            size="lg"
            className="w-full justify-between max-w-xs"
            auto
          >
            Price
          </Button>
          <Button
            endContent={<Icon icon="ph:caret-down-fill" />}
            radius="sm"
            size="lg"
            className="w-full justify-between max-w-xs"
            auto
          >
            Home Types
          </Button>
          <Button
            endContent={<Icon icon="ph:caret-down-fill" />}
            radius="sm"
            size="lg"
            className="w-full justify-between max-w-xs"
            auto
          >
            Open House
          </Button>
          <Button radius="sm" size="lg" className="w-full max-w-xs" auto>
            Filters
          </Button>
          <Button
            color="primary"
            radius="sm"
            size="lg"
            className="w-full max-w-xs m-2"
            auto
          >
            Save my Search
          </Button>
        </div>
      </div>
      <ShowDataCards cardData={listingData} />
      
    </main>
  );
}
//working
