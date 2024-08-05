import React from "react";
import { Card, Image } from "@nextui-org/react";

const MainCard = ({ imageUrl }) => (
    <Card className="w-full h-full p-0 overflow-hidden rounded-md">
        <Image
            alt="Main Card background"
            className="object-cover rounded-md w-full h-full"
            src={imageUrl}
        />
    </Card>
);

export default MainCard;