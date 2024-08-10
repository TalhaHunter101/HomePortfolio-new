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
      <main className="max-w-[87rem] mx-auto flex flex-col items-center justify-center ">
        <div className="relative w-screen justify-center min-h-screen">
          <div
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
              backgroundColor: "#e6e6e6",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
              width: "100%",
            }}
            className="flex items-center justify-start  bg-background"
          >
            <div

              className="w-11/12 lg:w-1/2 z-10 flex flex-col gap-y-8 h-full text-left pl-10">
              <p className="font-sans-serif text-white font-bold text-3xl lg:text-6xl md:text-5xl">
                Find a new home you love
              </p>
              <div className="w-full ">

                <AutocompleteSearch properties={properties} />
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col md:p-10 w-full justify-center">
          <div className="w-full flex items-center justify-center">
            <p className="font-serif text-xl text-default-700 pb-5">
              Trusted by popular startups you know
            </p>
          </div>
          <div className="w-full pl-20   flex flex-row justify-center space-x-4">
            <div className="flex flex-col   md:p-8  w-full text-gray-500 my-2 h-7 md:h-9">
              <img src="MainPageImg/mainpage.svg" alt="logo" />
            </div>
            <div className="flex flex-col  md:p-8  w-full text-gray-500 my-2 h-7 md:h-9">
              <img src="MainPageImg/intercom.svg" alt="logo" />
            </div>
            <div className="flex flex-col  md:p-8  w-full text-gray-500 my-2 h-7 md:h-9">
              <img src="MainPageImg/hubspot.svg" alt="logo" />
            </div>
            <div className="flex flex-col  md:p-8  w-full text-gray-500 my-2 h-7 md:h-9">
              <img src="MainPageImg/stripe.svg" alt="logo" />
            </div>
          </div>
        </div>
        <div className="flex flex-col  justify-center md:p-8  w-full">
          <div className="w-full md:w-1/2 flex items-center justify-center p-5">
            <Chip variant="flat" color="secondary">
              Two-Col Features
            </Chip>
          </div>
          <div className="w-full justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">Supercharge Your Workflows</h2>
            <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">Unlock your team's true potential with our state-of-the-art SaaS platform. From intelligent task management to real-time collaboration and top-notch data security, we have everything you need to streamline your workflows and achieve high productivity.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10  py-2 px-5 rounded-md ">
            <div className="w-full  grid items-center justify-start">
              <Image
                width={400}
                height={400}
                loading="lazy"
                alt="250+ data points"
                src="https://astroship-pro.web3templates.com/_astro/6.Ep0jo6kx_jbH81.avif"
              />
            </div>
            <div className="flex flex-col   justify-end">
              <div className="w-full  md:w-1/2 grid p-5  justify-center">
                <Chip variant="flat" className="" color="secondary" >simplified qorkflows</Chip>
              </div>
              <div className="w-full md:w-1/2 grid justify-end">
                <h3 className="text-2xl font-medium mt-4 [text-wrap:balance]">Experience the Ultimate Boost in Productivity with Our Intuitive Platform</h3>
                <p className="mt-4 text-slate-600 [text-wrap:balance]">Streamline your tasks and collaborate seamlessly with our cutting-edge SaaS startup platform. Unlock the potential of your team and take productivity to new heights.</p>
                <ul className="mt-4">
                  <li className="text-slate-600 text-sm"><Icon className="inline m-2" icon="teenyicons:tick-circle-solid" />Intelligent Task Management</li>
                  <li className="text-slate-600 text-sm"><Icon className="inline m-2" icon="teenyicons:tick-circle-solid" />Real-time Collaboration</li>
                  <li className="text-slate-600 text-sm"><Icon className="inline m-2" icon="teenyicons:tick-circle-solid" />Data Security & Privacy</li>

                </ul>
              </div>
              <div className="w-full md:w-1/2 flex flex-row pt-5 justify-end space-x-4">
                <Button
                  radius="full"
                  color="primary"
                  size="lg"
                  variant="bordered"
                  className=" w-[150px] text-sm  ">
                  start 14 day trial
                </Button>
                <Button
                  variant="flat" className="w-[150px] p-2 mt-2 rounded-lg font-semibold bg-transparent text-primary">
                  Contact Sales
                </Button>
              </div>
            </div>


          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10  py-2 px-5 rounded-md ">
            <div className="flex flex-col   justify-end">
              <div className="w-full md:w-1/2 grid p-5  justify-center">
                <Chip variant="flat" className="" color="secondary" >AI-Powered Insights</Chip>
              </div>
              <div className="w-full md:w-1/2 grid justify-end">
                <h3 className="text-2xl font-medium mt-4 [text-wrap:balance]">Supercharge Your Marketing Strategy with Advanced Analytics</h3>
                <p className="mt-4 text-slate-600 [text-wrap:balance]">Harness the potential of AI-driven marketing analytics to optimize your campaigns, understand your audience better, and achieve unprecedented growth.</p>
                <ul className="mt-4">
                  <li className="text-slate-600 text-sm"><Icon className="inline m-2" icon="teenyicons:tick-circle-solid" />Smart Audience Segmentation</li>
                  <li className="text-slate-600 text-sm"><Icon className="inline m-2" icon="teenyicons:tick-circle-solid" />Predictive Campaign Performance</li>
                  <li className="text-slate-600 text-sm"><Icon className="inline m-2" icon="teenyicons:tick-circle-solid" />Real-time Data Visualization</li>

                </ul>
              </div>
              <div className="w-full md:w-1/2 flex flex-row pt-5 justify-end space-x-4">
                <Button
                  radius="full"
                  color="primary"
                  size="lg"
                  variant="bordered"
                  className=" w-[150px] text-sm  ">
                  start 14 day trial
                </Button>
                <Button
                  variant="flat" className="w-[150px] p-2 mt-2 rounded-lg font-semibold bg-transparent text-primary">
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="w-full  grid items-center justify-start">
              <Image
                width={600}
                height={400}
                loading="lazy"
                alt="250+ data points"
                src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
              />
            </div>



          </div>
        </div>
        <div className="flex flex-col  md:p-24 w-full justify-center">
          <div className="w-full  grid  items-center ">
            <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">Client <span class="text-primary">Testimonials</span></h2>
            <p className="text-lg mt-4 text-slate-600 text-center">Astroship is trusted by the world's leading companies and brands.</p>
          </div>


          <div className="w-full p-5">
            {/* {
              properties.map((property, index) => (
                <PropertyCard key={index} property={property} options={{ loop: true }} />
              ))
            } */}
            <CardsScroll />
          </div>

        </div>
        <div className="flex flex-col  md:p-24 w-full justify-center">
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">Everything you need to <span class="text-primary">start a website</span></h2>
          <p class="text-lg mt-4 text-slate-600">
            Astro comes batteries included. It takes the best parts of state-of-the-art
            tools and adds its own innovations.
          </p>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Top Row */}
              <div className="col-span-2 lg:col-span-2">
                <Card className="w-full h-full">
                  <Image
                    src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Card>
              </div>
              <div className="col-span-1 lg:col-span-1">
                <Card className="w-full h-full">
                  <Image
                    src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Card>
              </div>

              {/* Bottom Row */}
              <div className="col-span-1 lg:col-span-1">
                <Card className="w-full h-full">
                  <Image
                    src="https://astroship-pro.web3templates.com/_astro/3.XiLsQFjx_Z1JuNDf.avif"
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Card>
              </div>
              <div className="col-span-1 lg:col-span-1">
                <Card className="w-full h-full">
                  <Image
                    src="https://astroship-pro.web3templates.com/_astro/2.ldT67BXv_ZIfUrc.avif"
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Card>
              </div>
              <div className="col-span-1 lg:col-span-1">
                <Card className="w-full h-full">
                  <Image
                    src="https://astroship-pro.web3templates.com/_astro/integrations.HhfHOMQB.svg"
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Card>
              </div>
            </div>
          </div>
          <div className="mt-24 max-w-3xl mx-auto flex flex-col items-center justify-center"> <span class="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1 "> MORE FEATURES </span> <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">
            We've got you covered
          </h2> <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">
              Our template covers all things SAAS. If you don't find what you're looking
              for, contact us and we'll either help you or steer you in the right
              direction.
            </p> </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-8 md:gap-16">
            <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
              <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">svg</div>
              <div> <h3 className="font-semibold text-lg">Bring Your Own Framework</h3> <p className="text-slate-500 mt-2 leading-relaxed">Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.</p> </div>

            </div>
            <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
              <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">svg</div>
              <div> <h3 className="font-semibold text-lg">Bring Your Own Framework</h3> <p className="text-slate-500 mt-2 leading-relaxed">Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.</p> </div>

            </div>
            <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
              <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">svg</div>
              <div> <h3 className="font-semibold text-lg">Bring Your Own Framework</h3> <p className="text-slate-500 mt-2 leading-relaxed">Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.</p> </div>

            </div>
            <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
              <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">svg</div>
              <div> <h3 className="font-semibold text-lg">Bring Your Own Framework</h3> <p className="text-slate-500 mt-2 leading-relaxed">Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.</p> </div>

            </div>
            <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
              <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">svg</div>
              <div> <h3 className="font-semibold text-lg">Bring Your Own Framework</h3> <p className="text-slate-500 mt-2 leading-relaxed">Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.</p> </div>

            </div>
            <div className="flex flex-col gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-5">
              <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center  p-2 w-10 h-10 shrink-0">svg</div>
              <div> <h3 className="font-semibold text-lg">Bring Your Own Framework</h3> <p className="text-slate-500 mt-2 leading-relaxed">Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.</p> </div>

            </div>



          </div>
          <div class="bg-gradient-to-bl from-indigo-900 to-indigo-700 p-8 md:px-20 md:py-20 mt-20 flex flex-col items-center text-center"> <h2 class="text-white text-4xl md:text-6xl tracking-tight">
            Build faster websites.
          </h2> <p class="text-white/70 mt-4 text-lg md:text-xl">
              Pull content from anywhere and serve it fast with Astro's next-gen island
              architecture.
            </p> <div class="flex mt-5"> <a href="#" className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-white text-indigo-800 border-2 border-transparent">Sign up for a 14-day Trial </a> </div> </div>
        </div>




        <Footer />
      </main>
    </>
  );
}
