'use client';

import React from "react";
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import PropertyCard from "@/components/cards/PropertyCard";
import PartnersScroll from "@/components/partners/partners";
import AutocompleteSearch from "./autocompleteSearchBar";
import PlaceCard from "@/components/cards/PlaceCard";
import SearchInput from "@/components/Homepage/SearchInput";
import Footer from "@/components/common/Footer/Footer";
import CardsScroll from "@/components/Homepage/CardScroll";


let features = [
  {
    description: "Are There any facilities nearby",
  },
  {
    description: "learn about the location",
  },
  {
    description: "show me homes",
  },
  {
    description: "public transit near me",
  },
];

let questions = [
  {
    description: "is there high seismic risk",
    value: "risk",
    cardDetails: {
      title: "Seismic Risk",
      description: "The risk of an earthquake is high",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "is this home near a voltage line",
    value: "voltage",
    cardDetails: {
      title: "Voltage Line",
      description: "The home is near a voltage line",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "what repairs have been done",
    value: "repairs",
    cardDetails: {
      title: "Repairs",
      description: "The home has had repairs",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "hows the air quality",
    value: "air",
    cardDetails: {
      title: "Air Quality",
      description: "The air quality is good",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
];

let questions2 = [
  {
    description: "show me family friendly neighborhoods",
    value: "family",
    cardDetails: {
      title: "Family details",
      description: "The neighborhood is family friendly",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "hows the market right now",
    value: "market",
    cardDetails: {
      title: "Market Details",
      description: "The market is good",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "homes built after 1980",
    value: "year",
    cardDetails: {
      title: "Year Built",
      description: "The home was built after 1980",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
  {
    description: "tell me more about the area",
    value: "air",
    cardDetails: {
      title: "Air Quality",
      description: "The air quality is good",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    }
  },
];




const places = [
  { id: 1, location: "London", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 2, location: "Manchester", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 3, location: "Liverpool", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 4, location: "Nottingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 5, location: "Bristol", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 6, location: "Leeds", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 7, location: "Birmingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 8, location: "Clacton-on-Sea", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 9, location: "Stratford-upon-Avon", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 10, location: "Norwich", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
];
let places1 = [
  { id: 1, location: "London", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 2, location: "Manchester", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 3, location: "Liverpool", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 4, location: "Nottingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 5, location: "Bristol", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 6, location: "Leeds", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 7, location: "Birmingham", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 8, location: "Clacton-on-Sea", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 9, location: "Stratford-upon-Avon", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: 10, location: "Norwich", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
];



let properties = [
  {
    "last_sale_price": "",
    "rental_prices": "{'shared_occupancy': 'N', 'per_week': 219, 'accurate': 'per_month', 'per_month': 950}",
    "country_code": "gb",
    "num_floors": "0",
    "view_count_30day": "67",
    "image_150_113_url": "https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "listing_status": "rent",
    "num_bedrooms": "3",
    "location_is_approximate": "0",
    "image_50_38_url": "https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "latitude": "54.979046",
    "view_count": "0",
    "furnished_state": "furnished",
    "agent_address": "166 West Rd, Tyne and Wear, Newcastle Upon Tyne",
    "branch_id": "70246",
    "category": "Residential",
    "property_type": "Terraced house",
    "last_sale_date": "",
    "letting_fees": "",
    "images": "[{'original': 'https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '480x360': 'https://lid.zoocdn.com/480/360/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '354x255': 'https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '645x430': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '80x60': 'https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '768x576': 'https://lid.zoocdn.com/768/576/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '150x113': 'https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '240x180': 'https://lid.zoocdn.com/240/180/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg'}, {'original': 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '480x360': 'https://lid.zoocdn.com/480/360/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '354x255': 'https://lid.zoocdn.com/354/255/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '645x430': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '80x60': 'https://lid.zoocdn.com/80/60/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '768x576': 'https://lid.zoocdn.com/768/576/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '150x113': 'https://lid.zoocdn.com/150/113/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '240x180': 'https://lid.zoocdn.com/240/180/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg'}, {'original': 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '480x360': 'https://lid.zoocdn.com/480/360/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '354x255': 'https://lid.zoocdn.com/354/255/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '645x430': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '80x60': 'https://lid.zoocdn.com/80/60/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '768x576': 'https://lid.zoocdn.com/768/576/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '150x113': 'https://lid.zoocdn.com/150/113/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '240x180': 'https://lid.zoocdn.com/240/180/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg'}, {'original': 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '480x360': 'https://lid.zoocdn.com/480/360/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '354x255': 'https://lid.zoocdn.com/354/255/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '645x430': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '80x60': 'https://lid.zoocdn.com/80/60/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '768x576': 'https://lid.zoocdn.com/768/576/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '150x113': 'https://lid.zoocdn.com/150/113/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '240x180': 'https://lid.zoocdn.com/240/180/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg'}]",
    "longitude": "-1.671582",
    "brochure": "",
    "listing_date": "2023-09-07 14:07:16",
    "thumbnail_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "description": "3 Bedroom mid terraced house located on West Road in popular location of Fenham.<br>Offered to let on a fully furnished basis.<br>Within close proximity to local amenities and excellent transport links to city centre and surrounding areas.<br>Water charges included in rent.<br>EPC Rating- D<br>Council Tax Band - A",
    "agent_postcode": "NE4 9QB",
    "post_town": "Newcastle upon Tyne",
    "details_url": "https://www.zoopla.co.uk/to-rent/details/65552847?utm_source=v1:5bWFDybfWx7C7AGpeagt7mP3PgcqjuqJ&utm_medium=api",
    "short_description": "3 Bedroom Mid Terraced House, West Road, Fenham, newcastle Upon Tyne, NE15 7NL",
    "outcode": "NE15",
    "other_image": "[{'url': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'description': ''}]",
    "image_645_430_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "title": "3 bed terraced house to rent",
    "county": "Tyne & Wear",
    "price": "219",
    "is_premium_listing": "0",
    "listing_id": "65552847",
    "image_caption": "",
    "bullet": "[]",
    "image_80_60_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "property_number": "361",
    "status": "to_rent",
    "agent_name": "Ideal Properties",
    "num_recepts": "0",
    "property_badge": "Student friendly",
    "country": "England",
    "company_id": "37632",
    "property_id": "",
    "first_published_date": "2023-09-07 14:09:21",
    "displayable_address": "West Road, Newcastle Upon Tyne NE15",
    "street_name": "West Road",
    "num_bathrooms": "1",
    "epc_graph": "",
    "incode": "7NL",
    "featured_type": "S",
    "agent_logo": "https://st.zoocdn.com/zoopla_static_agent_logo_(333756).png",
    "price_change": "[{'direction': '', 'date': '2023-09-07 14:07:16', 'percent': '0%', 'price': 219}]",
    "agent_phone": "0191 499 9242",
    "group_id": "0",
    "image_354_255_url": "https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "image_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "last_published_date": "2023-09-14 22:18:39",
    "original_image": "['https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg']",
    "available_from_display": "Available from  5th Dec 2023",
    "epc_report": "",
    "floor_plan": "",
    "virtual_tour": "",
    "premium_listing_highlights": "",
    "floor_area": "",
    "price_change_summary": "",
    "price_modifier": "",
    "pets_allowed": "",
    "bills_included": "",
    "epc": "",
    "document": "",
    "audio_tour": ""
  },
  {
    "last_sale_price": "",
    "rental_prices": "{'shared_occupancy': 'N', 'per_week': 219, 'accurate': 'per_month', 'per_month': 950}",
    "country_code": "gb",
    "num_floors": "0",
    "view_count_30day": "67",
    "image_150_113_url": "https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "listing_status": "rent",
    "num_bedrooms": "3",
    "location_is_approximate": "0",
    "image_50_38_url": "https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "latitude": "54.979046",
    "view_count": "0",
    "furnished_state": "furnished",
    "agent_address": "166 West Rd, Tyne and Wear, Newcastle Upon Tyne",
    "branch_id": "70246",
    "category": "Residential",
    "property_type": "Terraced house",
    "last_sale_date": "",
    "letting_fees": "",
    "images": "[{'original': 'https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '480x360': 'https://lid.zoocdn.com/480/360/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '354x255': 'https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '645x430': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '80x60': 'https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '768x576': 'https://lid.zoocdn.com/768/576/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '150x113': 'https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '240x180': 'https://lid.zoocdn.com/240/180/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg'}, {'original': 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '480x360': 'https://lid.zoocdn.com/480/360/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '354x255': 'https://lid.zoocdn.com/354/255/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '645x430': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '80x60': 'https://lid.zoocdn.com/80/60/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '768x576': 'https://lid.zoocdn.com/768/576/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '150x113': 'https://lid.zoocdn.com/150/113/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '240x180': 'https://lid.zoocdn.com/240/180/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg'}, {'original': 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '480x360': 'https://lid.zoocdn.com/480/360/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '354x255': 'https://lid.zoocdn.com/354/255/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '645x430': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '80x60': 'https://lid.zoocdn.com/80/60/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '768x576': 'https://lid.zoocdn.com/768/576/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '150x113': 'https://lid.zoocdn.com/150/113/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '240x180': 'https://lid.zoocdn.com/240/180/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg'}, {'original': 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '480x360': 'https://lid.zoocdn.com/480/360/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '354x255': 'https://lid.zoocdn.com/354/255/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '645x430': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '80x60': 'https://lid.zoocdn.com/80/60/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '768x576': 'https://lid.zoocdn.com/768/576/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '150x113': 'https://lid.zoocdn.com/150/113/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '240x180': 'https://lid.zoocdn.com/240/180/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg'}]",
    "longitude": "-1.671582",
    "brochure": "",
    "listing_date": "2023-09-07 14:07:16",
    "thumbnail_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "description": "3 Bedroom mid terraced house located on West Road in popular location of Fenham.<br>Offered to let on a fully furnished basis.<br>Within close proximity to local amenities and excellent transport links to city centre and surrounding areas.<br>Water charges included in rent.<br>EPC Rating- D<br>Council Tax Band - A",
    "agent_postcode": "NE4 9QB",
    "post_town": "Newcastle upon Tyne",
    "details_url": "https://www.zoopla.co.uk/to-rent/details/65552847?utm_source=v1:5bWFDybfWx7C7AGpeagt7mP3PgcqjuqJ&utm_medium=api",
    "short_description": "3 Bedroom Mid Terraced House, West Road, Fenham, newcastle Upon Tyne, NE15 7NL",
    "outcode": "NE15",
    "other_image": "[{'url': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'description': ''}]",
    "image_645_430_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "title": "3 bed terraced house to rent",
    "county": "Tyne & Wear",
    "price": "219",
    "is_premium_listing": "0",
    "listing_id": "65552847",
    "image_caption": "",
    "bullet": "[]",
    "image_80_60_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "property_number": "361",
    "status": "to_rent",
    "agent_name": "Ideal Properties",
    "num_recepts": "0",
    "property_badge": "Student friendly",
    "country": "England",
    "company_id": "37632",
    "property_id": "",
    "first_published_date": "2023-09-07 14:09:21",
    "displayable_address": "West Road, Newcastle Upon Tyne NE15",
    "street_name": "West Road",
    "num_bathrooms": "1",
    "epc_graph": "",
    "incode": "7NL",
    "featured_type": "S",
    "agent_logo": "https://st.zoocdn.com/zoopla_static_agent_logo_(333756).png",
    "price_change": "[{'direction': '', 'date': '2023-09-07 14:07:16', 'percent': '0%', 'price': 219}]",
    "agent_phone": "0191 499 9242",
    "group_id": "0",
    "image_354_255_url": "https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "image_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "last_published_date": "2023-09-14 22:18:39",
    "original_image": "['https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg']",
    "available_from_display": "Available from  5th Dec 2023",
    "epc_report": "",
    "floor_plan": "",
    "virtual_tour": "",
    "premium_listing_highlights": "",
    "floor_area": "",
    "price_change_summary": "",
    "price_modifier": "",
    "pets_allowed": "",
    "bills_included": "",
    "epc": "",
    "document": "",
    "audio_tour": ""
  },
  {
    "last_sale_price": "",
    "rental_prices": "{'shared_occupancy': 'N', 'per_week': 219, 'accurate': 'per_month', 'per_month': 950}",
    "country_code": "gb",
    "num_floors": "0",
    "view_count_30day": "67",
    "image_150_113_url": "https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "listing_status": "rent",
    "num_bedrooms": "3",
    "location_is_approximate": "0",
    "image_50_38_url": "https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "latitude": "54.979046",
    "view_count": "0",
    "furnished_state": "furnished",
    "agent_address": "166 West Rd, Tyne and Wear, Newcastle Upon Tyne",
    "branch_id": "70246",
    "category": "Residential",
    "property_type": "Terraced house",
    "last_sale_date": "",
    "letting_fees": "",
    "images": "[{'original': 'https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '480x360': 'https://lid.zoocdn.com/480/360/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '354x255': 'https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '645x430': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '80x60': 'https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '768x576': 'https://lid.zoocdn.com/768/576/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '150x113': 'https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '240x180': 'https://lid.zoocdn.com/240/180/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg'}, {'original': 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '480x360': 'https://lid.zoocdn.com/480/360/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '354x255': 'https://lid.zoocdn.com/354/255/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '645x430': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '80x60': 'https://lid.zoocdn.com/80/60/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '768x576': 'https://lid.zoocdn.com/768/576/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '150x113': 'https://lid.zoocdn.com/150/113/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '240x180': 'https://lid.zoocdn.com/240/180/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg'}, {'original': 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '480x360': 'https://lid.zoocdn.com/480/360/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '354x255': 'https://lid.zoocdn.com/354/255/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '645x430': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '80x60': 'https://lid.zoocdn.com/80/60/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '768x576': 'https://lid.zoocdn.com/768/576/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '150x113': 'https://lid.zoocdn.com/150/113/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '240x180': 'https://lid.zoocdn.com/240/180/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg'}, {'original': 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '480x360': 'https://lid.zoocdn.com/480/360/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '354x255': 'https://lid.zoocdn.com/354/255/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '645x430': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '80x60': 'https://lid.zoocdn.com/80/60/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '768x576': 'https://lid.zoocdn.com/768/576/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '150x113': 'https://lid.zoocdn.com/150/113/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '240x180': 'https://lid.zoocdn.com/240/180/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg'}]",
    "longitude": "-1.671582",
    "brochure": "",
    "listing_date": "2023-09-07 14:07:16",
    "thumbnail_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "description": "3 Bedroom mid terraced house located on West Road in popular location of Fenham.<br>Offered to let on a fully furnished basis.<br>Within close proximity to local amenities and excellent transport links to city centre and surrounding areas.<br>Water charges included in rent.<br>EPC Rating- D<br>Council Tax Band - A",
    "agent_postcode": "NE4 9QB",
    "post_town": "Newcastle upon Tyne",
    "details_url": "https://www.zoopla.co.uk/to-rent/details/65552847?utm_source=v1:5bWFDybfWx7C7AGpeagt7mP3PgcqjuqJ&utm_medium=api",
    "short_description": "3 Bedroom Mid Terraced House, West Road, Fenham, newcastle Upon Tyne, NE15 7NL",
    "outcode": "NE15",
    "other_image": "[{'url': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'description': ''}]",
    "image_645_430_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "title": "3 bed terraced house to rent",
    "county": "Tyne & Wear",
    "price": "219",
    "is_premium_listing": "0",
    "listing_id": "65552847",
    "image_caption": "",
    "bullet": "[]",
    "image_80_60_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "property_number": "361",
    "status": "to_rent",
    "agent_name": "Ideal Properties",
    "num_recepts": "0",
    "property_badge": "Student friendly",
    "country": "England",
    "company_id": "37632",
    "property_id": "",
    "first_published_date": "2023-09-07 14:09:21",
    "displayable_address": "West Road, Newcastle Upon Tyne NE15",
    "street_name": "West Road",
    "num_bathrooms": "1",
    "epc_graph": "",
    "incode": "7NL",
    "featured_type": "S",
    "agent_logo": "https://st.zoocdn.com/zoopla_static_agent_logo_(333756).png",
    "price_change": "[{'direction': '', 'date': '2023-09-07 14:07:16', 'percent': '0%', 'price': 219}]",
    "agent_phone": "0191 499 9242",
    "group_id": "0",
    "image_354_255_url": "https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "image_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "last_published_date": "2023-09-14 22:18:39",
    "original_image": "['https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg']",
    "available_from_display": "Available from  5th Dec 2023",
    "epc_report": "",
    "floor_plan": "",
    "virtual_tour": "",
    "premium_listing_highlights": "",
    "floor_area": "",
    "price_change_summary": "",
    "price_modifier": "",
    "pets_allowed": "",
    "bills_included": "",
    "epc": "",
    "document": "",
    "audio_tour": ""
  }
  , {
    "last_sale_price": "",
    "rental_prices": "{'shared_occupancy': 'N', 'per_week': 219, 'accurate': 'per_month', 'per_month': 950}",
    "country_code": "gb",
    "num_floors": "0",
    "view_count_30day": "67",
    "image_150_113_url": "https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "listing_status": "rent",
    "num_bedrooms": "3",
    "location_is_approximate": "0",
    "image_50_38_url": "https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "latitude": "54.979046",
    "view_count": "0",
    "furnished_state": "furnished",
    "agent_address": "166 West Rd, Tyne and Wear, Newcastle Upon Tyne",
    "branch_id": "70246",
    "category": "Residential",
    "property_type": "Terraced house",
    "last_sale_date": "",
    "letting_fees": "",
    "images": "[{'original': 'https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '480x360': 'https://lid.zoocdn.com/480/360/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '354x255': 'https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '645x430': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '80x60': 'https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '768x576': 'https://lid.zoocdn.com/768/576/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '150x113': 'https://lid.zoocdn.com/150/113/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', '240x180': 'https://lid.zoocdn.com/240/180/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg'}, {'original': 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '480x360': 'https://lid.zoocdn.com/480/360/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '354x255': 'https://lid.zoocdn.com/354/255/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '645x430': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '80x60': 'https://lid.zoocdn.com/80/60/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '768x576': 'https://lid.zoocdn.com/768/576/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '150x113': 'https://lid.zoocdn.com/150/113/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', '240x180': 'https://lid.zoocdn.com/240/180/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg'}, {'original': 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '480x360': 'https://lid.zoocdn.com/480/360/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '354x255': 'https://lid.zoocdn.com/354/255/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '645x430': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '80x60': 'https://lid.zoocdn.com/80/60/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '768x576': 'https://lid.zoocdn.com/768/576/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '150x113': 'https://lid.zoocdn.com/150/113/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', '240x180': 'https://lid.zoocdn.com/240/180/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg'}, {'original': 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '480x360': 'https://lid.zoocdn.com/480/360/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '354x255': 'https://lid.zoocdn.com/354/255/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '645x430': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '80x60': 'https://lid.zoocdn.com/80/60/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '768x576': 'https://lid.zoocdn.com/768/576/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '150x113': 'https://lid.zoocdn.com/150/113/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '1024x768': 'https://lid.zoocdn.com/1024/768/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'caption': '', '50x38': 'https://lid.zoocdn.com/50/38/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', '240x180': 'https://lid.zoocdn.com/240/180/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg'}]",
    "longitude": "-1.671582",
    "brochure": "",
    "listing_date": "2023-09-07 14:07:16",
    "thumbnail_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "description": "3 Bedroom mid terraced house located on West Road in popular location of Fenham.<br>Offered to let on a fully furnished basis.<br>Within close proximity to local amenities and excellent transport links to city centre and surrounding areas.<br>Water charges included in rent.<br>EPC Rating- D<br>Council Tax Band - A",
    "agent_postcode": "NE4 9QB",
    "post_town": "Newcastle upon Tyne",
    "details_url": "https://www.zoopla.co.uk/to-rent/details/65552847?utm_source=v1:5bWFDybfWx7C7AGpeagt7mP3PgcqjuqJ&utm_medium=api",
    "short_description": "3 Bedroom Mid Terraced House, West Road, Fenham, newcastle Upon Tyne, NE15 7NL",
    "outcode": "NE15",
    "other_image": "[{'url': 'https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'description': ''}, {'url': 'https://lid.zoocdn.com/645/430/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg', 'description': ''}]",
    "image_645_430_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "title": "3 bed terraced house to rent",
    "county": "Tyne & Wear",
    "price": "219",
    "is_premium_listing": "0",
    "listing_id": "65552847",
    "image_caption": "",
    "bullet": "[]",
    "image_80_60_url": "https://lid.zoocdn.com/80/60/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "property_number": "361",
    "status": "to_rent",
    "agent_name": "Ideal Properties",
    "num_recepts": "0",
    "property_badge": "Student friendly",
    "country": "England",
    "company_id": "37632",
    "property_id": "",
    "first_published_date": "2023-09-07 14:09:21",
    "displayable_address": "West Road, Newcastle Upon Tyne NE15",
    "street_name": "West Road",
    "num_bathrooms": "1",
    "epc_graph": "",
    "incode": "7NL",
    "featured_type": "S",
    "agent_logo": "https://st.zoocdn.com/zoopla_static_agent_logo_(333756).png",
    "price_change": "[{'direction': '', 'date': '2023-09-07 14:07:16', 'percent': '0%', 'price': 219}]",
    "agent_phone": "0191 499 9242",
    "group_id": "0",
    "image_354_255_url": "https://lid.zoocdn.com/354/255/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "image_url": "https://lid.zoocdn.com/645/430/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg",
    "last_published_date": "2023-09-14 22:18:39",
    "original_image": "['https://lc.zoocdn.com/25efe93ade3a67c32a58b2a9c7b545458d7d0ee6.jpg', 'https://lc.zoocdn.com/4c336bc2888065bc0d4d4277de857d7d3d025497.jpg', 'https://lc.zoocdn.com/a8bb4d28b15c8c6fed86908237641a1ada8d7d1d.jpg', 'https://lc.zoocdn.com/6af0f596cafe007097ae0d25dc03c83152a4d6c1.jpg']",
    "available_from_display": "Available from  5th Dec 2023",
    "epc_report": "",
    "floor_plan": "",
    "virtual_tour": "",
    "premium_listing_highlights": "",
    "floor_area": "",
    "price_change_summary": "",
    "price_modifier": "",
    "pets_allowed": "",
    "bills_included": "",
    "epc": "",
    "document": "",
    "audio_tour": ""
  }
]


export default function Home() {
  const [SelectedQuestionKey, setSelectedQuestionKey] = React.useState(null);

  return (
    <>
      <main className="max-w-[100vw] mx-auto flex flex-col items-center justify-center ">
        <div className="relative w-screen justify-center min-h-screen">
          <div
            style={{
              // backgroundImage: `url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
              backgroundColor: "#fff",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
              width: "100%",
            }}
            className="flex items-center justify-start  bg-background"
          >


<div className="overflow-x-clip">
  <div className="max-w-screen-xl mx-auto px-5">
    <main className="grid lg:grid-cols-5 place-items-center relative">
      <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-indigo-200 right-0 top-0"></div>
      <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-purple-200 right-56 top-10"></div>
      <div className="max-w-sm md:max-w-full lg:col-span-2">
        <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter [text-wrap:balance] text-center lg:text-start">
        Explore UK Properties with HomePortfolio™
        </h1>
        <p className="text-lg mt-4 max-w-lg text-slate-600 [text-wrap:balance] text-center lg:text-start">
        Your gateway to detailed property insights across the UK. Powered by comprehensive data and intuitive tools to help you make informed decisions. Discover the ideal home with our state-of-the-art platform.


        </p>
        {/* <div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3">
          <a
            href="https://web3templates.com/templates/astroship-pro-astro-saas-website-template"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-indigo-600 text-white hover:bg-indigo-800 flex gap-1 items-center justify-center"
          >
            Buy Template — $49
          </a>
          <a
            href="https://github.com/surjithctly/astroship"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-white border-2 border-indigo-500 hover:bg-indigo-50 text-indigo-600 flex gap-1 items-center justify-center"
          >
            Free Version
          </a>
        </div> */}

<AutocompleteSearch properties={properties} />


      </div>
      <div className="py-3 lg:col-span-3 lg:-mr-44">
        <picture>
          <source
            srcSet="https://astroship-pro.web3templates.com/_astro/hero-screenshot.HaV5_ts2_ZE0EX9.avif"
            type="image/avif"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <source
            srcSet="https://astroship-pro.web3templates.com/_astro/hero-screenshot.HaV5_ts2_ZE0EX9.avif, https://astroship-pro.web3templates.com/_astro/hero-screenshot.HaV5_ts2_ZE0EX9.avif"
            type="image/webp"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <img
            src="https://astroship-pro.web3templates.com/_astro/hero-screenshot.HaV5_ts2_ZE0EX9.avif"
            srcSet="/_astro/hero-screenshot.HaV5_ts2_ZSMuoP.png 240w, /_astro/hero-screenshot.HaV5_ts2_2fuB1b.png 540w, /_astro/hero-screenshot.HaV5_ts2_ZMCIo6.png 720w, /_astro/hero-screenshot.HaV5_ts2_10u77m.png 1183w"
            alt="Astronaut in the air"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="eager"
            fetchPriority="high"
            width="1183"
            height="787"
            decoding="async"
          />
        </picture>
      </div>
    </main>
  </div>
</div>


            {/* <div

              className="w-11/12 lg:w-1/2 z-10 flex flex-col gap-y-8 h-full text-left pl-10">
              <p className="font-sans-serif  font-bold text-3xl lg:text-6xl md:text-5xl">
                Find a new home you love
              </p>
              <div className="w-full ">

                <AutocompleteSearch properties={properties} />
              </div>
            </div> */}
          </div>
        </div>


        <div>
  <h2 className="text-center text-slate-500">
    Trusted by popular startups you know
  </h2>
  <div className="flex gap-x-8 gap-y-4 md:gap-20 lg:gap-28 items-center justify-center mt-6 flex-wrap">
    <div className="text-gray-500 my-2 h-7 md:h-9">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="currentColor"
        height="48"
        viewBox="0 0 97 48"
        width="97"
        className="h-full w-auto"
      >
        <clipPath id="a">
          <path d="m0 0h97v48h-97z"></path>
        </clipPath>
        <g clipPath="url(#a)" fill="current">
          <path
            clipRule="evenodd"
            d="m52.5131 4v5.42063l-6.763 1.44197v-5.44736zm14.0657 8.4375c-2.6406 0-4.3381 1.2283-5.2812 2.0828l-.3502-1.6556h-5.9278v31.1353l6.7361-1.4153.0269-7.5568c.97.6943 2.3981 1.6823 4.7692 1.6823 4.8231 0 9.215-3.8452 9.215-12.3099-.0269-7.7438-4.4728-11.9628-9.188-11.9628zm-1.6167 18.3981c-1.5897 0-2.5328-.5608-3.1795-1.255l-.0269-9.9067c.7006-.7744 1.6706-1.3084 3.2064-1.3084 2.4519 0 4.1494 2.7236 4.1494 6.2217 0 3.5781-1.6705 6.2484-4.1494 6.2484zm32.0382-6.1683c0-6.8359-3.3412-12.2298-9.727-12.2298-6.4128 0-10.2928 5.3939-10.2928 12.1764 0 8.0375 4.5806 12.0962 11.155 12.0962 3.2064 0 5.6314-.7209 7.4637-1.7356v-5.3405c-1.8323.9079-3.9339 1.4686-6.6014 1.4686-2.6137 0-4.9309-.9079-5.2273-4.0588h13.1759c0-.1463.0096-.4776.0206-.86l.0002-.006v-.0004-.0003-.0007l.0001-.0006v-.0004c.0151-.523.033-1.1393.033-1.5081zm-13.3106-2.5368c0-3.0174 1.8592-4.2724 3.5567-4.2724 1.6436 0 3.395 1.255 3.395 4.2724zm-31.1766-9.2399h-6.763v23.3648h6.763zm-14.4391.0026.4311 1.976c1.5897-2.8839 4.7422-2.2964 5.6045-1.976v6.1416c-.8353-.2937-3.5298-.6676-5.1195 1.3885v15.8347h-6.7361v-23.3648zm-13.0429-5.79554-6.5744 1.38853-.027 21.38881c0 3.9519 2.9909 6.8625 6.9787 6.8625 2.2094 0 3.8261-.4005 4.7153-.8812v-5.4206c-.8623.3472-5.1195 1.5755-5.1195-2.3765v-9.4794h5.1195v-5.6877h-5.1195zm-15.9238 11.13434c-1.42806 0-2.29029.4005-2.29029 1.4419 0 1.137 1.4839 1.6372 3.32489 2.2577 3.0011 1.0116 6.9512 2.3431 6.9679 7.2751 0 4.7798-3.8531 7.5302-9.45751 7.5302-2.31722 0-4.85-.454-7.35584-1.5221v-6.3552c2.26334 1.2283 5.11945 2.1362 7.35584 2.1362 1.50889 0 2.58671-.4005 2.58671-1.6289 0-1.2594-1.60861-1.8351-3.5506-2.5301-2.95752-1.0585-6.68833896-2.3937-6.68833896-6.8425 0-4.7263 3.63750896-7.5568 9.10723896-7.5568 2.2364 0 4.4458.3471 6.6822 1.2283v6.2751c-2.0478-1.0948-4.6344-1.7089-6.6822-1.7089z"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
    </div>
    <div className="text-gray-500 my-2 h-7 md:h-9">
      <svg
        viewBox="0 0 106 31"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width="106"
        height="31"
        className="h-full w-auto"
      >
        <g clipPath="url(#clip-hubspot-mono)">
          <path d="M11.5651 5.62866V14.0394H3.8408V5.62866H0.173584V25.7058H3.8408V17.5682H11.5651V25.7058H15.2323V5.62866H11.5651Z"></path>
          <path d="M26.9691 19.2163C26.9691 20.0209 26.6495 20.7926 26.0805 21.3616C25.5116 21.9305 24.7399 22.2502 23.9353 22.2502C23.1306 22.2502 22.359 21.9305 21.79 21.3616C21.221 20.7926 20.9014 20.0209 20.9014 19.2163V10.6169H17.4229V19.2163C17.4229 20.9418 18.1083 22.5967 19.3285 23.8168C20.5486 25.037 22.2034 25.7224 23.929 25.7224C25.6545 25.7224 27.3094 25.037 28.5295 23.8168C29.7496 22.5967 30.4351 20.9418 30.4351 19.2163V10.6169H26.9691V19.2163Z"></path>
          <path d="M52.7417 11.5023C52.7417 9.73968 53.9078 9.18088 55.1853 9.18088C56.2148 9.18088 57.575 9.96428 58.4644 10.9148L60.7427 8.23039C59.6053 6.69235 57.2983 5.62866 55.4099 5.62866C51.6367 5.62866 48.9074 7.83869 48.9074 11.5023C48.9074 18.2995 57.2156 16.1434 57.2156 19.9472C57.2156 21.1204 56.0765 22.1572 54.772 22.1572C52.7147 22.1572 52.0481 21.151 51.103 20.0873L48.575 22.716C50.192 24.7014 52.1865 25.7094 54.5762 25.7094C58.1607 25.7094 61.0446 23.4724 61.0446 19.9759C61.0446 12.4295 52.7363 14.7742 52.7363 11.5023"></path>
          <path d="M104.141 22.4985C102.085 22.4985 101.501 21.6091 101.501 20.2471V14.219H104.696V11.1644H101.501V7.13428L97.9741 8.71724V20.9964C97.9741 24.1372 100.141 25.7201 103.113 25.7201C103.579 25.7286 104.045 25.6913 104.504 25.6087L105.364 22.441C104.976 22.4679 104.531 22.4949 104.141 22.4949"></path>
          <path d="M40.2095 10.7176C38.4864 10.7176 37.2844 11.2171 36.1219 12.358V5.74951H32.6379V17.9981C32.6379 22.5835 35.953 25.7242 39.6777 25.7242C43.8103 25.7242 47.4452 22.5278 47.4452 18.2227C47.4452 13.9715 44.0996 10.7194 40.2095 10.7194V10.7176ZM40.188 22.2187C39.4062 22.2187 38.6419 21.9869 37.9919 21.5526C37.3418 21.1182 36.8352 20.5008 36.536 19.7785C36.2368 19.0563 36.1585 18.2615 36.311 17.4947C36.4636 16.7279 36.84 16.0235 37.3929 15.4707C37.9457 14.9179 38.65 14.5414 39.4168 14.3889C40.1836 14.2364 40.9784 14.3146 41.7007 14.6138C42.423 14.913 43.0404 15.4197 43.4747 16.0697C43.9091 16.7198 44.1409 17.484 44.1409 18.2658C44.1409 19.3142 43.7244 20.3196 42.9831 21.061C42.2418 21.8023 41.2364 22.2187 40.188 22.2187Z"></path>
          <path d="M78.0389 18.0389C78.0389 13.7266 74.4112 10.5374 70.2714 10.5374C66.5467 10.5374 63.2317 13.6781 63.2317 18.2635V30.5193H66.7156V23.9018C67.8763 25.0409 69.0802 25.5422 70.8015 25.5422C74.6915 25.5422 78.0371 22.2919 78.0371 18.0389H78.0389ZM74.74 17.9958C74.74 18.7776 74.5082 19.5418 74.0738 20.1919C73.6395 20.8419 73.0221 21.3486 72.2998 21.6478C71.5775 21.947 70.7827 22.0252 70.0159 21.8727C69.2492 21.7202 68.5448 21.3437 67.992 20.7909C67.4392 20.2381 67.0627 19.5337 66.9102 18.7669C66.7577 18.0001 66.8359 17.2054 67.1351 16.4831C67.4343 15.7608 67.941 15.1434 68.591 14.709C69.2411 14.2747 70.0053 14.0429 70.7871 14.0429C71.8355 14.0429 72.8409 14.4593 73.5822 15.2006C74.3236 15.942 74.74 16.9474 74.74 17.9958Z"></path>
          <path
            opacity="var(--svg-path-opacity)"
            d="M89.2939 10.3688V6.86871C89.7565 6.65259 90.1481 6.30952 90.4233 5.87946C90.6984 5.44939 90.8458 4.95002 90.8481 4.43948V4.35862C90.8481 3.64382 90.5642 2.9583 90.0587 2.45285C89.5533 1.94741 88.8678 1.66346 88.153 1.66346H88.0721C87.3573 1.66346 86.6718 1.94741 86.1664 2.45285C85.6609 2.9583 85.377 3.64382 85.377 4.35862V4.43948C85.3793 4.95002 85.5267 5.44939 85.8018 5.87946C86.077 6.30952 86.4686 6.65259 86.9312 6.86871V10.3688C85.6017 10.5722 84.3497 11.1233 83.3017 11.9662L73.7033 4.48979C73.7713 4.24324 73.8075 3.98905 73.8111 3.73334C73.8122 3.1327 73.6351 2.54522 73.3022 2.04524C72.9694 1.54525 72.4957 1.15521 71.9412 0.924446C71.3866 0.693685 70.7761 0.632572 70.1868 0.748837C69.5975 0.865103 69.056 1.15352 68.6306 1.57762C68.2053 2.00171 67.9152 2.54243 67.7972 3.13137C67.6792 3.72031 67.7385 4.33102 67.9676 4.88625C68.1968 5.44149 68.5854 5.9163 69.0844 6.25063C69.5834 6.58496 70.1703 6.76379 70.771 6.7645C71.2962 6.76215 71.8117 6.62214 72.2659 6.35843L81.7187 13.7126C80.8694 14.9955 80.4262 16.5045 80.447 18.0429C80.4679 19.5813 80.9517 21.0778 81.8355 22.3371L78.9607 25.212C78.7282 25.1377 78.486 25.0984 78.242 25.0952C77.7489 25.0955 77.2669 25.2421 76.8571 25.5162C76.4473 25.7904 76.1279 26.1799 75.9393 26.6356C75.7508 27.0912 75.7016 27.5925 75.7979 28.0761C75.8941 28.5597 76.1316 29.0039 76.4803 29.3526C76.829 29.7013 77.2732 29.9387 77.7568 30.035C78.2404 30.1313 78.7417 30.0821 79.1973 29.8935C79.653 29.705 80.0425 29.3856 80.3166 28.9758C80.5908 28.5659 80.7373 28.084 80.7377 27.5909C80.7346 27.3469 80.6952 27.1047 80.6209 26.8722L83.4652 24.0279C84.3927 24.7416 85.4712 25.2336 86.6181 25.4661C87.7651 25.6987 88.95 25.6657 90.0822 25.3696C91.2144 25.0735 92.2639 24.5222 93.1501 23.7579C94.0364 22.9936 94.736 22.0367 95.1953 20.9603C95.6546 19.8839 95.8615 18.7167 95.8001 17.548C95.7386 16.3793 95.4106 15.2402 94.841 14.2179C94.2713 13.1956 93.4753 12.3172 92.5138 11.6501C91.5524 10.9829 90.4509 10.5446 89.2939 10.3688ZM88.1152 21.879C87.3372 21.8783 86.5769 21.6469 85.9303 21.2142C85.2837 20.7815 84.7799 20.1668 84.4826 19.4478C84.1852 18.7288 84.1077 17.9378 84.2598 17.1748C84.4119 16.4118 84.7868 15.711 85.3371 15.161C85.8873 14.611 86.5883 14.2364 87.3514 14.0847C88.1145 13.9329 88.9054 14.0108 89.6243 14.3085C90.3431 14.6061 90.9576 15.1102 91.39 15.757C91.8224 16.4037 92.0534 17.1642 92.0538 17.9422C92.0538 18.9858 91.6392 19.9867 90.9013 20.7247C90.1633 21.4626 89.1624 21.8772 88.1188 21.8772"></path>
        </g>
        <defs>
          <clipPath id="clip-hubspot-mono">
            <rect
              width="105.19"
              height="29.8175"
              fill="current"
              transform="translate(0.174072 0.692871)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div className="text-gray-500 my-2 h-7 md:h-9">
      <svg
        fill="currentColor"
        viewBox="0 0 175 48"
        width="175"
        height="48"
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="current" transform="translate(3 7)">
          <path d="m56.6548259 25.3816928c-4.1385107 0-7.493381-3.4354677-7.493381-7.6740785 0-4.2375322 3.3548703-7.6729999 7.493381-7.6729999s7.4930223 3.4354677 7.4930223 7.6729999c0 4.2386108-3.3545116 7.6740785-7.4930223 7.6740785zm7.5167037.9731908c.1033371 1.1773918 1.0441361 2.6765442 2.6742084 2.6765442h.9537161c.3695739 0 .6727681-.3034255.6727681-.6737198v-20.9992784h-.0043057c-.0190169-.35375682-.311088-.6374094-.6684624-.6374094h-2.9551564c-.3573744 0-.6494455.28365258-.66918.6374094h-.0035881v1.70622957c-1.8109123-2.23434825-4.665602-3.16188139-7.5281855-3.16188139-6.5070133 0-11.782233 5.28514132-11.782233 11.80483652 0 6.5204142 5.2752197 11.8055555 11.782233 11.8055555v.0007191c2.8625835 0 5.9824335-1.1130398 7.5278267-3.1618814zm40.8858944-.9731908c-4.138215 0-7.4934948-3.4354677-7.4934948-7.6740785 0-4.2375322 3.3552798-7.6729999 7.4934948-7.6729999 4.138574 0 7.493136 3.4354677 7.493136 7.6729999 0 4.2386108-3.354562 7.6740785-7.493136 7.6740785zm7.516818.9731908c.103339 1.1773918 1.044152 2.6765442 2.674249 2.6765442h.954089c.36958 0 .67242-.3034255.67242-.6737198v-20.9992784h-.003947c-.019376-.35375682-.311452-.6374094-.668473-.6374094h-2.95556c-.357379 0-.649096.28365258-.66919.6374094h-.003588v1.70622957c-1.81094-2.23434825-4.665673-3.16188139-7.5283-3.16188139-6.5071121 0-11.7820531 5.28514132-11.7820531 11.80483652 0 6.5204142 5.274941 11.8055555 11.7820531 11.8055555v.0007191c2.862627 0 5.982524-1.1130398 7.527941-3.1618814z"></path>
          <path d="m158.204594 25.1860427c-4.064988 0-7.359971-3.3675788-7.359971-7.5224295 0-4.1537935 3.294983-7.5213723 7.359971-7.5213723 4.064282 0 7.358914 3.3675788 7.358914 7.5213723 0 4.1548507-3.294632 7.5224295-7.358914 7.5224295zm7.382172.9539594c.101493 1.1541251 1.025498 2.6236526 2.626472 2.6236526h.937044c.362977 0 .660759-.2974295.660759-.6604063v-20.58430769h-.004229c-.01903-.34676617-.305535-.62481343-.65653-.62481343h-2.902757c-.350995 0-.6375.27804726-.656882.62481343h-.003877v1.67251244c-1.778234-2.19019486-4.581965-3.09939884-7.393449-3.09939884-6.391211 0-11.571912 5.18070069-11.571912 11.57155889 0 6.3915631 5.180701 11.5722637 11.571912 11.5722637v.0007048c2.811484 0 5.875642-1.0910448 7.393097-3.0993989z"></path>
          <path d="m142.84652 26.386958-.001406-10.5372015h.000352c0-5.93987885-3.776327-9.94697872-9.798285-9.94697872-2.874492 0-5.504816 1.63540156-6.063061 3.06650865-.179876-1.10793139-.772903-2.27268871-2.611003-2.27268871h-.936967c-.36221 0-.658372.29458842-.658372.65367254v18.38754724.002789 1.9390543.0359084h.003864c.018621.3423501.304945.6177641.654859.6177641h1.959657.933805c.044266 0 .08783-.0052294.129637-.0135963.019322-.0034863.037239-.0108074.055859-.0160368.021431-.0066239.043916-.0118532.064292-.0202203.025646-.0104588.049184-.0247524.073074-.0380002.011594-.0069725.024242-.0122019.035484-.019523.028808-.0184771.055157-.0407891.080803-.0634498.004216-.0041835.009486-.0069726.01335-.0108074.028808-.0275414.055157-.0578717.078344-.0895967l.000352-.0006972c.072371-.0986611.116286-.2175423.123664-.3458364h.003513v-.0359084-1.2923542-.3395612-10.3614942c0-3.189922 2.606435-5.77637355 5.821706-5.77637355 3.214919 0 5.821355 2.58645155 5.821355 5.77637355l.002809 10.054704.000703-.0031377c0 .0087157.001406.01778.001406.0275414v1.9143019.0359084h.003513c.019322.3423501.305295.6177641.65521.6177641h1.958603.934859c.044618 0 .08783-.0052294.129637-.0135963.017215-.0031377.033024-.0097615.049887-.0146423.023539-.0066239.047779-.0125505.070615-.0216148.023539-.0097616.04532-.0230093.067453-.0359084.013702-.0073212.028106-.0128992.041105-.0216148.027051-.0174312.051293-.0383488.075182-.059615.006323-.0052293.012999-.0094128.018972-.0153394.027402-.0261469.051643-.0543856.074128-.0843673.001757-.0020919.003512-.0038349.005269-.0059267.071318-.0979638.114882-.2157991.122259-.3433959 0-.0010459.000352-.0017432.000352-.0017432h.003864v-.0359084-1.2923542zm-68.0938885-3.0398982c2.019354 1.3696875 4.2238214 2.0343993 6.3423435 2.0343993 2.0178847 0 4.103718-1.0238504 4.103718-2.8062416 0-2.3795174-4.5459338-2.7498003-7.4019717-3.6999536-2.8567726-.9501533-5.3172404-2.9140909-5.3172404-6.095289 0-4.86688419 4.4306051-6.87719712 8.5662773-6.87719712 2.6202386 0 5.3234843.84589884 7.0761866 2.05704768.6038228.44757504.2361667.96201671.2361667.96201671l-1.6733679 2.33853463c-.1876845.2635121-.5167754.4914338-.9887415.2059924-.4719662-.285082-2.1273369-1.4318807-4.6502439-1.4318807-2.5232742 0-4.0431154 1.1406873-4.0431154 2.5542334 0 1.6950333 1.9752793 2.2281688 4.2891989 2.8058822 4.0317296 1.0637547 8.4303805 2.3424891 8.4303805 7.1806134 0 4.288452-4.0982087 6.9386714-8.6272472 6.9386714-3.4326815 0-6.3548314-.9577027-8.8057497-2.7181646-.5108988-.5000617-.1542613-.9645331-.1542613-.9645331l1.6649202-2.3270307c.3386404-.4349926.7657972-.2832845.9527473-.1571007z"></path>
          <path d="m27.1527778 8.26333583c0 4.56415467-3.6997975 8.26444197-8.2638889 8.26444197s-8.2638889-3.7002873-8.2638889-8.26444197c0-4.56304855 3.6997975-8.26333583 8.2638889-8.26333583s8.2638889 3.70028728 8.2638889 8.26333583"></path>
          <path d="m8.23160463 17.773563c-4.54624074 0-8.2315679 3.6845926-8.2315679 8.2308333 0 4.5462408 3.68532716 8.2319352 8.2315679 8.2319352 4.54624077 0 8.23193527-3.6856944 8.23193527-8.2319352 0-4.5462407-3.6856945-8.2308333-8.23193527-8.2308333"></path>
          <path d="m29.3846129 17.7727549c-4.4470501 0-8.0526208 3.6853272-8.0526208 8.2319352 0 4.5458734 3.6055707 8.2315679 8.0526208 8.2315679 4.4474094 0 8.0529801-3.6856945 8.0529801-8.2315679 0-4.546608-3.6055707-8.2319352-8.0529801-8.2319352"></path>
        </g>
      </svg>
    </div>
  </div>
</div>

        <div className="flex flex-col  justify-center md:p-8  w-full">
          <div className="w-[100] flex items-center justify-center p-5">
            <Chip variant="flat" color="secondary">
              Two-Col Features
            </Chip>
          </div>
          <div className="w-full justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">Supercharge Your Workflows</h2>
            <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">Unlock your team's true potential with our state-of-the-art SaaS platform. From intelligent task management to real-time collaboration and top-notch data security, we have everything you need to streamline your workflows and achieve high productivity.</p>
          </div>
          <div className="grid md:grid-cols-2 py-10">
  <div className="grid place-items-center">
    <picture>
      <source
        srcSet="https://astroship-pro.web3templates.com/_astro/6.Ep0jo6kx_jbH81.avif"
        type="image/avif"
      />
      <source
        srcSet="https://astroship-pro.web3templates.com/_astro/6.Ep0jo6kx_jbH81.avif"
        type="image/webp"
      />
      <img
        src="https://astroship-pro.web3templates.com/_astro/6.Ep0jo6kx_jbH81.avif"
        alt="Feature Image"
        loading="lazy"
        width="730"
        height="584"
        decoding="async"
      />
    </picture>
  </div>
  <div className="grid place-items-center">
    <div className="max-w-lg">
      <span className="bg-purple-100 border-purple-200 border text-purple-600 -ml-px rounded-full text-xs font-medium px-3 py-1">
        Simplified Workflows
      </span>
      <h3 className="text-2xl font-medium mt-4 [text-wrap:balance]">
        Experience the Ultimate Boost in Productivity with Our Intuitive
        Platform
      </h3>
      <p className="mt-4 text-slate-600 [text-wrap:balance]">
        Streamline your tasks and collaborate seamlessly with our cutting-edge
        SaaS startup platform. Unlock the potential of your team and take
        productivity to new heights.
      </p>
      <ul className="grid mt-6 text-left gap-y-4">
        <li className="flex items-center gap-3 text-neutral-800">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            data-icon="ph:check-circle-fill"
          >
            <symbol id="ai:ph:check-circle-fill">
              <path
                fill="currentColor"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
              />
            </symbol>
            <use xlinkHref="#ai:ph:check-circle-fill"></use>
          </svg>
          <span className="text-sm">Intelligent Task Management</span>
        </li>
        <li className="flex items-center gap-3 text-neutral-800">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            data-icon="ph:check-circle-fill"
          >
            <use xlinkHref="#ai:ph:check-circle-fill"></use>
          </svg>
          <span className="text-sm">Real-time Collaboration</span>
        </li>
        <li className="flex items-center gap-3 text-neutral-800">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            data-icon="ph:check-circle-fill"
          >
            <use xlinkHref="#ai:ph:check-circle-fill"></use>
          </svg>
          <span className="text-sm">Data Security & Privacy</span>
        </li>
      </ul>
      <div className="flex items-center gap-4 mt-6">
        <a
          href="#"
          className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-800 inline-flex items-center group gap-px"
        >
          <span>Start 14-day trial</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mt-px group-hover:translate-x-1 transition-transform"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#"
          className="text-sm px-2 transition py-1 text-slate-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
        >
          Contact Sales
        </a>
      </div>
    </div>
  </div>
</div>

<div className="grid md:grid-cols-2 py-10">
  <div className="grid place-items-center pb-10 md:pb-0 md:order-2">
    <picture>
      <source
        srcSet="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
        type="image/avif"
      />
      <source
        srcSet="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
        type="image/webp"
      />
      <img
        src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
        alt="Feature Image"
        loading="lazy"
        width="1280"
        height="800"
        decoding="async"
      />
    </picture>
  </div>
  <div className="grid place-items-center">
    <div className="max-w-lg">
      <span className="bg-purple-100 border-purple-200 border text-purple-600 -ml-px rounded-full text-xs font-medium px-3 py-1">
        AI-Powered Insights
      </span>
      <h3 className="text-2xl font-medium mt-4 [text-wrap:balance]">
        Supercharge Your Marketing Strategy with Advanced Analytics
      </h3>
      <p className="mt-4 text-slate-600 [text-wrap:balance]">
        Harness the potential of AI-driven marketing analytics to optimize your
        campaigns, understand your audience better, and achieve unprecedented
        growth.
      </p>
      <ul className="grid mt-6 text-left gap-y-4">
        <li className="flex items-center gap-3 text-neutral-800">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            data-icon="ph:check-circle-fill"
          >
            <use xlinkHref="#ai:ph:check-circle-fill"></use>
          </svg>
          <span className="text-sm">Smart Audience Segmentation</span>
        </li>
        <li className="flex items-center gap-3 text-neutral-800">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            data-icon="ph:check-circle-fill"
          >
            <use xlinkHref="#ai:ph:check-circle-fill"></use>
          </svg>
          <span className="text-sm">Predictive Campaign Performance</span>
        </li>
        <li className="flex items-center gap-3 text-neutral-800">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            className="w-5 h-5"
            data-icon="ph:check-circle-fill"
          >
            <use xlinkHref="#ai:ph:check-circle-fill"></use>
          </svg>
          <span className="text-sm">Real-time Data Visualization</span>
        </li>
      </ul>
      <div className="flex items-center gap-4 mt-6">
        <a
          href="#"
          className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-800 inline-flex items-center group gap-px"
        >
          <span>Start 14-day trial</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mt-px group-hover:translate-x-1 transition-transform"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#"
          className="text-sm px-2 transition py-1 text-slate-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
        >
          Contact Sales
        </a>
      </div>
    </div>
  </div>
</div>






        </div>
    
  <div className="mt-24">
    <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
      Client <span className="text-indigo-600">Testimonials</span>
    </h2>
    <p className="text-lg mt-4 text-slate-600 text-center">
      Astroship is trusted by the world's leading companies and brands.
    </p>
  </div>

  <div className="overflow-hidden max-w-[100vw]   mt-10 relative">
  <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-indigo-100 right-1/3 -top-10"></div>
  <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-purple-100 right-1/3 translate-x-2/3 top-10"></div>
  <div className="relative md:flex gap-10 overflow-hidden py-5 group">
    <div className="md:motion-safe:animate-marquee w-auto py-5 overflow-x-auto flex flex-nowrap min-w-full shrink-0 items-stretch gap-10 snap-x snap-mandatory px-5">
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has transformed the way we manage our projects. Its well-designed interface and powerful features make it a must-have tool for any startup. We've seen a great increase in our productivity and collaboration.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="John Doe"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">John Doe</h2>
            <p className="text-sm text-slate-600">CEO at TechCorp</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          As a marketing professional, I love using Astroship to streamline our marketing campaigns. The automation features and data analytics help us make data-driven decisions and optimize our business strategies.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Jane Smith"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Jane Smith</h2>
            <p className="text-sm text-slate-600">Marketing Manager at InnovateTech</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has revolutionized the way we handle customer support. The ticketing system and knowledge base have significantly reduced response times, leading to happier customers. Thanks to this incredible tool.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Mike Johnson"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Mike Johnson</h2>
            <p className="text-sm text-slate-600">CTO at CloudNine</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has simplified our employee management processes. From onboarding to performance evaluations, everything is now seamlessly organized in one place. It's made my job much more manageable and enjoyable!
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Emily Brown"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Emily Brown</h2>
            <p className="text-sm text-slate-600">HR Manager at ConnectCo</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Our sales team swears by Astroship's CRM capabilities. The lead tracking and pipeline management tools have resulted in a significant boost in sales. It's a versatile platform that has truly optimized our sales processes.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="David Lee"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">David Lee</h2>
            <p className="text-sm text-slate-600">Sales Director at Linkify</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has been a lifesaver for our finance department. Its robust accounting features and automated invoicing have saved us countless hours of manual work. It's the perfect financial companion for any business!
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Sarah Martinez"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Sarah Martinez</h2>
            <p className="text-sm text-slate-600">Finance Controller at MoneyMakers</p>
          </div>
        </div>
      </div>
    </div>

    <div className="md:motion-safe:animate-marquee hidden md:motion-reduce:hidden md:flex min-w-full shrink-0 items-center gap-10">
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has transformed the way we manage our projects. Its well-designed interface and powerful features make it a must-have tool for any startup. We've seen a great increase in our productivity and collaboration.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="John Doe"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">John Doe</h2>
            <p className="text-sm text-slate-600">CEO at TechCorp</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          As a marketing professional, I love using Astroship to streamline our marketing campaigns. The automation features and data analytics help us make data-driven decisions and optimize our business strategies.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Jane Smith"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Jane Smith</h2>
            <p className="text-sm text-slate-600">Marketing Manager at InnovateTech</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has revolutionized the way we handle customer support. The ticketing system and knowledge base have significantly reduced response times, leading to happier customers. Thanks to this incredible tool.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Mike Johnson"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Mike Johnson</h2>
            <p className="text-sm text-slate-600">CTO at CloudNine</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has simplified our employee management processes. From onboarding to performance evaluations, everything is now seamlessly organized in one place. It's made my job much more manageable and enjoyable!
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Emily Brown"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Emily Brown</h2>
            <p className="text-sm text-slate-600">HR Manager at ConnectCo</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Our sales team swears by Astroship's CRM capabilities. The lead tracking and pipeline management tools have resulted in a significant boost in sales. It's a versatile platform that has truly optimized our sales processes.
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="David Lee"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">David Lee</h2>
            <p className="text-sm text-slate-600">Sales Director at Linkify</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl relative p-8 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5">
        <blockquote className="text-lg md:text-xl [text-wrap:balance]">
          Astroship has been a lifesaver for our finance department. Its robust accounting features and automated invoicing have saved us countless hours of manual work. It's the perfect financial companion for any business!
        </blockquote>
        <div className="flex items-center gap-3 mt-10">
          <div className="shrink-0">
            <picture>
              <img
                src="https://astroship-pro.web3templates.com/_astro/photo-1624298357597-fd92dfbec01d_oY7qp.avif"
                className="rounded-full w-12 h-12 object-cover bg-slate-100"
                alt="Sarah Martinez"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="font-medium text-slate-800">Sarah Martinez</h2>
            <p className="text-sm text-slate-600">Finance Controller at MoneyMakers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="max-w-screen-xl mx-auto px-5">
  <div className="mt-24">
    <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
      Everything you need to <span className="text-indigo-600">start a website</span>
    </h2>
    <p className="text-lg mt-4 text-slate-600">
      Astro comes batteries included. It takes the best parts of state-of-the-art tools and adds its own innovations.
    </p>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-16 gap-10">
    <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-3">
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
        <picture>
          <img
            src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
            alt="Feature image"
            className="h-full w-full object-contain"
            loading="lazy"
            width="1280"
            height="800"
            decoding="async"
          />
        </picture>
      </div>
      <div className="mt-2">
        <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
          <span>Astroship</span>
        </span>
        <h3 className="text-xl lg:text-2xl font-medium mt-2"><span>Responsive Template</span></h3>
        <p className="text-slate-600 mt-2 [text-wrap:balance]">
          <span>Astroship is a creative and modern mobile responsive website template that helps you create any kind of marketing websites or landing pages.</span>
        </p>
      </div>
    </div>
    <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-2">
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
        <picture>
          <img
            src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
            alt="Feature image"
            className="h-full w-full object-contain"
            loading="lazy"
            width="1280"
            height="800"
            decoding="async"
          />
        </picture>
      </div>
      <div className="mt-2">
        <span className="bg-indigo-100 border-indigo-200 border text-indigo-600 rounded-full text-xs font-medium px-3 py-1">
          <span>Creative</span>
        </span>
        <h3 className="text-xl lg:text-2xl font-medium mt-2"><span>Next Level Template</span></h3>
        <p className="text-slate-600 mt-2 [text-wrap:balance]">
          <span>Astroship is a new kind of website template that integrates your favorite tools and workflows.</span>
        </p>
      </div>
    </div>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
    <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
        <picture>
          <img
            src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
            alt="Feature image"
            className="h-full w-full object-contain"
            loading="lazy"
            width="1280"
            height="800"
            decoding="async"
          />
        </picture>
      </div>
      <div className="mt-2">
        <span className="bg-indigo-100 border-indigo-200 border text-indigo-600 rounded-full text-xs font-medium px-3 py-1">
          <span>Template</span>
        </span>
        <h3 className="text-xl lg:text-2xl font-medium mt-2"><span>Modern Design</span></h3>
        <p className="text-slate-600 mt-2 [text-wrap:balance]">
          <span>Feeling old? Try this template and be a part of the modern design.</span>
        </p>
      </div>
    </div>
    <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
        <picture>
          <img
            src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
            alt="Feature image"
            className="h-full w-full object-contain"
            loading="lazy"
            width="1280"
            height="800"
            decoding="async"
          />
        </picture>
      </div>
      <div className="mt-2">
        <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
          <span>Product</span>
        </span>
        <h3 className="text-xl lg:text-2xl font-medium mt-2"><span>Highlight Features</span></h3>
        <p className="text-slate-600 mt-2 [text-wrap:balance]">
          <span>You can highlight your features in a trendy grid like this one.</span>
        </p>
      </div>
    </div>
    <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
      <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
        <img
          src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
          alt="Feature image"
          className="h-full w-full object-contain"
          loading="lazy"
          width="909"
          height="823"
          decoding="async"
        />
      </div>
      <div className="mt-2">
        <span className="bg-gray-100 border-gray-200 border text-gray-800 rounded-full text-xs font-medium px-3 py-1">
          <span>Webhooks</span>
        </span>
        <h3 className="text-xl lg:text-2xl font-medium mt-2"><span>100+ Integrations</span></h3>
        <p className="text-slate-600 mt-2 [text-wrap:balance]">
          <span>Astroship can be integrated with hundreds of tools using Zapier.</span>
        </p>
      </div>
    </div>
  </div>
  <div className="mt-24 max-w-3xl mx-auto flex flex-col items-center justify-center">
    <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
      MORE FEATURES
    </span>
    <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">
      We've got you covered
    </h2>
    <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">
      Our template covers all things SAAS. If you don't find what you're looking for, contact us and we'll either help you or steer you in the right direction.
    </p>
  </div>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-8 md:gap-16">
    <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500" data-icon="fluent:document-javascript-24-regular">
          <use xlinkHref="#ai:fluent:document-javascript-24-regular"></use>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Bring Your Own Framework</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500" data-icon="fluent:trophy-24-regular">
          <use xlinkHref="#ai:fluent:trophy-24-regular"></use>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">100% Static HTML, No JS</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500" data-icon="fluent:box-24-regular">
          <use xlinkHref="#ai:fluent:box-24-regular"></use>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">On-Demand Components</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Need some JS? Astro can automatically hydrate interactive components when they become visible on the page.
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500" data-icon="fluent:box-multiple-24-regular">
          <use xlinkHref="#ai:fluent:box-multiple-24-regular"></use>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Broad Integration</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm packages.
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500" data-icon="fluent:book-search-24-regular">
          <use xlinkHref="#ai:fluent:book-search-24-regular"></use>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">SEO Enabled</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-indigo-500" data-icon="fluent:people-community-24-regular">
          <use xlinkHref="#ai:fluent:people-community-24-regular"></use>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Community</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Astro is an open source project powered by hundreds of contributors making thousands of individual contributions.
        </p>
      </div>
    </div>
  </div>
</div>

<div className="w-[100vw] bg-gradient-to-bl from-indigo-900 to-indigo-700 p-8 md:px-20 md:py-20 mt-20 flex flex-col items-center text-center">
  <h2 className="text-white text-4xl md:text-6xl tracking-tight">
    Build faster websites.
  </h2>
  <p className="text-white/70 mt-4 text-lg md:text-xl">
    Pull content from anywhere and serve it fast with Astro's next-gen island architecture.
  </p>
  <div className="flex mt-5">
    <a
      href="#"
      className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-white text-indigo-800 border-2 border-transparent"
    >
      Sign up for a 14-day Trial
    </a>
  </div>
</div>




        <Footer />
      </main>
    </>
  );
}
