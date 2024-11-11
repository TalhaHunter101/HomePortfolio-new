import { Card, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { broadbandData } from "@/public/dummydata/BroadBandData";

export default function BroadBandCard() {
  const slides = [
    {
      name: "Comcast",
      type: "Cable",
      download: "1000 Mbps",
      upload: "35 Mbps",
      position: "1/7",
    },
    {
      name: "Etheric Networks, Inc.",
      type: "Fixed Wireless",
      download: "300 Mbps",
      upload: "300 Mbps",
      position: "2/7",
    },
    {
      name: "AT&T Inc.",
      type: "VDSL",
      download: "100 Mbps",
      upload: "20 Mbps",
      position: "3/7",
    },
    {
      name: "HughesNet",
      type: "Satellite",
      download: "25 Mbps",
      upload: "3 Mbps",
      position: "4/7",
    },
    // Add more slides as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 2 : prevIndex - 2
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= slides.length - 2 ? 0 : prevIndex + 2
    );
  };

  return (
    <Card className="m-4 p-8">
      {/* Header */}
      <div className="p-4 bg-white rounded-lg shadow-md mb-6">
        <p className="text-gray-700 font-semibold">
          <span className="font-bold">Comcast, Etheric Networks, Inc.,</span>{" "}
          and <span className="font-bold">Viasat Inc</span> are 3 of the 7
          broadband internet providers that serve this area.
        </p>
        <p className="text-gray-600 mt-1">
          Comcast has the fastest advertised maximum speeds. Note that the
          values listed below may not reflect actual download/upload speeds.
        </p>
      </div>

      {/* Top Provider */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top Provider
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-blue-600">Comcast</h3>
          </div>
          <div className="text-center">
            <h4 className="text-gray-600">Download</h4>
            <p className="text-3xl font-bold text-blue-600">
              1000<span className="text-sm">Mbps</span>
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-600">Upload</h4>
            <p className="text-3xl font-bold text-blue-600">
              35<span className="text-sm">Mbps</span>
            </p>
          </div>
        </div>
      </div>

      {/* Nearby Providers Carousel */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        1 Nearby Providers
      </h2>
      <div className="flex-1 relative">
        <div className="w-full overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {broadbandData.map((data, index) => (
              <div key={index} className="flex-shrink-0 w-1/2">
                <ProviderCard data={data} position={`${index + 1}/${broadbandData.length}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-1/2 flex w-full justify-between">
          <Button
            isIconOnly
            variant="ghost"
            radius="full"
            size="sm"
            onClick={handlePrevious}
          >
            <Icon
              color="gray"
              icon="bx:bx-chevron-left"
              width={24}
              height={24}
            />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            isIconOnly
            variant="ghost"
            radius="full"
            size="sm"
            onClick={handleNext}
          >
            <Icon
              color="gray"
              icon="bx:bx-chevron-right"
              width={24}
              height={24}
            />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ProviderCard({ data, position }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 relative">
        <div className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-md px-2 py-1 text-xs font-semibold">
          {position}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{data["networks name"]}</h3>
        <p className="text-gray-500 text-sm mb-2">{data.address}</p>
        <p className="text-gray-500 text-xs mb-4">Postal Code: {data["postal code"]}</p>
        
        <div className="flex justify-between">
          <div className="text-center">
            <h4 className="text-gray-600">Standard Download</h4>
            <p className="text-2xl font-bold text-blue-600">{data["standard download speed"]}</p>
          </div>
          <div className="text-center">
            <h4 className="text-gray-600">Standard Upload</h4>
            <p className="text-2xl font-bold text-blue-600">{data["standard upload speed"]}</p>
          </div>
        </div>
      </div>
    );
  }
