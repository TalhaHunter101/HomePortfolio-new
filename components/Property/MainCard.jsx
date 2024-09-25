"use client";
import React, { useState } from "react";
import { Card, Image, Button, useDisclosure } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import ImageModal from "./ImagesModal";

const MainCard = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [isLiked, setIsLiked] = useState(false);
  const handleIconClick = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  };
  return (
    <Card className="w-full h-full p-0 overflow-hidden rounded-md relative">
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images && images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={image?.original ? image?.original : image}
                alt={`Image ${index + 1}`}
                width="100%"
                height={416}
                className="object-cover w-full h-full"
                radius="none"
              />
            </div>
          ))}
        </div>

        {/* Mobile icons */}
        <div className="absolute top-4 right-4 flex space-x-4 md:hidden">
        <Button
    isIconOnly
    variant="solid"
    size="sm"
    className="bg-white rounded-full shadow-md p-2"
    onClick={handleIconClick}
    auto
  >
    <Icon
      icon={isLiked ? "fxemoji:redheart" : "mdi:heart-outline"}
      className={`text-3xl ${isLiked ? "text-red-500" : "text-black"}`}
    />
  </Button>

  {/* Share Button */}
  <Button
    isIconOnly
    variant="solid"
    size="sm"
    className="bg-white rounded-full shadow-md p-2"
    auto
  >
    <Icon icon="mdi:share-outline" className="text-xl text-black" />
  </Button>
        </div>

        {/* Navigation Buttons */}
        <Button
          isIconOnly
          variant="ghost"
          radius="full"
          size="sm"
          auto
          className="absolute left-2 bg-gray-100  top-1/2 transform -translate-y-1/2"
          onClick={handlePrevious}
        >
          <Icon color="gray" icon="bx:bx-chevron-left" width={24} height={24} />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          radius="full"
          size="sm"
          auto
          className="absolute right-2 bg-gray-100  top-1/2 transform -translate-y-1/2"
          onClick={handleNext}
        >
          <Icon color="gray" icon="bx:bx-chevron-right" width={24} height={24} />
          <span className="sr-only">Next</span>
        </Button>
        <Button
          variant="flat"
          radius="sm"
          auto
          onClick={onOpen}
          className="absolute right-5 bottom-4 bg-white hover:bg-gray-200"
          startContent={<Icon width={24} height={24} icon="material-symbols:imagesmode-outline" />}
        >
          <p className="text-sm">See all photos</p>
        </Button>
        <ImageModal isOpen={isOpen} onOpenChange={onOpenChange} images={images} />
      </div>
    </Card>
  );
};

export default MainCard;
