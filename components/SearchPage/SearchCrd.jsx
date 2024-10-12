import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Image, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatCurrency, timeAgo } from "@/utils/Helper";
import { storeUsersData } from "@/store/authStore";
import pb from "@/lib/pocketbase";
import toast from "react-hot-toast";

const SearchCard = ({ property, setCardHover, isLiked: initialLiked }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const maxPrice = property?.maxPrice;
  const humanReadablePrice = formatCurrency(maxPrice);
  const { usersData } = storeUsersData();

  useEffect(() => {
    setIsLiked(initialLiked); // Update the isLiked state when initialLiked changes
  }, [initialLiked]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleLikeToggle = async () => {
    if (!usersData || !usersData.id) {
      alert("Please log in to add or remove favorites.");
      return;
    }

    try {
      if (isLiked) {
        // If the property is already liked, remove it from favorites
        const result = await pb.collection("favorite").getList(1, 1, {
          filter: `property_id='${property.id}' && userId='${usersData.id}'`,
        });
        if (result.items.length > 0) {
          await pb.collection("favorite").delete(result.items[0].id);
          toast.success("Property removed from favorites");
        }
      } else {
        // Otherwise, add it to favorites
        await pb.collection("favorite").create({
          property_id: property.id,
          userId: usersData.id,
        });
        toast.success("Property added to favorites");
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Error updating favorites");
    }
  };

  return (
    <Card onMouseEnter={() => setCardHover(property.id)}>
      <CardHeader className="p-0 relative">
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <Icon
              onClick={handleLikeToggle}
              icon={isLiked ? "twemoji:red-heart" : "ant-design:heart-twotone"}
              width="24"
              height="24"
              color={isLiked ? "" : "white"}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="absolute top-2 left-2 z-10 flex">
            <span className="bg-[#fdfdfdb5] px-2 rounded-md text-sm">
              {timeAgo(property?.date)}
            </span>

            {property?.totalPriceChange !== "No price change" && (
              <div className="bg-[#fdfdfdb5] px-1 rounded-md mx-1 text-sm flex items-center gap-2">
                <Image
                  src="/icons/grow-down.svg"
                  height={15}
                  width={15}
                  alt="SVG Icon"
                />
                {property?.totalPriceChange}
              </div>
            )}
          </div>
          <div className="absolute right-0 bottom-0 z-10">
            <Image
              alt="Property"
              className="h-8 w-10 rounded-none"
              src={property?.developer_logo}
            />
          </div>
          <div className="w-full overflow-hidden rounded-none relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {property?.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <Link  href={{
            pathname: `/property/${property?.displayAddress?.replace(
              /\s+/g,
              "-"
            )}?id=${property.id}`,
          }}>
                    <Image
                      radius="none"
                      src={image?.original}
                      alt={`Property ${index + 1}`}
                      width={600}
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
              onClick={handlePrevious}
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
              onClick={handleNext}
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
        {/* <Link href={`/property/${property.id}?address=${property?.displayAddress}`}> */}
        <Link
          href={{
            pathname: `/property/${property?.displayAddress?.replace(
              /\s+/g,
              "-"
            )}?id=${property.id}`,
          }}
        >
          <div className="p-1">
            <h3 className="font-bold text-2xl">£{humanReadablePrice}</h3>
            <div className="flex flex-row ml-[auto] mr-8 space-x-8 mt-2">
              <div className="">
                <h3 className="font-semibold text-xl">
                  {property?.minBedrooms}
                </h3>
                <p className="text-sm text-gray-600">beds</p>
              </div>
              <div className="">
                <h3 className="font-semibold text-xl">{property?.bathrooms}</h3>
                <p className="text-sm text-gray-600">baths</p>
              </div>
              <div className="">
                <h3 className="font-semibold text-xl">
                  {(property?.areaSize !== null &&
                    formatCurrency(property?.areaSize)) ||
                    "NA"}
                </h3>
                <p className="text-sm text-gray-600">sqft</p>
              </div>
            </div>
            <p className="pt-2 text-default-500 text-sm">
              {property?.fullAddress || property?.address}
            </p>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
