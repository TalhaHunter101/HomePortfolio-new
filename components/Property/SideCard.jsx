// SideCard.js
import React from "react";
import { Card, Image } from "@nextui-org/react";

const SideCard = ({ imageUrl }) => (
    <Card className="w-full h-full  p-0 overflow-hidden rounded-md">
        
        <Image
            alt="Side Card background"
            className="object-cover  rounded-md"
            src={imageUrl}
            
        />
        
    </Card>
);

export default SideCard;
