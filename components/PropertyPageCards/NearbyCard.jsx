"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { NearByPlacesStatic } from "../Maps";

// Amenities list
const amenities = [
  {
    name: "Restaurants",
    icon: "ph:chef-hat-duotone",
    icon_name: "chef_hat",
    color: "blue",
    key: "restaurant",
    bg_color: "bg-blue-400",
  },
  {
    name: "Coffee",
    icon: "line-md:coffee-half-empty-filled-loop",
    icon_name: "coffee",
    color: "brown",
    key: "cafe",
    bg_color: "bg-brown-400",
  },
  {
    name: "Bars",
    icon: "fluent:drink-beer-24-regular",
    icon_name: "bar",
    color: "goldenrod",
    key: "bar",
    bg_color: "bg-desert-200",
  },
  // {
  //   name: "pubs",
  //   icon: "fluent:drink-beer-24-regular",
  //   icon_name: "bar",
  //   color: "goldenrod",
  //   key: "pub",
  //   bg_color: "bg-desert-200",
  // },
  {
    name: "Parking",
    icon: "fluent-mdl2:parking-solid",
    color: "gray",
    icon_name: "parking",
    key: "parking",
    bg_color: "bg-gray-400",
  },
  {
    name: "Groceries",
    icon: "material-symbols:grocery-sharp",
    icon_name: "grocery",
    color: "purple",
    key: "supermarket",
    bg_color: "bg-purple-400",
  },
  {
    name: "Parks",
    icon: "ic:twotone-park",
    color: "green",
    icon_name: "park",
    key: "park",
    bg_color: "bg-green-400",
  },
  {
    name: "Hospitals",
    icon: "noto-v1:hospital",
    icon_name: "hospital",
    key: "hospital",
    bg_color: "bg-red-400",
  },
  {
    name: "Fast Food",
    icon: "noto-v1:hamburger",
    icon_name: "hamburger",
    key: "fast_food",
    bg_color: "bg-yellow-400",
  },
  {
    name: "Nursery",
    icon: "ion:school-outline",
    icon_name: "Nursery",
    color: "purple",
    key: "kindergarten",
    bg_color: "bg-purple-400",
  },
];

// Dummy items for fallback when there's no fetched data
const getItemsData = () => [
  {
    name: "No Data",
  },
];

// Update the haversineDistance function
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (Number(x) * Math.PI) / 180;

  const lat1 = Number(coords1.lat);
  const lon1 = Number(coords1.lon);
  const lat2 = Number(coords2.lat);
  const lon2 = Number(coords2.lon);

  const R = 3959; // Radius of the Earth in miles (instead of 6371 km)

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in miles
};


const formatAddress = (tags) => {
  const addressParts = [];

  if (tags["addr:housenumber"]) addressParts.push(tags["addr:housenumber"]);
  if (tags["addr:street"]) addressParts.push(tags["addr:street"]);
  if (tags["addr:city"]) addressParts.push(tags["addr:city"]);
  if (tags["addr:postcode"]) addressParts.push(tags["addr:postcode"]);
  if (tags["addr:country"]) addressParts.push(tags["addr:country"]);

  return addressParts.join(", ");
}


