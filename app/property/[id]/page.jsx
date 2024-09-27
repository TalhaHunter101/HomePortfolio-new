"use client";
import React, { useEffect, useState, useRef } from "react";

import Footer from "@/components/common/Footer/Footer";

import PropertyDisplay from "@/components/Property/PropertyDisplay";
import { Spinner } from "@nextui-org/react";
import { marketInfoStore } from "@/store/listingStore";

export default function PropertyPage({ params }) {
  // const listingDatasa = {
  //   listingId: "68139054",
  //   administrationFees: null,
  //   detailedDescription:
  //     "Luxuriate in the opulence of this exquisite two-bedroom penthouse offering breathtaking panoramic views that stretch out before you. The well-appointed open-plan living area boasts a stylish fitted kitchen, making it an ideal space for social gatherings and entertaining friends and family. Bedroom one is a peaceful sanctuary with a private balcony overlooking the marina, complemented by a chic en-suite and a bespoke dressing room that exudes elegance. Meanwhile, bedroom two features fitted wardrobes and its own stylish en-suite. Natural light floods the airy entrance hall, creating an inviting ambience that welcomes you home. The seamless blend of functionality and sophistication is evident with residents benefiting from full access to an on-site gym, swimming pool, and sauna.<br><br>Step outside onto the balcony to savour the idyllic views of the marina, providing a soothing backdrop for relaxation and peaceful contemplation. The property includes an allocated parking space for added convenience, with additional visitors parking available. This urban oasis offers not just a home, but an exclusive lifestyle, with the opportunity to purchase or rent a mooring and garage enhancing the allure of this exceptional residence. Residents can also enjoy the tranquil residents' garden, complete with a BBQ area and exclusive social events that foster a sense of community and belonging. Make this penthouse your own and elevate your living experience to new heights with unparallelled luxury and comfort at every turn.<br><br>EPC Rating: C<br><br><strong>Location</strong><br><br>Port Solent provides a relaxed lifestyle and is centred around a marina of the same name. The commercial hub is The Boardwalk providing shopping, bars, restaurants as well as independent shops and boutiques, a multi screen cinema with a David Lloyd gym and swimming pool, all onsite and within close proximity to Portsmouth City Centre. Port Solent Country Park along Portchester Lake has meadows and cycle trails. Excellent transport links are provided nearby via the A3(M) and the M27 and Cosham train station is located a few miles away.<br><br><strong>Balcony</strong><br><br>Balcony overlooking the marina<br><br><strong>Parking - Allocated Parking</strong><br><br>1 Allocated parking space and visitors parking available",
  //   metaTitle:
  //     "2 bed property for sale in Port Way, Port Solent PO6, £700,000 - Zoopla",
  //   metaDescription:
  //     "2 bed property for sale in Port Way, Port Solent PO6, selling for £700,000 from Henry Adams - Emsworth. See property details on Zoopla or browse all our range of properties in Port Way, Port Solent PO6.",
  //   category: "residential",
  //   listingUris: {
  //     detail: "/for-sale/details/68139054/",
  //     __typename: "ListingUris",
  //     contact: "/for-sale/contact/68139054/",
  //   },
  //   title: "2 bed property for sale",
  //   publicationStatus: "Live",
  //   counts: {
  //     numBedrooms: 2,
  //     numBathrooms: 2,
  //     numLivingRooms: 1,
  //     __typename: "RoomCount",
  //   },
  //   viewCount: {
  //     viewCount30day: 0,
  //     __typename: "ViewCount",
  //   },
  //   ntsInfo: [
  //     {
  //       title: "Tenure",
  //       value: "Leasehold (114 years)",
  //       __typename: "NtsInfoItem",
  //     },
  //     {
  //       title: "Service charge",
  //       value: "£6,000 per year",
  //       __typename: "NtsInfoItem",
  //     },
  //     {
  //       title: "Council tax band",
  //       value: "G",
  //       __typename: "NtsInfoItem",
  //     },
  //     {
  //       title: "Ground rent",
  //       value: "£909",
  //       __typename: "NtsInfoItem",
  //     },
  //     {
  //       title: "Ground rent date of next review",
  //       value: "Not available",
  //       __typename: "NtsInfoItem",
  //     },
  //   ],
  //   derivedEPC: {
  //     efficiencyRating: "C",
  //     __typename: "DerivedEPC",
  //   },
  //   branch: {
  //     branchId: "3801",
  //     address: "15 North Street, Emsworth",
  //     branchDetailsUri:
  //       "/find-agents/branch/henry-adams-emsworth-emsworth-3801/",
  //     branchResultsUri: "/for-sale/branch/henry-adams-emsworth-emsworth-3801/",
  //     logoUrl: "https://st.zoocdn.com/zoopla_static_agent_logo_(753612).png",
  //     phone: "01243 468907",
  //     name: "Henry Adams - Emsworth",
  //     postcode: "PO10 7BY",
  //     memberType: "agent",
  //     attributes: {
  //       embeddedContentIsBlacklisted: false,
  //       showOverseasListingExactLocation: false,
  //       __typename: "BranchAttributes",
  //     },
  //     profile: {
  //       details:
  //         "We&rsquo;re lucky to be set in this small but busy town on the edge of Chichester Harbour on the border between West Sussex to the East and Hampshire to the West. From Henry Adams Emsworth we also cover the rural villages of Westbourne and Rowlands Castle on the threshold of the South Downs, as well as Hayling Island with its fabulous beaches and panoramic sea views. Katie Cummings is the manager of our Emsworth branch and brings 22 years of experience selling property in the area. Also in the Emsworth Henry Adams branch are Matthew Inker, Emilia Widgery and Helen Wilkins. Henry Adams has been providing a wide range of property services since 1989, now including residential sales, lettings, commercial, land &amp; new homes, planning, agricultural and surveying. We pride ourselves in our innovative marketing and dedication to customer service from our network of offices, all geared towards achieving a successful outcome for every client and customer. As well as our sales professionals, Henry Adams Holiday Lets team and Residentials Lettings team are based here in Emsworth. We use a complete range of promotional strategies to make sure your home will reach the right buyers so if you&rsquo;d like to find out more about how Henry Adams is simply different, please get in touch.",
  //       __typename: "AgentProfile",
  //     },
  //     __typename: "AgentBranch",
  //   },
  //   __typename: "ListingData",
  //   analyticsTaxonomy: {
  //     acorn: 13,
  //     acornType: 13,
  //     areaName: "Port Solent, Portsmouth",
  //     bedsMax: 2,
  //     bedsMin: 2,
  //     branchId: 3801,
  //     branchLogoUrl:
  //       "https://st.zoocdn.com/zoopla_static_agent_logo_(753612).png",
  //     branchName: "Henry Adams - Emsworth",
  //     brandName: "Henry Adams",
  //     chainFree: false,
  //     companyId: 6290,
  //     countryCode: "gb",
  //     countyAreaName: "Hampshire",
  //     currencyCode: "GBP",
  //     displayAddress: "Port Way, Port Solent PO6",
  //     furnishedState: "",
  //     groupId: null,
  //     hasEpc: false,
  //     hasFloorplan: true,
  //     incode: "4TF",
  //     isRetirementHome: false,
  //     isSharedOwnership: false,
  //     listingCondition: "pre-owned",
  //     listingId: 68139054,
  //     listingsCategory: "residential",
  //     listingStatus: "for_sale",
  //     location: "Port Solent",
  //     memberType: "agent",
  //     numBaths: 2,
  //     numBeds: 2,
  //     numImages: 36,
  //     numRecepts: 1,
  //     outcode: "PO6",
  //     postalArea: "PO",
  //     postTownName: "Portsmouth",
  //     priceActual: 700000,
  //     price: 700000,
  //     priceMax: 700000,
  //     priceMin: 700000,
  //     priceQualifier: "offers_in_region_of",
  //     propertyHighlight: "",
  //     propertyType: "",
  //     regionName: "South East England",
  //     section: "for-sale",
  //     sizeSqFeet: "",
  //     tenure: "leasehold",
  //     uuid: "75875D68-25D7-4C49-B0D1-F133710B4F19",
  //     zindex: 382355,
  //     __typename: "ListingAnalyticsTaxonomy",
  //   },
  //   adTargeting: {
  //     acorn: 13,
  //     acornType: 13,
  //     areaName: "Port Solent, Portsmouth",
  //     bedsMax: 2,
  //     bedsMin: 2,
  //     branchId: 3801,
  //     branchLogoUrl:
  //       "https://st.zoocdn.com/zoopla_static_agent_logo_(753612).png",
  //     branchName: "Henry Adams - Emsworth",
  //     brandName: "Henry Adams",
  //     chainFree: false,
  //     companyId: 6290,
  //     countryCode: "gb",
  //     countyAreaName: "Hampshire",
  //     currencyCode: "GBP",
  //     displayAddress: "Port Way, Port Solent PO6",
  //     furnishedState: "",
  //     groupId: null,
  //     hasEpc: false,
  //     hasFloorplan: true,
  //     incode: "4TF",
  //     isRetirementHome: false,
  //     isSharedOwnership: false,
  //     listingCondition: "pre-owned",
  //     listingId: 68139054,
  //     listingsCategory: "residential",
  //     listingStatus: "for_sale",
  //     location: "Port Solent",
  //     memberType: "agent",
  //     numBaths: 2,
  //     numBeds: 2,
  //     numImages: 36,
  //     numRecepts: 1,
  //     outcode: "PO6",
  //     postalArea: "PO",
  //     postTownName: "Portsmouth",
  //     priceActual: 700000,
  //     price: 700000,
  //     priceMax: 700000,
  //     priceMin: 700000,
  //     priceQualifier: "offers_in_region_of",
  //     propertyHighlight: "",
  //     propertyType: "",
  //     regionName: "South East England",
  //     section: "for-sale",
  //     sizeSqFeet: "",
  //     tenure: "leasehold",
  //     uuid: "75875D68-25D7-4C49-B0D1-F133710B4F19",
  //     zindex: 382355,
  //     __typename: "ListingAnalyticsTaxonomy",
  //   },
  //   analyticsEcommerce: {
  //     brand: "Henry Adams",
  //     category: "for-sale/resi/agent/pre-owned/gb",
  //     id: 68139054,
  //     name: "FS_Contact",
  //     price: 1,
  //     quantity: 1,
  //     variant: "standard",
  //     __typename: "ListingAnalyticsEcommerce",
  //   },
  //   pricing: {
  //     isAuction: false,
  //     qualifier: "offers_in_region_of",
  //     priceQualifierLabel: "Offers in region of",
  //     internalValue: 700000,
  //     rentFrequencyLabel: null,
  //     valueLabel: "£700,000",
  //     currencyCode: "GBP",
  //     originalCurrencyPrice: null,
  //     pricePerFloorAreaUnit: null,
  //     alternateRentFrequencyPrice: null,
  //     __typename: "ListingPricing",
  //     label: "£700,000",
  //   },
  //   epc: {
  //     image: null,
  //     pdf: null,
  //     __typename: "EPC",
  //   },
  //   features: {
  //     bullets: [
  //       "Luxury Two Bedroom Penthouse With Stunning Panoramic Views",
  //       "Full Use Of Residents Gym/ Swimming Pool &amp; Sauna",
  //       "Residents Garden / BBQ and Exclusive Social Events",
  //       "Open Plan Living With Stylish Fitted Kitchen Perfect For Socializing",
  //       "Bedroom One With Balcony Providing Views Across the Marina",
  //       "Stylish En-Suite &amp; Bespoke Dressing Room To Main Bedroom",
  //       "Bedroom Two With Fitted Wardrobes &amp; Stylish En-Suite",
  //       "Light &amp; Spacious Entrance Hall",
  //       "Allocated Parking &amp; Visitors Parking",
  //       "Opportunity to Purchase or Rent Mooring &amp; Garage",
  //     ],
  //     flags: {
  //       furnishedState: null,
  //       studentFriendly: false,
  //       tenure: {
  //         name: "leasehold",
  //         label: "Leasehold",
  //         __typename: "Label",
  //       },
  //       availableFromDate: null,
  //       __typename: "FeatureFlag",
  //     },
  //     highlights: null,
  //     __typename: "Features",
  //   },
  //   floorPlan: {
  //     image: [
  //       {
  //         filename: "20a17fae57b1ba062bb3dfa991c36b1936f03f7a.jpg",
  //         caption: null,
  //         __typename: "Media",
  //       },
  //     ],
  //     links: null,
  //     pdf: null,
  //     __typename: "FloorPlan",
  //   },
  //   floorArea: null,
  //   content: {
  //     virtualTour: [
  //       {
  //         original:
  //           "https://nichecom.s3.eu-west-1.amazonaws.com/cat1000/2024/08/22/66c70c51d4ac3-1176733.mp4",
  //         caption: "Virtual Tour",
  //         url: null,
  //         filename: null,
  //         type: "virtual_tour",
  //         __typename: "Media",
  //       },
  //     ],
  //     floorPlan: [
  //       {
  //         original:
  //           "https://lc.zoocdn.com/20a17fae57b1ba062bb3dfa991c36b1936f03f7a.jpg",
  //         caption: null,
  //         url: null,
  //         filename: "20a17fae57b1ba062bb3dfa991c36b1936f03f7a.jpg",
  //         type: "floor_plan",
  //         __typename: "Media",
  //       },
  //     ],
  //     audioTour: null,
  //     __typename: "MediaContent",
  //   },
  //   propertyImage: [
  //     {
  //       original:
  //         "https://lc.zoocdn.com/eaaa3696bb5f435f112c6fbe46bee82da516c7be.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "eaaa3696bb5f435f112c6fbe46bee82da516c7be.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/c0009d0f2c0240fe45095a5bee2295e63ec6f4ae.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "c0009d0f2c0240fe45095a5bee2295e63ec6f4ae.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/b2b3c1b86b104f99bddcd580ff33d9ce22ac5d27.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "b2b3c1b86b104f99bddcd580ff33d9ce22ac5d27.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/ac42f00f3b614198a17809b8151eb00f04f1edd6.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "ac42f00f3b614198a17809b8151eb00f04f1edd6.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/f78e114cbd41510e7a165b9c46012a0a4b157144.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "f78e114cbd41510e7a165b9c46012a0a4b157144.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/8be8fbcb9ef5848e788d91a2fbfc513fe39cfb59.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "8be8fbcb9ef5848e788d91a2fbfc513fe39cfb59.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/a1ae8edcb5b55ecfb64ac58388e2c67b9e397430.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "a1ae8edcb5b55ecfb64ac58388e2c67b9e397430.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/2322a601e353243fbf112ad50144c38afca9f2a9.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "2322a601e353243fbf112ad50144c38afca9f2a9.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/1c921c3edeb7fb1fb21175d8fae543708e9c995b.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "1c921c3edeb7fb1fb21175d8fae543708e9c995b.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/5e9222cb098e3f64ff21fb957ef0be4d0ef85d09.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "5e9222cb098e3f64ff21fb957ef0be4d0ef85d09.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/8f5b42ccbde86f5be67de0ad3be3e796847f0f95.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "8f5b42ccbde86f5be67de0ad3be3e796847f0f95.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/3d608f131ca0f0921cf8b9cf462b828d834f2c90.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "3d608f131ca0f0921cf8b9cf462b828d834f2c90.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/6c9ba9bd7894ea852ca63e1c9c674c4ebfdd7145.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "6c9ba9bd7894ea852ca63e1c9c674c4ebfdd7145.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/6945cfc5b323998d2bd5971acf710a337542251c.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "6945cfc5b323998d2bd5971acf710a337542251c.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/5cb76122551c7fed2a1b078c08cbc389ad69355a.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "5cb76122551c7fed2a1b078c08cbc389ad69355a.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/6a05936988aad7d929e617dd65c52edfd50a55bf.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "6a05936988aad7d929e617dd65c52edfd50a55bf.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/af198998c10a7651e26b2d6c4f76476ca8e34160.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "af198998c10a7651e26b2d6c4f76476ca8e34160.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/2c511d5176902ec8c16b5f8ec7ce1d3545399df7.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "2c511d5176902ec8c16b5f8ec7ce1d3545399df7.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/d74fa4fe515461af13cf703fb0cfe67db531e0be.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "d74fa4fe515461af13cf703fb0cfe67db531e0be.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/7a372e3313205c693b9240f789ea59b25fa4ce8a.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "7a372e3313205c693b9240f789ea59b25fa4ce8a.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/49e6e3482c6876a1848eb4bbede885d5ed3649bd.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "49e6e3482c6876a1848eb4bbede885d5ed3649bd.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/9b27e159aea779e4de8b59987393136b6284d77f.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "9b27e159aea779e4de8b59987393136b6284d77f.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/9ca6bea17498c9400fd36dcf8ed0626f315976fe.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "9ca6bea17498c9400fd36dcf8ed0626f315976fe.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/9e9cf717c307b416f02666696ab766c30b9466bd.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "9e9cf717c307b416f02666696ab766c30b9466bd.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/86d0642afb87e85015b0c8d63cf6e3c7d83bf864.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "86d0642afb87e85015b0c8d63cf6e3c7d83bf864.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/9ffa365d25360ebfacdb42a9ef2e711a3015872c.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "9ffa365d25360ebfacdb42a9ef2e711a3015872c.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/d4826b579fc2e9726dc51a1b1891d6612c7ca7f7.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "d4826b579fc2e9726dc51a1b1891d6612c7ca7f7.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/9356e025df7dfb9a35ac5ec3b3c739fd2bd05dcd.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "9356e025df7dfb9a35ac5ec3b3c739fd2bd05dcd.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/56ffae60475b4ad47aabb8691e96b3b60d8ee9d7.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "56ffae60475b4ad47aabb8691e96b3b60d8ee9d7.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/7a432a7583bbf5d5ce64e41c2d187a60013efb04.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "7a432a7583bbf5d5ce64e41c2d187a60013efb04.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/8446f812c3a9f96ffd419d1e0807ca9c9fb6a94e.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "8446f812c3a9f96ffd419d1e0807ca9c9fb6a94e.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/7741c3b8c076fcd8d49b1a8e647f76ce965b23d7.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "7741c3b8c076fcd8d49b1a8e647f76ce965b23d7.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/19344a51e290928e72e8f2b2260bdb89487fa98a.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "19344a51e290928e72e8f2b2260bdb89487fa98a.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/eed5361045e622464ea9e9602c2c4be29a61c846.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "eed5361045e622464ea9e9602c2c4be29a61c846.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/3211d9a51285e3ca3966a445cb28242aa09b2b74.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "3211d9a51285e3ca3966a445cb28242aa09b2b74.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //     {
  //       original:
  //         "https://lc.zoocdn.com/b48a4483274bfe85a503987004b04ae14d0ed5c3.jpg",
  //       caption: null,
  //       url: null,
  //       filename: "b48a4483274bfe85a503987004b04ae14d0ed5c3.jpg",
  //       type: "property_image",
  //       __typename: "Media",
  //     },
  //   ],
  //   additionalLinks: [],
  //   location: {
  //     coordinates: {
  //       isApproximate: false,
  //       latitude: 50.841411,
  //       longitude: -1.09502,
  //       __typename: "LocationCoordinates",
  //     },
  //     postalCode: "PO6 4TF",
  //     streetName: "Flat 75, Oyster Quay Port Way",
  //     countryCode: "GB",
  //     propertyNumberOrName: null,
  //     townOrCity: "Portsmouth",
  //     __typename: "ListingLocation",
  //     uprn: null,
  //   },
  //   embeddedContent: {
  //     videos: [
  //       {
  //         original:
  //           "https://nichecom.s3.eu-west-1.amazonaws.com/cat1000/2024/08/22/66c70c51d4ac3-1176733.mp4",
  //         caption: "Virtual Tour",
  //         url: "https://nichecom.s3.eu-west-1.amazonaws.com/cat1000/2024/08/22/66c70c51d4ac3-1176733.mp4",
  //         filename: null,
  //         type: "virtual_tour",
  //         __typename: "Media",
  //       },
  //     ],
  //     tours: null,
  //     links: null,
  //     __typename: "EmbeddedContent",
  //   },
  //   pointsOfInterest: [
  //     {
  //       title: "St Paul's Catholic Primary School",
  //       address: "Bourne Road, Paulsgrove",
  //       type: "uk_school_primary",
  //       latitude: 50.849396,
  //       longitude: -1.095931,
  //       distanceMiles: 0.6,
  //       __typename: "PointOfInterest",
  //     },
  //     {
  //       title: "Beacon View Primary Academy",
  //       address: "Allaway Avenue, Paulsgrove",
  //       type: "uk_school_primary",
  //       latitude: 50.849212,
  //       longitude: -1.088491,
  //       distanceMiles: 0.6,
  //       __typename: "PointOfInterest",
  //     },
  //     {
  //       title: "Cosham",
  //       address: null,
  //       type: "national_rail_station",
  //       latitude: 50.842084,
  //       longitude: -1.06755,
  //       distanceMiles: 1.2,
  //       __typename: "PointOfInterest",
  //     },
  //     {
  //       title: "Portchester",
  //       address: null,
  //       type: "national_rail_station",
  //       latitude: 50.848738,
  //       longitude: -1.124239,
  //       distanceMiles: 1.4,
  //       __typename: "PointOfInterest",
  //     },
  //   ],
  //   priceHistory: {
  //     firstPublished: {
  //       firstPublishedDate: "2024-08-22T13:47:02",
  //       priceLabel: "£700,000",
  //       __typename: "PriceHistoryFirstPublished",
  //     },
  //     lastSale: {
  //       date: "2016-11-25",
  //       newBuild: false,
  //       price: 415000,
  //       priceLabel: "£415,000",
  //       recentlySold: false,
  //       __typename: "PriceHistoryLastSale",
  //     },
  //     priceChanges: null,
  //     __typename: "PriceHistory",
  //   },
  //   displayAddress: "Port Way, Port Solent PO6",
  //   section: "for-sale",
  //   featurePreview: [
  //     {
  //       iconId: "bed",
  //       content: 2,
  //       __typename: "Feature",
  //     },
  //     {
  //       iconId: "bath",
  //       content: 2,
  //       __typename: "Feature",
  //     },
  //     {
  //       iconId: "chair",
  //       content: 1,
  //       __typename: "Feature",
  //     },
  //   ],
  //   imagePreview: {
  //     caption: null,
  //     src: "https://lid.zoocdn.com/645/430/eaaa3696bb5f435f112c6fbe46bee82da516c7be.jpg",
  //     __typename: "Image",
  //   },
  //   tags: [
  //     {
  //       label: "Leasehold",
  //       __typename: "ListingTag",
  //     },
  //   ],
  //   transports: [
  //     {
  //       distanceInMiles: 1.8,
  //       poiType: "national_rail_station",
  //       title: "Hilsea",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 2.1,
  //       poiType: "uk_ferry_port",
  //       title: "Portsmouth Continental Ferry Terminal",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 3,
  //       poiType: "national_rail_station",
  //       title: "Portsmouth & Southsea",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 3.1,
  //       poiType: "national_rail_station",
  //       title: "Portsmouth Harbour",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 3.1,
  //       poiType: "uk_ferry_port",
  //       title: "Portsmouth Harbour Station Pier",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 3.2,
  //       poiType: "national_rail_station",
  //       title: "Fratton",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 3.4,
  //       poiType: "uk_ferry_port",
  //       title: "Gosport Ferry Terminal",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 4.3,
  //       poiType: "national_rail_station",
  //       title: "Fareham",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 4.4,
  //       poiType: "national_rail_station",
  //       title: "Bedhampton",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 5,
  //       poiType: "national_rail_station",
  //       title: "Havant",
  //       __typename: "Transport",
  //     },
  //     {
  //       distanceInMiles: 5.6,
  //       poiType: "national_rail_station",
  //       title: "Warblington",
  //       __typename: "Transport",
  //     },
  //   ],
  //   publishedOn: "2024-08-22T13:47:02",
  //   numberOfImages: 36,
  //   statusSummary: {
  //     label: "Just added",
  //     __typename: "ListingStatusSummary",
  //   },
  // };

  const [listingData, setlistingData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { resetMarketInfo } = marketInfoStore();

  useEffect(() => {
    const fetchDatabyListId = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch("/api/indevisual/get-listing-by-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listingId: params.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setlistingData(data?._source);
          setIsDataLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDatabyListId();

    return () => {
      resetMarketInfo();
    };
  }, [params.id, resetMarketInfo]) ;
 
  return (
    <>
      {isDataLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner className="mt-20" size="lg" />
        </div>
      ) : (
        <PropertyDisplay listingData={listingData} params={params} />
      )}

      {/* <PropertyDisplay listingData={listingDatasa} params={params} /> */}
      <Footer /> 
    </>
  );
}
