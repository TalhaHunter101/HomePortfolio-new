'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from '@iconify/react';

const getItemsData = () => [
    { name: "Rocky Pointe Natural Park", category: "Parks • Kuehner Dr", distance: "0.2 miles away" },
    { name: "Sunset Valley Trail", category: "Trails • Oak St", distance: "0.5 miles away" },
    { name: "Lakeview Park", category: "Parks • Lakeview Rd", distance: "1.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    // Add more items as needed
  ];
  const items = getItemsData();
export function NearbyCard({ title }) {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="bg-gray-250 border border-subtle-border p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden bg-background text-foreground rounded-lg">
          <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground text-lg">
            <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-purple-400">
             <Icon icon="mdi:map" />
            </div>
            <span>What’s nearby 6677 Charing Street?</span>
          </h2>
          <div className="w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 grid grid-cols-1 items-start sm:items-center">
            <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
              <div className="text-xs md:text-sm capitalize text-foreground">Nearest grocery</div>
              <div className="text-base md:text-base text-foreground font-medium">
                Old Susana Postal Express <br />
                <span>(2,109 ft)</span>
              </div>
            </div>
          </div>
      
        </div>
        <div className="border border-gray-200 rounded-br-lg rounded-bl-lg pt-6 border-t-0 -mt-2 bg-gray-250">
          <section id="whats-nearby" className="mb-5 sm:mb-6">
            <div className="mx-auto w-full max-w-screen md:max-w-screen-md lg:max-w-screen-lg">
              <div className="px-0 md:px-0 md:pr-0">
                <div className="flex flex-row justify-between">
                  <div className="pl-4 md:pl-4"></div>
                </div>
                <div className="">
                  <div className="flex flex-row px-4 space-x-2 overflow-x-auto scrollbar-none mb-2">
                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-purple-800 bg-purple-200 border border-purple-300 hover:bg-purple-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-purple-800">
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                      </svg>
                      <span>Our Picks</span>
                    </button>
                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-brown-800">
                        <path d="M55.2 17.7C60.6 6.8 71.7 0 83.8 0H364.2c12.1 0 23.2 6.8 28.6 17.7L416 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96S14.3 64 32 64L55.2 17.7zM74.7 453.8L48 160H400L373.3 453.8c-3 33-30.6 58.2-63.7 58.2H138.4c-33.1 0-60.7-25.2-63.7-58.2z"></path>
                      </svg>
                      <span>Groceries</span>
                    </button>
                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-brown-800">
                        <path d="M448 0H64C28.7 0 0 28.7 0 64V384c0 35.3 28.7 64 64 64H192l-11.3 45.2c-2.7 10.9 2.4 22.3 12.8 26.9s22.5 1.9 29.7-6.1L288 448l64.8 66c7.2 7.9 18.4 10.4 29.7 6.1s15.5-16 12.8-26.9L384 448H448c35.3 0 64-28.7 64-64V64C512 28.7 483.3 0 448 0z"></path>
                      </svg>
                      <span>Coffee</span>
                    </button>
                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-green-800">
                        <path d="M352 0c88.4 0 160 71.6 160 160 0 41.8-21.2 84.4-57.3 129.5-34.6 42.8-81.5 85.6-133.3 126.1-10.7 8.5-22.1 17.1-33.4 25.5-11.2-8.4-22.7-17-33.3-25.4-51.9-40.5-98.7-83.3-133.3-126.1C21.2 244.4 0 201.8 0 160 0 71.6 71.6 0 160 0c42.5 0 81.1 16.4 112 43 30.9-26.6 69.5-43 112-43z"></path>
                      </svg>
                      <span>Parks</span>
                    </button>
                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-brown-800">
                        <path d="M96 96H64V64C64 28.7 92.7 0 128 0H384c35.3 0 64 28.7 64 64V96h-32c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h32v32c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V448H32c-17.7 0-32-14.3-32-32V352c0-17.7 14.3-32 32-32h32V192H32c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32H96zM224 368v48c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16z"></path>
                      </svg>
                      <span>Daycare</span>
                    </button>
                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-brown-800">
                        <path d="M96 0C42.9 0 0 42.9 0 96V416c0 53.1 42.9 96 96 96H544c53.1 0 96-42.9 96-96V96c0-53.1-42.9-96-96-96H96zm64 112h320c8.8 0 16 7.2 16 16V192c0 8.8-7.2 16-16 16H160c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16zM96 288H288c8.8 0 16 7.2 16 16V368c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16z"></path>
                      </svg>
                      <span>Other</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="z-10 w-full h-full  overflow-hidden rounded-br-lg rounded-bl-lg">
            <div className="hidden xl:flex h-96">
              <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                {/* Map section on the left */}
                <div className="flex-1 h-full">
                  <div className="h-full w-full">
                    <div className="w-full h-full border-1 maplibregl-map mapboxgl-map">
                      <div>
                        <p>map to be integrated here</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons and other content on the right */}
                <div className="flex-1 w-full flex flex-col justify-end h-full">
  <div className="flex p-2 flex-col sm:flex-wrap gap-2 flex-1 flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory space-x-2 sm:space-x-0 pr-6 sm:pr-0 ml-2 mb-2 sm:mb-0 sm:-mt-2">
    {items.map((item, index) => (
      <div key={index} className="rounded-lg  p-1 py-lg bg-white card flex flex-col  relative border-gray-150 bg-gray-100 sm:rounded-lg border">
        <div className="text-foreground px-5  xs:px-4 flex items-center py-4 xs:py-0 text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-4xl text-green-800 mr-5 xs:mr-8">
                <path d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208H104L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320H80L5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5H192v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448H424.5c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320h33.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208h24.9c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"></path>
              </svg>
            </div>
            <ul className="text-xs">
              <li className="text-gray-800 text-sm">{item.name}</li>
              <li>{item.category}</li>
              <li>{item.distance}</li>
            </ul>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
