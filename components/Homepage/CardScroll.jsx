import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import ScrollingBanner from "../partners/scrolling-banner";

// Dummy card data
const cards = Array.from({ length: 10 }, (_, index) => ({
  key: `card-${index + 1}`,
  title: `Card Title ${index + 1}`,
  subtitle: `Subtitle ${index + 1}`,
  imageSrc: "https://nextui.org/images/hero-card-complete.jpeg",
}));

export default function CardsScroll() {
  return (
    <section className="relative bg-transparent w-full m-2 px-6 py-2 sm:py-2 lg:px-8 lg:py-6">
      <div className="max-w-full">
        <ScrollingBanner shouldPauseOnHover duration={50} className="w-full bg-transparent" gap="40px">
          {cards.map(({ key, title, subtitle, imageSrc }) => (
            <Card
              shadow="md" // Medium shadow for visible effect
              key={key}
              className="py-4 mx-2 inline-block w-80 transition-shadow duration-300 ease-in-out hover:shadow-lg"
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{title}</p>
                <small className="text-default-500">{subtitle}</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={imageSrc}
                  width={270}
                />
              </CardBody>
            </Card>
          ))}
        </ScrollingBanner>
      </div>
    </section>
  );
}
