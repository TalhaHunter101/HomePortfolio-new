'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export function NoiseLevelCard  ({ })  {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
        <div className=' bg-default-background  border border-subtle-border rounded-md '>
        <div className=" bg-default-white   p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden data-report-preview scroll-m-6 lg:scroll-m-8 bg-background text-foreground rounded-t-lg">
          <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground mb-2 sm:mb-4 text-lg">
            <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-red-400">
             <Icon icon="mdi:volume-high" />
            </div>
            <span>How are the noise levels in East Simi Valley?</span>
          </h2>
          <div className="sentences leading-6 w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 text-foreground grid item-start sm:items-center grid-cols-2">
            <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
              <div className="text-xs md:text-sm capitalize text-foreground">This area sounds like a Quiet Library.</div>
            </div>
            <div className="flex flex-col items-center mb-2 pr-2 text-center justify-between">
              <div className="text-xs md:text-sm capitalize text-foreground">Sound Level</div>
              <div className="text-lg text-muted-foreground font-medium">&lt; 40 <lg>dBA</lg></div>
            </div>
          </div>
          
        </div>
        <div className="border border-gray-200 rounded-br-lg rounded-bl-lg pt-6 border-t-0 -mt-2 bg-gray-250">
          <canvas className="hidden" width="512" height="512"></canvas>
          <section id="noise-levels" className="mb-5 sm:mb-6">
            <div className="mx-auto w-full max-w-screen md:max-w-screen-md lg:max-w-screen-lg">
              <div className="px-0 md:px-0 md:pr-0">
                <div className="flex flex-row justify-between">
                  <div className="pl-4 md:pl-4"></div>
                </div>
                <div className="">
                  <div className="card flex flex-col h-full relative border-gray-150 bg-gray-100">
                    <div className="text-foreground px-4 relative h-full w-full flex-1">
                      <div className="flex flex-col lg:flex-row xs:h-96 xs:justify-between">
                        <div className="flex flex-col justify-around lg:justify-center px-6 xs:px-12 py-8 xs:py-0">
                          <div className="lg:mb-8 flex">
                            <div className="text-xs lg:text-sm text-gray-800">Noise Level Near Home</div>
                            <div className="text-yellow-800 flex items-end stat-wrapper">
                              <div className="text-2xl lg:text-3xl font-semibold">
                                <div slot="value">
                                  <span className="cursor-pointer flex items-center">
                                    <div className="tooltip-prompt border-b border-gray-600 border-dashed cursor-pointer">&lt; 40 <span className="text-base xs:text-lg">dBa</span></div>
                                  </span>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="caption">Common comparable sound: Quiet Library</p>
                        </div>
                        <div className="mt-8 xs:mt-0">
                          <div className="text-xs flex justify-between text-gray-400 values"><span>35 dBA</span> <span>50 dBA</span> <span>65 dBA</span> <span>80 dBA</span> <span>95 dBA</span></div>
                          <div className="flex px-4">
                            <div className="legend-line flex-1 border-l border-gray-400"></div>
                            <div className="legend-line flex-1 border-l border-gray-400"></div>
                            <div className="legend-line flex-1 border-l border-gray-400"></div>
                            <div className="legend-line flex-1 border-l border-gray-400"></div>
                            <div className="legend-line flex-1 border-l border-gray-400"></div>
                            <div className="legend-line flex-1 border-l border-gray-400"></div>
                          </div>
                          <div className="w-full text-center my-2">
                            <div className="legend-line-4-2" style={{ width: '83%' }}></div>
                            <div className="rounded-full h-5 w-5 bg-yellow-300" style={{ transform: 'translateX(172px)' }}></div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-foreground">Daytime</span> <span className="text-foreground">Night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>
      </CardBody>
    </Card>
  );
}
