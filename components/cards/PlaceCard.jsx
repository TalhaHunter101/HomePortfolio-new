import React from 'react';
import { Card, CardFooter, Button, Image } from '@nextui-org/react'; // Replace with your actual UI library imports
import { Icon } from '@iconify/react';
 // Replace with your image component if different

const PlaceCard = ({ place }) => {
  return (
    <Card
      isHoverable={true}
      key={place.id}
      className="border-none transition-transform transform hover:scale-105 cursor-pointer"
      isFooterBlurred
      radius="lg"
    >
      <Image
        alt={`Image of ${place.location}`}
        className="object-cover"
        height={200}
        src={place.imageUrl}
        width="100%"
      />
      <CardFooter className="justify-between bg-white/10 border-white/20 border-1 py-1 absolute rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          endContent={<Icon icon="mdi:chevron-right" width="24" height="24" />}
        >
          {place.location}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
