"use client";
import {
  Button,
  Card,
  Input,
  CardHeader,
  CardBody,
  Image,
  ButtonGroup,
  Tabs,
  Tab,
  Spinner,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Footer from "@/components/common/Footer/Footer";
import { SearchMap } from "@/components/Maps/index";
import Beds from "@/components/SearchPage/beds";
import Baths from "@/components/SearchPage/baths";
import Price from "@/components/SearchPage/price";
import HomeTypes from "@/components/SearchPage/homeTypes";
import Filter from "@/components/SearchPage/filter";
import ToggleTab from "@/components/SearchPage/ToggleTab";
import SearchCard from "@/components/SearchPage/SearchCrd";
import { motion } from "framer-motion";
import SearchDropdown from "@/components/Homepage/SearchDropdown";
import useStore from "@/store/useStore";
import useFetchZooplaData from "@/utils/Fetchfunctions/useFetchZooplaData";
import useSearchStore from "@/store/useSearchStore";

const defaultProps = {
  lat: Number(23.079727),
  lng: Number(77.37855),

  zoom: 13,
}; 
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

export default function SearchPage() {
  const {
    searchTerm,
    setSearchTerm,
    results,
    setResults,
    isDataLoading,
    setIsDataLoading,
    searchPostcode,
  } = useStore();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isDataLoading: loading, results: searchResults } =
    useFetchZooplaData(searchTerm);

  // useEffect(() => {
  //   setIsDataLoading(loading);
  //   searchPostcode();
  // }, [loading, searchResults, setIsDataLoading, searchPostcode]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [dropdownRef]);

  return (
    <main className="flex flex-col h-screen relative">
     Search
    </main>
  );
}
//working
