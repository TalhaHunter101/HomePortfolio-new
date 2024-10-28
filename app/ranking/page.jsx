'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Chip, Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AutocompleteSearch from '../autocompleteSearchBar';
import { motion } from 'framer-motion';
import RankingAutoCompleteSearch from '@/components/Ranking/RankingAutoCompleteSearch';

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

let dummyData = {
  "neighborhoods": {
    "Austin": [
      { "name": "Crestview", "guideUrl": "/guides/crestview" },
      { "name": "Allandale", "guideUrl": "/guides/allandale" },
      { "name": "North Loop", "guideUrl": "/guides/north-loop" }
    ],
    "Atlanta": [
      { "name": "Buckhead Village", "guideUrl": "/guides/buckhead-village" },
      { "name": "Summerhill", "guideUrl": "/guides/summerhill" },
      { "name": "Westview", "guideUrl": "/guides/westview" },
      { "name": "East Atlanta", "guideUrl": "/guides/east-atlanta" }
    ]
  }
}

export default function RankingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to /ranking/[county]
      router.push(`/ranking/${searchQuery}`);
    }
  };

  const [guides, setGuides] = useState(dummyData.neighborhoods);


  return (
    // <div className="max-w-[87rem] mt-20 mx-auto flex flex-col items-center justify-center">
    //   <h1 className="text-5xl font-bold text-center">Best Places To Live</h1>
    //   <p className="mt-4 text-center text-lg text-gray-600 p-4">
    //   Location, location, location: it’s key in finding the best place to live, as is price. That&#39;s why we’ve ranked the top 10 cheapest, most affordable, and most expensive areas to live in across America - with all the stats to back it up. Whether you want to splurge or save, find your ideal area now.
    //   </p>
    //   <form className="mt-8 w-full max-w-lg" onSubmit={handleSearch}>
    //     <Input
    //       variant="bordered"
    //       onSubmit={handleSearch}
    //       clearable
    //       fullWidth
    //       size="lg"
    //       placeholder="Search for city or county"
    //       value={searchQuery}
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //       endContent={<Icon onClick={handleSearch} className='cursor-pointer' icon="ic:baseline-search" height={24} width={24} />}
    //     />
    //   </form>
    // </div>
    <div>
   <div className="relative mt-16 w-screen justify-center min-h-[40vh] md:min-h-[80vh] lg:min-h-[50vh] xl:min-h-[40vh] px-4 sm:px-6">
    <div
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url('/bg-plain-banner.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
      className="flex items-center justify-center pt-8 bg-background min-h-[40vh] md:min-h-[80vh] lg:min-h-[50vh] xl:min-h-[40vh]   px-4 sm:px-6"
    >
      <div className="flex flex-col justify-center items-center w-full max-w-screen-xl mx-auto px-5">
        <div className="place-items-center h-auto relative p-8 flex flex-col justify-center items-center h-full w-full min-w-[95vw] z-10 px-4 sm:px-6">
          <Chip variant="flat" color="secondary" className="mb-2">
            AI-Powered Place Ranking system
          </Chip>
          <h1
            style={{ lineHeight: "1.25" }}
            className="leading-6 text-lg md:text-3xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center z-10"
          >
         Best Places To Live
          </h1>
          <p className="mt-4 text-sm md:text-lg lg:text-xl text-slate-600 text-center z-10">
          Location, location, location: it’s key in finding the best place to live, as is price.
          <br/>
           That&#39;s why we’ve ranked the top 10 cheapest, most affordable, and most expensive areas to live in across UK - with all the stats to back it up.
           <br/>
            Whether you want to splurge or save, find your ideal area now.
          </p>
          <div className="mt-2 w-full sm:max-w-[90vw] md:max-w-[60vw] lg:max-w-[800px] flex justify-center gap-3 z-10">
            <RankingAutoCompleteSearch />
          </div>
        </div>

      </div> 
    </div>
  </div>
  

  {/* <div className="p-8 max-w-[87rem] mx-auto">
      Neighborhood Guides Section
      {Object.entries(guides).map(([city, neighborhoods], index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-600 mb-8">
            {city} Neighborhood Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {neighborhoods.map((neighborhood, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card
                  variant="flat"
                  isPressable
                  className="bg-gradient-to-b from-black to-gray-800 text-white p-8 rounded-lg shadow-md h-64 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      {neighborhood.name} Guide
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    color="primary"
                    endContent={<Icon icon="ic:outline-arrow-forward-ios" />}
                    className="self-start"
                  >
                    Show me
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div> */}
    </div>
 







  );
}
