"use client";
import React, { useEffect, useState } from "react";
import { storeUsersData } from "@/store/authStore";
import pb from "@/lib/pocketbase";

export default function Page() {
  const [favorites, setFavorites] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const { usersData } = storeUsersData();

  useEffect(() => {
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
        setFavorites(favorites.items);

        // Extract property IDs from favorites
        const propertyIds = data.items.map((favorite) => favorite.property_id);

        if (propertyIds.length > 0) {
          // Call your API endpoint with the property IDs
          const propertiesResponse = await fetch(
            "/api/indevisual/get-all-data",
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
  }, [usersData]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>

      <h2>Your Favorite Properties</h2>
      {propertiesData.length > 0 ? (
        <ul>
          {propertiesData.map((property) => (
            <li key={property.id}>
              Property ID: {property.id}, Name: {property.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorite properties yet.</p>
      )}
    </div>
  );
}
