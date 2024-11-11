"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/Helper";
import PropertyCard from "../cards/PropertyCard";

export const SimilarHomesCard = ({ data, title }) => {
  const [similarProperties, setSimilarProperties] = useState([]);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        const response = await fetch("/api/indevisual/get-nearby-listing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postcode: data?.location?.postalCode,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setSimilarProperties(result);
        }
      } catch (error) {
        console.error("Error fetching similar properties:", error);
      }
    };

    if (data) {
      fetchSimilarProperties();
    }
  }, [data]);


  console.log("similarProperties", similarProperties);
  
  return (

    <Card className="m-4">
      <CardHeader className="text-2xl font-bold">{title}</CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* {similarProperties.map((property, index) => (
           <>
           <PropertyCard  key={index} data={property} />
           </>
          ))} */}
        </div>
      </CardBody>
    </Card>
  );
};