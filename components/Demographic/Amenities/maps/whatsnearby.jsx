import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { NearByPlacesStatic } from "@/components/Maps";

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

const WhatsNearbyMap = ({ center, isInteractive }) => {
  const [locations, setLocations] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState(amenities[0]);

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

  async function getNearbyLocations(
    lat,
    lon,
    amenity = selectedAmenity,
    radius = 3000,
    limit = 10
  ) {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const overpassQuery = `
            [out:json];
            (
              node["amenity"="${amenity}"](around:${radius},${lat},${lon});
              way["amenity"="${amenity}"](around:${radius},${lat},${lon});
              relation["amenity"="${amenity}"](around:${radius},${lat},${lon});
            );
            out center ${limit};
            >;
            out center qt;
        `;

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
      console.log("JsonData: ", jsonData);
      const locations = jsonData.elements
        .filter((element) => element.tags && element.tags.amenity)
        .map((element) => {
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
            { lat: center.lat, lon: center.lng || center.lon }
          );

          return {
            name: element.tags.name || "na",
            amenity: element.tags.amenity || "Unknown",
            address: address,
            lat,
            lon,
            distance: !isNaN(distance) ? `${distance.toFixed(2)} mi` : "N/A",
          };
        });

      return locations;
    } catch (error) {
      throw new Error("Error fetching nearby locations: " + error.message);
    }
  }

  function formatAddress(tags) {
    const addressParts = [];

    if (tags["addr:housenumber"]) addressParts.push(tags["addr:housenumber"]);
    if (tags["addr:street"]) addressParts.push(tags["addr:street"]);
    if (tags["addr:city"]) addressParts.push(tags["addr:city"]);
    if (tags["addr:postcode"]) addressParts.push(tags["addr:postcode"]);
    if (tags["addr:country"]) addressParts.push(tags["addr:country"]);

    return addressParts.join(", ");
  }

  useEffect(() => {
    getNearbyLocations(center.lat, center.lon)
      .then((locations) => {
        setLocations(locations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedAmenity]);

  return (
    <div className="relative h-[60vh] w-full">
      <div className="absolute top-4 left-4 right-4 flex space-x-2 overflow-x-auto z-10 scrollbar-hide">
        {amenities.map((amenity) => (
          <Button
            key={amenity.key}
            onClick={() => setSelectedAmenity(amenity.key)}
            className={`flex items-center w-auto text-sm space-x-2 px-3 py-1 rounded-md shadow-md whitespace-nowrap ${
              selectedAmenity === amenity.key ? amenity.bg_color : "bg-white"
            }`}
            startContent={
              <Icon
                icon={amenity.icon}
                height={48}
                width={"24px"}
                color={amenity.color || "black"}
              />
            }
          >
            {amenity.name}
          </Button>
        ))}
      </div>
      <div className="absolute top-16 left-4 bg-transparent p-4 w-[300px] max-h-[70vh] overflow-y-auto z-10 scrollbar-hide">
        {locations?.map((place) =>
          place.name !== "na" ? (
            <PlaceCard key={place?.id} place={place} />
          ) : null
        )}
      </div>
      <div
        className={`absolute inset-0 z-0 ${
          isInteractive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <NearByPlacesStatic
          center={center}
          height="500px"
          locations={locations}
          amenities={amenities}
          selectedAmenity={selectedAmenity}
        />
      </div>
    </div>
  );
};

const PlaceCard = ({ place }) => {
  const amenity = amenities.find((a) => a.key === place.amenity);

  return (
    <button className="pt-2 pr-2 h-full w-full text-left">
      <div className="rounded-lg py-lg card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
        <div className=" px-5 xs:px-4 flex items-center py-4 xs:py-0 text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2">
              <Icon icon={amenity?.icon} fontSize={48} color={amenity?.color} />
            </div>
            <ul className="text-xs">
              <li className="text-gray-800 text-md font-semibold line-clamp-1">
                {place.name}
              </li>
              <li className="line-clamp-1">{place.address}</li>
              <li>{place?.distance}</li>
            </ul>
          </div>
        </div>
      </div>
    </button>
  );
};

export default WhatsNearbyMap;
