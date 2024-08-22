// ThumbnailCard.js
import React from "react";
import { Card, Image } from "@nextui-org/react";

const ThumbnailCard = ({ imageUrl }) => {    
  
  return (
    <Card className="w-full h-full p-0 overflow-hidden rounded-md">
      <Image
        alt="Thumbnail Card background"
        className="object-cover rounded-md"
        height={200}
        width={200}
        src={imageUrl || imageUrl?.original}
      />
    </Card>
  );
};

export default ThumbnailCard;
