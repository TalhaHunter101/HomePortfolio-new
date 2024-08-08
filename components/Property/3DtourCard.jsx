// ThumbnailCard.js
import React from "react";
import { Card, Image, Button, CardFooter } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const TourCard = ({ imageUrl }) => (
    <Card
    isFooterBlurred
     className="w-full bg-black  border-none p-0 overflow-hidden rounded-md">
        <Image
        
            alt="Thumbnail Card background"
            className="object-cover rounded-md "
            height={200}
            width="100%"
            src={imageUrl}
            
        />
         <CardFooter   className="justify-between  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-md bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
         <Icon color="white" width={24} height={24} icon="fa-solid:walking" />
        <p className="text-tiny text-white/80">
       <span className="text-white font-bold"> 3-D Tour</span>  <br />
        step inside  for a <br /> 3-D tour
        </p>
        
      </CardFooter>
        
    </Card>
);

export default TourCard;
