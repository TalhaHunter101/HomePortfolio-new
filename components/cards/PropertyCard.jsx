"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardBody, CardHeader, Button, CardFooter, Divider } from "@nextui-org/react"
import { Icon } from "@iconify/react"

export default function PropertyCard({ property }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? property.original_image.length - 1 : prevIndex - 1))
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === property.original_image.length - 1 ? 0 : prevIndex + 1))
  }
  const handleAutoPlay = () => {
    setIsAutoPlaying((prevState) => !prevState)
  }
  return (
    <Card shadow="md" isHoverable={true} className="max-w-[280px] rounded-lg overflow-hidden">
      <CardBody className="p-4">
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {JSON.parse(property.original_image.replace(/'/g, '"')).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  width={200}
                  height={200}
                  className="flex-shrink-0 object-cover w-full h-48"
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
            <Button size="sm" variant="light" onClick={handlePrevious}>
              <Icon icon="bx:bx-chevron-left" width={24} height={24} />
              <span className="sr-only">Previous</span>
            </Button>
            <Button size="sm" variant="light" onClick={handleNext}>
              <Icon icon="bx:bx-chevron-right" width={24} height={24} />
              <span className="sr-only">Next</span>
            </Button>
          </div>
          
        </div>
        
        <p className="text-lg font-semibold mt-2">€ {property.price}</p>
        <p className="text-sm mt-1">{property.displayable_address}</p>

      </CardBody>
      <Divider  />
      <CardFooter>
        <Button block color="secondary" className="w-full font-semibold" size="md" variant="flat">
          View Property
        </Button>
      </CardFooter>
    </Card>
  )
}
