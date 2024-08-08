// ThumbnailCard.js
import React from "react";
import { Card, Image, Button, CardFooter } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const VideoCard = ({ imageUrl }) => (
    <Card
    isFooterBlurred
     className="w-full  border-none p-0 overflow-hidden rounded-md">
        <Image
        
            alt="Thumbnail Card background"
            className="object-cover rounded-md "
            height={200}
            width="100%"
            src={imageUrl}
            
        />
         <CardFooter   className="justify-between  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-md bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
         <Icon color="white" width={24} height={45} icon="mingcute:video-fill" />
        <p className="text-lg font-bold text-white">
        Video tour
        </p>
        
      </CardFooter>
        
    </Card>
);

export default VideoCard;
