"use client";
import React, { useEffect, useState } from "react";
import { storeUsersData } from "@/store/authStore";
import pb from "@/lib/pocketbase";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { timeAgo } from "@/utils/Helper";
import ShowDataCards from "@/components/ListingSearch/ShowDataCards";

export default function Page() {
  // const [favorites, setFavorites] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isnewDataLoading, setisnewDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);


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


        setisnewDataLoading(true);

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


        setisnewDataLoading(false);
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
<ShowDataCards
          totalcount={propertiesData.length}
          cardData={propertiesData}
          currentPage={1}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          isFavorite={true}
          isLoading={isnewDataLoading}
        />

  

    </div>
  );
}
