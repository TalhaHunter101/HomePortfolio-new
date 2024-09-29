/* eslint-disable react/no-unescaped-entities */
'use client';

import React from "react";
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Image, Chip, Spacer } from "@nextui-org/react";
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
import ScrollingBanner from "@/components/carousel/scrolling-banner";
















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


let DataSources = [
  {
    image: '/MainPageImg/partnersLogos/1.png',

  },{
    image: '/MainPageImg/partnersLogos/2.png',
  },
  {
    image: '/MainPageImg/partnersLogos/3.png',
  },
  {
    image: '/MainPageImg/partnersLogos/4.png',
  },{
    image: '/MainPageImg/partnersLogos/5.png',
  },{
    image: '/MainPageImg/partnersLogos/6.png',
  },{
    image: '/MainPageImg/partnersLogos/7.png',
  },{
    image: '/MainPageImg/partnersLogos/8.png',
  },{
    image: '/MainPageImg/partnersLogos/9.png',
  }
]



export default function Home() {
  const [SelectedQuestionKey, setSelectedQuestionKey] = React.useState(null);

  return (
    <>
      <main className="max-w-[100vw] mt-16 mx-auto flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="relative w-screen justify-center min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] px-4 sm:px-6">
          <div
            style={{
              backgroundColor: "#fff",
              backgroundImage: `url('/bg-plain-banner.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
            className="flex items-center justify-center bg-background min-h-[40vh] md:min-h-[80vh] lg:min-h-[100vh] px-4 sm:px-6"
          >
            <div className="flex flex-col justify-center items-center w-full max-w-screen-xl mx-auto px-5">
              <div className="place-items-center h-auto relative p-8 flex flex-col justify-center items-center h-full w-full min-w-[95vw] z-10 px-4 sm:px-6">
                <Chip variant="flat" color="secondary" className="mb-2">
                  AI-Powered Property Data Insights
                </Chip>
                <h1
                  style={{ lineHeight: "1.25" }}
                  className="leading-6 text-lg md:text-3xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center z-10"
                >
                  Find and analyse any UK
                  <br />
                  property in seconds
                </h1>
                <p className="mt-4 text-sm md:text-lg lg:text-xl text-slate-600 text-center z-10">
                  Discover, source, analyse and track any property in seconds, all in one place
                </p>
                <div className="mt-2 w-full sm:max-w-[90vw] md:max-w-[60vw] lg:max-w-[800px] flex justify-center gap-3 z-10">
                  <AutocompleteSearch properties={properties} />
                </div>
              </div>

              {/* Floating Images for Large Screens */}
              {/* <div className="absolute top-0 left-0 w-full h-full flex flex-wrap items-center justify-center pointer-events-none hidden lg:flex z-0">
                <div className="absolute w-[134.05px] top-[15%] right-[5%] z-0">
                  <div className="h-[117.73px] bg-white rounded-lg shadow-lg border border-black/10 flex-col justify-start items-start inline-flex">
                    <div className="self-stretch px-[11.87px] pt-[15.83px] pb-[7.91px] justify-start items-center inline-flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="self-stretch text-[#212636] text-[8.90px] font-medium leading-[10.68px]">
                          Investment Potential
                        </div>
                      </div>
                    </div>
                    <div className="w-[134.05px] h-[75.19px] relative">
                      <img
                        src="/Series=2, Chart type=Line wavy (1).svg"
                        alt=""
                        width={134.05}
                        height={75.19}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute w-[134.05px] top-[40%] left-[10%] z-0">
                  <div className="h-[118.22px] bg-white rounded-lg shadow-lg border border-black/10 flex-col justify-start items-start inline-flex">
                    <div className="w-[134.05px] px-[11.87px] pt-[15.83px] pb-[7.91px] justify-start items-center inline-flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="self-stretch text-[#212636] text-[8.90px] font-medium leading-[10.68px]">
                          Planning Applications
                        </div>
                      </div>
                    </div>
                    <div className="w-[134.05px] px-[11.87px] py-[7.91px] justify-start items-center gap-[13.36px] inline-flex">
                      <div className="w-[15.83px] h-[15.83px] relative" />
                      <div className="w-full flex-row justify-start items-start gap-[3.86px] inline-flex">
                        <div className="flex-shrink-0">
                          <img src="/Tool.svg" alt="" />
                        </div>
                        <div className="flex flex-col gap-[3.86px]">
                          <div className="w-[57.44px] h-[5.34px] bg-[#e8e8ea] rounded" />
                          <div className="w-[57.44px] h-[5.34px] bg-[#e8e8ea] rounded" />
                          <div className="w-[32.06px] h-[5.34px] bg-[#e8e8ea] rounded" />
                        </div>
                      </div>
                    </div>
                    <div className="w-[134.05px] px-[11.87px] py-[7.91px] justify-start items-center gap-[13.36px] inline-flex">
                      <div className="w-[15.83px] h-[15.83px] relative" />
                      <div className="w-full flex-row justify-start items-start gap-[3.86px] inline-flex">
                        <div className="flex-shrink-0">
                          <img src="/Tool.svg" alt="" />
                        </div>
                        <div className="flex flex-col gap-[3.86px]">
                          <div className="w-[57.44px] h-[5.34px] bg-[#e8e8ea] rounded" />
                          <div className="w-[57.44px] h-[5.34px] bg-[#e8e8ea] rounded" />
                          <div className="w-[32.06px] h-[5.34px] bg-[#e8e8ea] rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bg-white shadow-lg rounded-lg w-[134.05px] top-[40%] right-[1%] z-0">
                  <div className="w-[134.05px] h-[34.74px] px-[11.87px] pt-[15.83px] pb-[7.91px] justify-start items-center inline-flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                      <div className="self-stretch text-[#212636] text-[8.90px] font-medium leading-[10.68px]">
                        What’s Nearby?
                      </div>
                    </div>
                  </div>
                  <div className="w-[134.05px] h-12 px-[11.87px] py-[7.91px] justify-center items-center gap-[16.82px] inline-flex">
                    <img
                      className="w-[25.22px] h-[25.22px] rounded-[66.37px] border border-black/10"
                      src="/{11C21EFE-754A-483E-9649-CFBF04D4B9A8}.png"
                    />
                    <img
                      className="w-[25.22px] h-[25.22px] rounded-[66.37px] border border-black/10"
                      src="/{AF5AEBF0-9B52-49F8-BD62-0249B925C52B}.png"
                    />
                    <img
                      className="w-[25.22px] h-[25.22px] rounded-[66.37px] border border-black/10"
                      src="/{DEDFAD32-DA7B-4016-9CBD-D17D56F97A38}.png"
                    />
                  </div>
                </div>

                <div className="absolute bg-white shadow-lg rounded-lg w-[134.05px] top-[20%] left-[15%] z-0">
                  <div className="w-[134.05px] h-[34.74px] px-[11.87px] pt-[15.83px] pb-[7.91px] justify-start items-center inline-flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                      <div className="self-stretch text-[#212636] mb-2 text-[8.90px] font-bold leading-[10.68px]">
                        Mobile and Broadband
                      </div>
                    </div>
                  </div>
                  <div className="w-[134.05px] h-12 px-[11.87px] py-[7.91px] justify-center items-center gap-[16.82px] inline-flex">
                    <img src="/signal-icon-png-15.jpg" alt="" width={80} height={70} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center md:p-8 w-full px-4 sm:px-6">
          <div className="w-full flex items-center justify-center p-5">
            <Chip variant="flat" color="secondary">
              Two-Col Features
            </Chip>
          </div>
          <div className="w-full justify-center">
            <h2 className="text-2xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">
              Supercharge Your Workflows
            </h2>
            <p className="text-md mt-4 text-slate-600 text-center">
              Unlock your team's true potential with our state-of-the-art SaaS platform. From intelligent task management to real-time collaboration and top-notch data security, we have everything you need to streamline your workflows and achieve high productivity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 py-10 justify-center items-center">
            <div className="flex justify-center items-center">
              <img src="MainPageImg/1stImg.png" alt="" />
            </div>
            <div className="flex justify-center items-center">
              <div className="max-w-lg">
                <span className="bg-purple-100 border-purple-200 border text-purple-600 -ml-px rounded-full text-xs font-medium px-3 py-1">
                  Simplified Decision Making
                </span>
                <h3 className="text-2xl font-medium mt-4">
                  Extensive Property Data Insights at Your Fingertips
                </h3>
                <p className="mt-4 text-slate-600">
                  Make informed decisions with our AI-powered platform. Get real-time insights, predictive analytics, and smart data visualization to maximize your ROI.
                </p>
                <ul className="grid mt-6 text-left gap-y-4">
                  <li className="flex items-center gap-3 text-neutral-800">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                      <symbol id="ai:ph:check-circle-fill">
                        <path
                          fill="currentColor"
                          d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                        />
                      </symbol>
                      <use xlinkHref="#ai:ph:check-circle-fill"></use>
                    </svg>
                    <span className="text-sm">Real-time Property Insights and Analytics</span>
                  </li>
                  <li className="flex items-center gap-3 text-neutral-800">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                      <use xlinkHref="#ai:ph:check-circle-fill"></use>
                    </svg>
                    <span className="text-sm">Predictive Analytics and Forecasting</span>
                  </li>
                  <li className="flex items-center gap-3 text-neutral-800">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
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
                    <span>Get Started For Free</span>
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

          <div className="grid md:grid-cols-2 py-10 justify-center items-center">
            <div className="grid place-items-center pb-10">
              <img src="/thirdsection.png" alt="" />
            </div>
            <div className="grid place-items-center">
              <div className="max-w-lg">
                <span className="bg-purple-100 border-purple-200 border text-purple-600 -ml-px rounded-full text-xs font-medium px-3 py-1">
                  ROI and Investment Analysis
                </span>
                <h3 className="text-2xl font-medium mt-4">
                  Supercharge Your Investment Decisions with AI-driven Insights
                </h3>
                <p className="mt-4 text-slate-600">
                  Make informed investment decisions with our AI-powered platform. Get real-time
                  insights, predictive analytics, and smart data visualization to maximize your ROI.
                </p>
                <ul className="grid mt-6 text-left gap-y-4">
                  <li className="flex items-center gap-3 text-neutral-800">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                      <use xlinkHref="#ai:ph:check-circle-fill"></use>
                    </svg>
                    <span className="text-sm">Real-time Investment Insights and Analytics</span>
                  </li>
                  <li className="flex items-center gap-3 text-neutral-800">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                      <use xlinkHref="#ai:ph:check-circle-fill"></use>
                    </svg>
                    <span className="text-sm">Predictive Analytics and Forecasting</span>
                  </li>
                  <li className="flex items-center gap-3 text-neutral-800">
                    <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
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
                    <span>Get Started for Free</span>
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

        <div className="flex flex-col justify-center mt-12 w-full px-2 sm:px-2 lg:px-8 rounded-2xl">
          <div className="grid lg:grid-cols-2 gap-2 sm:gap-4 p-4 sm:p-6 lg:p-8 bg-white justify-center items-center">
            <div className="flex flex-col gap-4 sm:gap-6 sm:pl-4 lg:pl-12">
              <span className="bg-purple-100 border-purple-200 border text-purple-600 w-fit rounded-full text-sm font-medium px-3 py-1">
                Ask about a home
              </span>
              <h3 className="text-2xl font-medium mt-4">
                Ask any Questions related to any property with the help of AI
              </h3>
              <ul className="grid mt-6 text-left gap-y-2 sm:gap-y-4">
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                    <symbol id="ai:ph:check-circle-fill">
                      <path
                        fill="currentColor"
                        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                      />
                    </symbol>
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm sm:text-xs">Who lives in this neighbourhood?</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5 flex-shrink-0">
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm sm:text-xs flex-grow">
                    What planning applications have been approved? Permit history?
                  </span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm sm:text-xs">How's the air quality?</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center items-center">
              <img className="w-full h-auto" src="/MainPageImg/4cardsImage.png" alt="Placeholder" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-2 sm:gap-4 p-4 sm:p-6 lg:p-8 bg-white mt-8 justify-center items-center">
            <div className="relative flex flex-col gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 flex items-center justify-center">
                <img className="w-full rounded-xl" src="/MainPageImg/homeTypeAsset.png" alt="Chart" />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 sm:pl-4 lg:pl-12">
              <span className="bg-purple-100 border-purple-200 border text-purple-600 w-fit rounded-full text-sm font-medium px-3 py-1">
                Look for a home
              </span>
              <h3 className="text-2xl font-medium mt-4">
                Find the perfect home with our AI-powered search engine and data insights
              </h3>
              <ul className="grid mt-6 text-left gap-y-2 sm:gap-y-4">
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                    <symbol id="ai:ph:check-circle-fill">
                      <path
                        fill="currentColor"
                        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                      />
                    </symbol>
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm">Show me family-friendly neighbourhoods</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm">How's the market right now?</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm">Is this a good place to live?</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-neutral-800">
                  <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                    <use xlinkHref="#ai:ph:check-circle-fill"></use>
                  </svg>
                  <span className="text-sm">Tell me more about this neighbourhood</span>
                </li>
              </ul>
            </div>
          </div>
        </div>




        <div className="mt-24">
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
            Client <span className="text-indigo-600">Testimonials</span>
          </h2>
          <p className="text-lg mt-4 text-slate-600 text-center">
            HomePortFolio has helped thousands of customers find their dream homes. Here's what they have to say about us.
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



        <div className="mt-24">
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
            Interactive <span className="text-indigo-600">Visualizations</span>
          </h2>
          <p className="text-lg mt-4 text-slate-600 text-center">
            Get a bird's eye view of your property data with our interactive visualizations
          </p>
        </div>

        <div className="grid col-span-1 grid-cols-1 lg:grid-cols-2 gap-8 mt-8 justify-items-center">
          <div className="rounded-2xl relative bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md h-[350px] flex flex-col justify-between snap-start shrink-0">
            <img
              src="/mapImgs/map1.png"
              alt="Flood Risks"
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="pb-1 flex flex-col text-center">
              <p className="text-xl font-bold">Flood Risks</p>
              <p>Find out how your future neighbourhood is at risks of flooding from rivers and seas</p>
            </div>
          </div>

          <div className="rounded-2xl relative bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md h-[350px] flex flex-col justify-between snap-start shrink-0">
            <img
              src="/mapImgs/noise.png"
              alt="Noise Level"
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="pb-1 flex flex-col text-center">
              <p className="text-xl font-bold">Noise Level</p>
              <p>Learn How Loud your future neighbourhood will sound.</p>
            </div>
          </div>

          <div className="rounded-2xl relative bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md h-[350px] flex flex-col justify-between snap-start shrink-0">
            <img
              src="/mapImgs/map2.png"
              alt="EV Friendly Neighborhood"
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="w-full h-[80px] rounded-xl flex flex-col items-center justify-center pt-2 px-4">
              <div className="text-center text-[#040815] text-lg font-semibold leading-tight mb-1">
                EV Friendly neighborhood
              </div>
              <div className="text-center">
                <span className="text-[#191d23] text-sm font-medium">
                  Find homes nearby of electric charging stations
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl relative bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[calc(100vw-5.75rem)] max-w-md h-[350px] flex flex-col justify-between snap-start shrink-0">
            <div className="w-full flex justify-center items-start gap-4 p-2">
              <div className="flex flex-col gap-2">
                <div className="bg-white rounded-xl shadow border border-black/10 flex flex-col p-4">
                  <div className="text-sm font-medium">Investment Potential</div>
                  <div className="mt-4 h-10">
                    <img
                      src="/Series=2, Chart type=Line wavy (1).svg"
                      alt=""
                      width={134.05}
                      height={75.19}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow border border-black/10 flex flex-col p-4">
                  <div className="text-sm font-medium">Planning Applications</div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <img src="/Tool.svg" alt="" />
                      <div className="h-1 w-full bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <img src="/Tool.svg" alt="" />
                      <div className="h-1 w-full bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white rounded-xl shadow border border-black/10 p-4 w-40 flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 text-center font-bold">Flood Risk</div>
                  <div className="mt-2 bg-green-200 text-green-600 text-sm font-bold px-4 py-1 rounded-full">
                    Low
                  </div>
                  <img
                    src="/flood 987 (1).png"
                    alt="Flood Risk"
                    className="mt-4 w-20 h-24 object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow border border-black/10 flex flex-col p-4">
                  <div className="text-sm font-medium">What’s Nearby?</div>
                  <div className="flex items-center justify-around mt-4">
                    <img
                      src="/{11C21EFE-754A-483E-9649-CFBF04D4B9A8}.png"
                      alt="Nearby 1"
                      className="w-6 h-6 rounded-full border border-gray-200"
                    />
                    <img
                      src="/{AF5AEBF0-9B52-49F8-BD62-0249B925C52B}.png"
                      alt="Nearby 2"
                      className="w-6 h-6 rounded-full border border-gray-200"
                    />
                    <img
                      src="/{DEDFAD32-DA7B-4016-9CBD-D17D56F97A38}.png"
                      alt="Nearby 3"
                      className="w-6 h-6 rounded-full border border-gray-200"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow border border-black/10 flex flex-col p-4">
                  <div className="text-xs font-medium">Mobile and Broadband</div>
                  <div className="flex items-center justify-start h-14">
                    <img src="/signal-icon-png-15.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-24">
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
            Our <span className="text-indigo-600">Data Souces</span>
          </h2>
          <p className="text-lg mt-4 text-slate-600 text-center">
            We pull data from the best sources to provide you with the most accurate and up-to-date information.
          </p>
        </div>
        <section className="mx-auto  w-full max-w-6xl px-6 py-20 sm:py-32 lg:px-8 lg:py-40">
      <ScrollingBanner shouldPauseOnHover gap="40px">
      
      {
        DataSources.map((source, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
              <img src={source.image} alt="partner" className="w-auto h-20" />
          </div>
        ))
      }
      </ScrollingBanner>
    </section>



        <div className="w-[100vw] bg-gradient-to-bl from-indigo-900 to-indigo-700 p-8 md:px-20 md:py-20 mt-20 flex flex-col items-center text-center">
          <h2 className="text-white text-4xl md:text-6xl tracking-tight">Build faster websites.</h2>
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