// Fetching nearby locations (mockup function using Overpass API)
async function getNearbyLocations(
  latitude,
  longitude,
  amenity = selectedAmenity,
  radius = 3000,
  limit = 100
) {
  const overpassUrl = "https://overpass-api.de/api/interpreter";
  const overpassQuery = `
  [out:json][timeout:25];
  (
    node["amenity"="${amenity}"](around:${radius},${latitude},${longitude});
    node["shop"="${amenity}"](around:${radius},${latitude},${longitude});
    node["leisure"="${amenity}"](around:${radius},${latitude},${longitude});
    way["shop"="${amenity}"](around:${radius},${latitude},${longitude});
    way["amenity"="${amenity}"](around:${radius},${latitude},${longitude});
    way["leisure"="${amenity}"](around:${radius},${latitude},${longitude});
  );
  out center ${limit};
  >;
  `

  const postData = `data=${encodeURIComponent(overpassQuery)}`;

  try {
    const response = await fetch(overpassUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    const locations = jsonData.elements
      .filter((element) => element.tags && (element.tags.amenity || element.tags.shop))
      .map((element) => {
        let lat, lon;
        if (element.type === "node") {
          lat = element.lat;
          lon = element.lon;
        } else {
          lat = element.center.lat;
          lon = element.center.lon || element.center.lng;
        }

        const address = formatAddress(element.tags);
        const distance = haversineDistance(
          { lat, lon },
          { lat: latitude, lon: longitude }
        );

        return {
          name: element.tags.name || "na",
          amenity: element.tags.amenity || element.tags.shop || "Unknown",
          address: address,
          lat,
          lon,
          distance: !isNaN(distance) ? `${distance.toFixed(2)} mi` : "N/A",
        };
      })
      .filter((location) => location !== null);
    
    return locations;
  } catch (error) {
    throw new Error("Error fetching nearby locations: " + error.message);
  }
}

export function NearbyCard({ data, city, ShortAddress }) {
  const [locations, setLocations] = useState([]); // Dynamic locations state
  const [selectedAmenity, setSelectedAmenity] = useState(amenities[0].key);
  const [loading, setLoading] = useState(true); // Add loading state
  const [mycenter, setMycenter] = useState({
    lat: data?.location?.coordinates?.latitude,
    lng: data?.location?.coordinates?.longitude,
  });

  useEffect(() => {
    const center = {
      lat: data?.location?.coordinates?.latitude,
      lng: data?.location?.coordinates?.longitude,
    };

    setLoading(true); // Start loading before fetching data

    getNearbyLocations(center.lat, center.lng, selectedAmenity).then((locs) => {
      setLocations(locs);
      setLoading(false); // End loading after data is fetched
    });
  }, [
    selectedAmenity,
    data?.location?.coordinates?.latitude,
    data?.location?.coordinates?.longitude,
  ]);

  const items = locations.length ? locations : getItemsData();
  const nearestAmenity = items.find(
    (item) => item?.category === selectedAmenity
  );

  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          {/* Left Section: Icon and Question */}
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
              <Icon
                icon="mdi:map"
                width={16} // Adjust the icon size to fit well within the circle
                className="text-purple-700" // Adjust the icon color if needed
              />
            </div>
            <h2 className="text-xl font-bold text-gray-700">
              What’s nearby {ShortAddress}
            </h2>
          </div>

          {/* Right Section: Address Info */}
          <div className="relative mt-2 pr-2 sm:pr-10 md:pr-2 z-10 max-w-md grid grid-cols-1 items-start sm:items-center text-right">
            <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
              <div className="text-xs md:text-sm capitalize text-foreground">
                Nearest {amenities.find((a) => a.key === selectedAmenity)?.name}
              </div>
              {loading ? (
                <div className="text-base md:text-base text-foreground font-medium">
                  <Spinner size="xs" />
                </div>
              ) : nearestAmenity ? (
                <div className="text-base md:text-base text-foreground font-medium">
                  {nearestAmenity?.name} <br />
                </div>
              ) : (
                <div className="text-base md:text-base text-foreground font-medium">
                  No nearby {selectedAmenity} found
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="rounded-br-lg rounded-bl-lg pt-6 border-t-0 -mt-2 bg-gray-250">
          <section id="whats-nearby" className="mb-5 sm:mb-6">
            <div className="mx-auto w-full max-w-screen md:max-w-screen-md lg:max-w-screen-lg">
              <div className="px-0 md:px-0 md:pr-0">
                <div className="flex flex-row justify-between">
                  <div className="pl-4 md:pl-4"></div>
                </div>

                {/* Amenity selection buttons */}
                <div className="flex flex-row px-4 space-x-2 overflow-x-auto scrollbar-none mb-2">
                  {amenities.map((amenity) => (
                    <button
                      key={amenity.key}
                      onClick={() => setSelectedAmenity(amenity.key)}
                      className={`flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 ${
                        selectedAmenity === amenity.key
                          ? "text-purple-800 bg-purple-200"
                          : "text-gray-800 bg-gray-200"
                      } border border-gray-300 hover:bg-gray-200`}
                    >
                      <Icon icon={amenity.icon} />
                      <span>{amenity.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Map and list of locations */}
          <div className="z-10 w-full h-full overflow-hidden rounded-br-lg rounded-bl-lg">
            <div className="xl:flex h-96">
              <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                {/* Map section on the left */}
                <div className="flex-1 h-full hidden md:block">
                  <div className="h-full w-full">
                    <div className="w-full h-full border-1 maplibregl-map mapboxgl-map">
                      <div>
                        <NearByPlacesStatic
                          center={mycenter}
                          height="500px"
                          locations={locations}
                          amenities={amenities}
                          selectedAmenity={selectedAmenity}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons and other content on the right */}
                <div className="flex-1 w-full flex flex-col justify-end h-full">
                  <div className="flex p-2 flex-col sm:flex-wrap gap-2 flex-1 flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory space-x-2 sm:space-x-0 pr-6 sm:pr-0 ml-2 mb-2 sm:mb-0 sm:-mt-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-lg shadow p-1 py-lg bg-white card flex flex-col relative border-gray-150 bg-gray-100 sm:rounded-lg border"
                      >
                        <div className="text-foreground px-5 xs:px-4 flex items-center py-4 xs:py-0 text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Icon
                                icon={
                                  amenities.find(
                                    (amenity) => amenity.key === item?.category
                                  )?.icon || "mdi:map-marker"
                                }
                                className="inline-block text-4xl text-green-800 mr-5 xs:mr-8"
                              />
                            </div>
                            <ul className="text-xs">
                              <li className="text-gray-800 text-sm">
                                {item?.name}
                              </li>
                              <li>{item?.address}</li>
                              <li>{item?.distance}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
