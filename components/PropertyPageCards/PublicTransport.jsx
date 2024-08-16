'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function PublicTransportCard({ title, price, roi }) {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="bg-gray-250 border border-subtle-border p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden bg-background text-foreground rounded-t-lg">
          <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground mb-2 sm:mb-4 text-lg">
            <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-sm md:text-md w-6 lg:w-8 text-foreground">
                {/* SVG Path here */}
              </svg>
            </div>
            <span>What are my public transportation options in East Simi Valley?</span>
          </h2>
          <div className="sentences leading-6 w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 text-foreground grid sm:items-center grid-cols-2">
            <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
              <div className="text-xs md:text-sm capitalize text-foreground">
                <a href="https://www.walkscore.com/how-it-works/" target="_blank" rel="nofollow noopener noreferrer">Transit Score<sup>®</sup></a>
              </div>
              <div className="text-xl text-foreground font-medium">18</div>
            </div>
            <div className="flex flex-col items-center mb-2 pr-2 text-center justify-between">
              <div className="text-xs md:text-sm capitalize text-foreground">
                <a href="https://www.walkscore.com/how-it-works/" target="_blank" rel="nofollow noopener noreferrer">Walk Score<sup>®</sup></a>
              </div>
              <div className="text-xl text-muted-foreground font-medium">38</div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block absolute right-4 top-4 sm:top-6 w-6 h-6 transition-transform text-foreground">
            
          </svg>
        </div>
        <div className="text-foreground px-4 relative h-full w-full overflow-hidden flex-1">
          <div className="sm:py-12 py-6">
            <div className="h-24 sm:h-20 bg-gray-150 text-xs sm:text-sm p-4 rounded-lg text-gray-800">
              Some bike infrastructure. Most errands require a car. A few nearby public transportation options.
            </div>
            <div className="mt-8 w-full flex flex-row justify-between px-4 sm:justify-start">
              <div className="xs:block flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">Bike Score <sup>®</sup></div>
                  <div className="text-green-800 flex items-end">
                    <div className="text-2xl lg:text-3xl font-semibold">27</div>
                    <div className="text-base lg:text-lg flex space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block">
                      <path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xs:block sm:ml-12 flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">Walk Score <sup>®</sup></div>
                  <div className="text-green-800 flex items-end">
                    <div className="text-2xl lg:text-3xl font-semibold">38</div>
                    <div className="text-base lg:text-lg flex space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block">
                      <path d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xs:block sm:ml-12 flex">
                <div>
                  <div className="text-xs lg:text-sm text-gray-800">Transit Score <sup>®</sup></div>
                  <div className="text-green-800 flex items-end">
                    <div className="text-2xl lg:text-3xl font-semibold">18</div>
                    <div className="text-base lg:text-lg flex space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block">
                      <path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* lowerdiv */}
        <div className="hidden xl:flex h-96 mt-10">
          <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
            {/* Map section on the left */}
            <div className="flex-1 h-full">
              <div className="h-full w-full">
                <div className="w-full h-full border-1 maplibregl-map mapboxgl-map">
                  <div>
                    <p>Map to be integrated here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons and other content on the right */}
            <div className="flex-1 flex flex-col justify-end h-full">
              <div className="p-2 flex space-x-2" slot="tabs">
                <button className="flex space-x-2 items-center rounded-md px-4 py-2 text-green-800 bg-green-200 border border-green-300 hover:bg-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block">
                    <path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                  <div>Rail (2)</div>
                </button>
                <button className="flex space-x-2 items-center rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block">
                    <path d="M224 0C348.8 0 448 35.2 448 80V96 416c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V448H128v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32V96 80C0 35.2 99.2 0 224 0zM64 128V256c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path>
                  </svg>
                  <div>Bus Stops (1)</div>
                </button>
              </div>
              <div className="sm:flex-col sm:flex-wrap flex-1 flex flex-row scrollbar-none overflow overflow-y-hidden snap-mandatory space-x-2 sm:space-x-0 pr-6 sm:pr-0 ml-2 mb-2 sm:mb-0 sm:-mt-2">
                <div className="flex-shrink-0 w-full h-auto snap-start map-list-item">
                  <button className="pt-2 pr-2 h-full w-full text-left">
                    <div className="rounded-md p-4 sm:mr-2 card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
                      <div className="flex flex-col text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                        <div className="w-full justify-between">
                          <span className="text-green-800 font-bold">Simi Valley Metrolink Station</span>
                          <span className="font-semibold ml-4">LOS-ANGELES METROLINK • 2.33 mi away</span>
                        </div>
                        <div className="mt-2">
                          <span className="py-1 px-2 mr-1 mt-2" style={{ backgroundColor: '#e9e9e9', lineHeight: '29px' }}>nan - Metrolink Ventura County Line</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex-shrink-0 w-full h-auto snap-start map-list-item">
                  <button className="pt-2 pr-2 h-full w-full text-left">
                    <div className="rounded-md p-4 sm:mr-2 card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
                      <div className="flex flex-col text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                        <div className="w-full justify-between">
                          <span className="text-green-800 font-bold">Chatsworth Metrolink Station</span>
                          <span className="font-semibold ml-4">LOS-ANGELES METROLINK • 3.67 mi away</span>
                        </div>
                        <div className="mt-2">
                          <span className="py-1 px-2 mr-1 mt-2" style={{ backgroundColor: '#e9e9e9', lineHeight: '29px' }}>nan - Metrolink Ventura County Line</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
