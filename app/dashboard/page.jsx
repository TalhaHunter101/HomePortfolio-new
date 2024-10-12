"use client";
import React, { useEffect, useState } from "react";
import { storeUsersData } from "@/store/authStore";
import pb from "@/lib/pocketbase";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { timeAgo } from "@/utils/Helper";

export default function Page() {
  // const [favorites, setFavorites] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { usersData } = storeUsersData();

  useEffect(() => {

    if(typeof window === "undefined") return;

    const fetchUserFavorites = async () => {
      try {
        // Ensure the user is authenticated
        if (!usersData || !usersData.email) {
          console.error("User is not logged in or email is missing");
          return;
        }



        let favorites = await  pb.collection("favorite").getFullList({
          filter: pb.filter("userId ?= {:id}", { id: usersData.id }),
          expand: "userId",
        })
        // setFavorites(favorites.items);

     

        // // Fetch the user's favorite property IDs
        // const apiUrl = new URL(
        //   "http://127.0.0.1:8090/api/collections/favorite/records"
        // );
        // apiUrl.searchParams.append("filter", `userid=${usersData.id}`);
        // apiUrl.searchParams.append("fields", "id,property_id");

        // const response = await fetch(apiUrl.toString());
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        // Extract property IDs from favorites
        console.log(favorites);
        const propertyIds = favorites.map((favorite) => favorite.property_id);

         console.log(propertyIds);
        if (propertyIds.length > 0) {
          // Call your API endpoint with the property IDs
          const propertiesResponse = await fetch(
            "/api/search/get-multiple-with-ids",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ propertyIds }),
            }
          );

          if (!propertiesResponse.ok) {
            throw new Error(`HTTP error! status: ${propertiesResponse.status}`);
          }

          const propertiesData = await propertiesResponse.json();
          setPropertiesData(propertiesData);
        }
      } catch (error) {
        console.error("Failed to fetch favorites or property data", error);
      }
    };

    fetchUserFavorites();
  }, []);




  const handlePrevious = ({total}) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? total - 1 : prevIndex - 1
    );
  };  

  const handleNext = ({total}) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === total - 1 ? 0 : prevIndex + 1
    );
  };



  return (
    <div className="pt-16 p-4">
   

<div >
        <h1 className="text-2xl p-4 font-bold">Favorite Properties</h1>
</div>

      <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-full">

      {propertiesData?.length > 0 ? (


propertiesData?.map((property) => (
  <Card key={property._source.listingId}
        className=""
        // onMouseEnter={() => {
        //   setCardHover(property.id);
        // }}
      >
        <CardHeader className="p-0 relative">
          {/* Wrapper for positioning */}
          <div className="relative">
            {/* Heart Icon */}
            <div className="absolute top-2 right-2 z-10">
              {/* <Icon
                onClick={handleLikeToggle} // Toggle like on click
                icon={isLiked ? "twemoji:red-heart" : "ant-design:heart-twotone"}
                width="24"
                height="24"
                color={isLiked ? "" : "white"} // Change color based on state
                style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
              /> */}
            </div>
            <div className="absolute top-2 left-2 z-10 bg-[#fdfdfdb5] px-2 rounded-md">
              listed {timeAgo(property._source.publishedOn)}
            </div>
            <div className="absolute right-0 bottom-0 z-10">
              {/* <Image
                alt="Property"
                className="h-8 w-10 rounded-none"
                src={property?._source.developer_logo}
              /> */}
            </div>
  
            <div className="w-full overflow-hidden rounded-none relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {property?._source.propertyImage?.map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-full">



<Link  href={{
            pathname: `/property/${property?.displayAddress?.replace(
              /\s+/g,
              "-"
            )}?id=${property.id}`,
          }}>

                    {/* <Link href={`/property/${property.id}`}> */}
                      <Image
                        radius="none"
                        src={image?.original}
                        alt={`Property ${index + 1}`}
                        width={600} // Full width
                        height={200}
                        classNames={{ wrapper: "min-w-full" }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                size="sm"
                onClick={()=>{
                  handlePrevious({total: property?._source.propertyImage.length})
                }}
              >
                <Icon
                  color="white"
                  icon="bx:bx-chevron-left"
                  width={24}
                  height={24}
                />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                size="sm"
                onClick={()=>{
                  handleNext({total: property?._source.propertyImage.length})
                }}
              >
                <Icon
                  color="white"
                  icon="bx:bx-chevron-right"
                  width={24}
                  height={24}
                />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden py-2">
        <Link  href={{
            pathname: `/property/${property?.displayAddress?.replace(
              /\s+/g,
              "-"
            )}?id=${property.id}`,
          }}>
            <div className="p-1">
              <h3 className="font-bold text-2xl">£{property._source.price}</h3>
              {/* <div className="text-sm uppercase flex text-bold">
                <span className="ml-0 text-bold flex justify-center gap-1">
                  <Icon icon="mdi:bed-outline" width={16} height={16} />{" "}
                  {property?.minBedrooms}
                </span>
                <span className="ml-2 text-bold flex justify-center gap-1">
                  <Icon icon="bx:bath" width={16} height={16} />{" "}
                  {property?.bathrooms}
                </span>
                <span className="ml-2 text-bold flex justify-center gap-1">
                  <Icon icon="carbon:area" width={16} height={16} />{" "}
                  {property?.areaSize}
                </span>
              </div> */}
              <div className="flex flex-row ml-[auto] mr-8 space-x-8 mt-2">
                <div className="">
                  <h3 className="font-semibold text-xl">
                    {property?._source.counts.numBedrooms}
                  </h3>
                  <p className="text-sm text-gray-600">beds</p>
                </div>
                <div className="">
                  <h3 className="font-semibold text-xl">{property?._source.counts.numBathrooms}</h3>
                  <p className="text-sm text-gray-600">baths</p>
                </div>
                <div className="">
                  {/* <h3 className="font-semibold text-xl">
                    {(property?.areaSize !== null &&
                      formatCurrency(property?.areaSize)) ||
                      "NA"}
                  </h3> */}
                  <p className="text-sm text-gray-600">sqft</p>
                </div>
              </div>
              <p className="pt-2 text-default-500 text-sm">
                {property?._source?.fullAddress || property?._source?.address}
              </p>
              <div className="pt-2 flex space-x-2">
                {property?._source?.highlights?.map((highlight, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {highlight?.label}
                  </span>
                ))}
  
                {/* // show ROI, Gross Yield, Rent estimate, Anual cash flow */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="">
                    <div className="text-sm font-semibold text-gray-500">ROI</div>
                    <div className="text-lg font-bold text-gray-900">10%</div>
                  </div>
                  <div className="">
                    <div className="text-sm font-semibold text-gray-500">
                      Gross Yield
                    </div>
                    <div className="text-lg font-bold text-gray-900">8%</div>
                  </div>
                  <div className="">
                    <div className="text-sm font-semibold text-gray-500">
                      Rent estimate
                    </div>
                    <div className="text-lg font-bold text-gray-900">£1500</div>
                  </div>
                  <div className="">
                    <div className="text-sm font-semibold text-gray-500">
                      Anual cash flow
                    </div>
                    <div className="text-lg font-bold text-gray-900">£5000</div>
                  </div>
                </div>
  
                <div className="grid grid-cols-2"></div>
  
                {/* <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                  #bonus room
                </span>
                <span className="bg-gray-200 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  +6 more
                </span> */}
              </div>
            </div>
          </Link>
        </CardBody>
      </Card>

))

      

      ) : (
        <p>You have no favorite properties yet.</p>
      )}

</div>

    </div>
  );
}
