'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FamilyCustomPieChart } from './Charts/FamilyPieChart';

export function FamilyCard({ title }) {
    return (
        <Card className="m-4" style={{ minHeight: '150px' }}>
           
            <CardBody>
                <div className='rounded-md '>
                <div className="bg-default-white  p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden rounded-lg">
                    <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground text-lg">
                        <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-purple-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-sm md:text-md w-6 lg:w-8 text-foreground">
                                <path d="M120 88a72 72 0 1 1 144 0A72 72 0 1 1 120 88zM7.7 144.5c13-17.9 38-21.8 55.9-8.8L99.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H96V251.7c-15.2-6.7-29.7-15.1-43.3-25L16.5 200.3c-17.9-13-21.8-38-8.8-55.9zM97.5 329.3l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C38 438.6 36.1 417 47.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L252 419.4l-26-37.2z"></path>
                            </svg>
                        </div>
                        <span>Can I raise a family in East Simi Valley?</span>
                    </h2>
                    <div className="leading-6 w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 grid items-start sm:items-center grid-cols-2">
                        <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                            <div className="text-xs md:text-sm capitalize text-foreground"># daycares nearby</div>
                            <div className="text-xl text-foreground font-medium">3</div>
                        </div>
                        <div className="flex flex-col items-center mb-2 pr-2 text-center justify-between">
                            <div className="text-xs md:text-sm capitalize text-foreground">Percentage of Families</div>
                            <div className="text-xl text-muted-foreground font-medium">68%</div>
                        </div>
                    </div>
                    
                </div>
                <div className="py-4 sm:py-6 text-foreground px-4 relative h-full w-full overflow-hidden flex-1">
                    <div className="mb-6 bg-default-white border border-subtle-border shadow-sm text-xs sm:text-sm p-4 rounded-lg text-default-800">
                        This is more than the city average&nbsp;of <span className="font-semibold text-blue-800">65%</span>.
                    </div>
                    <div className="flex items-center ">
                        <div className=" w-1/2 flex flex-col gap-2 text-xs sm:text-sm">
                            <div className="text-xs sm:text-lg font-semibold text-default-800 mb-4">Who lives here?</div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-2 h-2" style={{ backgroundColor: 'rgb(12, 51, 70)' }}></div>
                                <div>Married with kids (4,743)</div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-2 h-2" style={{ backgroundColor: 'rgb(44, 178, 242)' }}></div>
                                <div>Married, no kids (6,423)</div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-2 h-2" style={{ backgroundColor: 'rgb(159, 212, 239)' }}></div>
                                <div>Single male family (181)</div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-2 h-2" style={{ backgroundColor: 'rgb(32, 143, 198)' }}></div>
                                <div>Single female family (463)</div>
                            </div>
                        </div>
                        <div className="w-1/2 h-64  ml-2">
                            <div >
                                <div className="" >
                                    {/* ApexCharts component should be inserted here */}
                                    <FamilyCustomPieChart />
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
                                    <div className="">
                                        <p>map to be integrated here</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons and other content on the right */}
                        <div className="flex-1 flex flex-col justify-end h-full">
                            <div className="ml-2 mb-2">
                                <div className="flex space-x-2 " slot="tabs">
                                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-blue-800 bg-blue-200 border border-blue-300 hover:bg-blue-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 512"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="0"
                                            className="inline-block text-blue-800"
                                        >
                                            <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"></path>
                                        </svg>
                                        <span>All</span>
                                    </button>
                                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 384 512"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="0"
                                            className="inline-block text-blue-800"
                                        >
                                            <path d="M120 88a72 72 0 1 1 144 0A72 72 0 1 1 120 88zM7.7 144.5c13-17.9 38-21.8 55.9-8.8L99.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H96V251.7c-15.2-6.7-29.7-15.1-43.3-25L16.5 200.3c-17.9-13-21.8-38-8.8-55.9zM97.5 329.3l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C38 438.6 36.1 417 47.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L252 419.4l-26-37.2z"></path>
                                        </svg>
                                        <span>Daycares</span>
                                    </button>
                                    <button className="flex-shrink-0 flex space-x-2 items-center text-sm md:text-base rounded-md px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 hover:bg-gray-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="0"
                                            className="inline-block text-yellow-800"
                                        >
                                            <path d="M96 64a64 64 0 1 1 128 0A64 64 0 1 1 96 64zm48 320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V287.8L59.1 321c-9.4 15-29.2 19.4-44.1 10S-4.5 301.9 4.9 287l39.9-63.3C69.7 184 113.2 160 160 160s90.3 24 115.2 63.6L315.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L240 287.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H144z"></path>
                                        </svg>
                                        <span>Preschools</span>
                                    </button>
                                </div>
                            </div>
                            <div className="sm:flex-col sm:flex-wrap flex-1 flex flex-row overflow-y-hidden snap-mandatory space-x-2 sm:space-x-0 pr-6 sm:pr-0 ml-2 mb-2 sm:mb-0 sm:-mt-2">
                                <div className="flex-shrink-0 w-full h-auto snap-start map-list-item">
                                    <button className="pt-2 pr-2 h-full w-full text-left">
                                        <div className="rounded-lg py-lg bg-white card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
                                            <div className="text-foreground px-5 xs:px-4 flex items-center py-4 xs:py-0 text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512"
                                                            width="1em"
                                                            height="1em"
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            strokeWidth="0"
                                                            className="inline-block text-4xl text-yellow-800 mr-5 xs:mr-8"
                                                        >
                                                            <path d="M96 64a64 64 0 1 1 128 0A64 64 0 1 1 96 64zm48 320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V287.8L59.1 321c-9.4 15-29.2 19.4-44.1 10S-4.5 301.9 4.9 287l39.9-63.3C69.7 184 113.2 160 160 160s90.3 24 115.2 63.6L315.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L240 287.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H144z"></path>
                                                        </svg>
                                                    </div>
                                                    <ul className="text-xs">
                                                        <li className="text-gray-800 text-sm">Enrichment Planet</li>
                                                        <li>Preschools • 1565 Christine Ave</li>
                                                        <li>0.7 miles away</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="flex-shrink-0 w-full h-auto snap-start map-list-item">
                                    <button className="pt-2 pr-2 h-full w-full text-left">
                                        <div className="rounded-lg py-lg bg-white card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
                                            <div className="text-foreground px-5 xs:px-4 flex items-center py-4 xs:py-0 text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512"
                                                            width="1em"
                                                            height="1em"
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            strokeWidth="0"
                                                            className="inline-block text-4xl text-yellow-800 mr-5 xs:mr-8"
                                                        >
                                                            <path d="M96 64a64 64 0 1 1 128 0A64 64 0 1 1 96 64zm48 320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V287.8L59.1 321c-9.4 15-29.2 19.4-44.1 10S-4.5 301.9 4.9 287l39.9-63.3C69.7 184 113.2 160 160 160s90.3 24 115.2 63.6L315.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L240 287.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H144z"></path>
                                                        </svg>
                                                    </div>
                                                    <ul className="text-xs">
                                                        <li className="text-gray-800 text-sm">Enrichment Planet</li>
                                                        <li>Preschools • 1565 Christine Ave</li>
                                                        <li>0.7 miles away</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="flex-shrink-0 w-full h-auto  ">
                                    <button className="pt-2 pr-2 h-full w-full text-left">
                                        <div className="rounded-lg py-lg bg-white card flex flex-col h-full relative border-gray-150 bg-gray-100 sm:rounded-lg border">
                                            <div className="text-foreground px-5 xs:px-4 flex items-center py-4 xs:py-0 text-foreground rounded-none relative h-full w-full overflow-hidden flex-1">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 320 512"
                                                            width="1em"
                                                            height="1em"
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            strokeWidth="0"
                                                            className="inline-block text-4xl text-yellow-800 mr-5 xs:mr-8"
                                                        >
                                                            <path d="M96 64a64 64 0 1 1 128 0A64 64 0 1 1 96 64zm48 320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V287.8L59.1 321c-9.4 15-29.2 19.4-44.1 10S-4.5 301.9 4.9 287l39.9-63.3C69.7 184 113.2 160 160 160s90.3 24 115.2 63.6L315.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L240 287.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H144z"></path>
                                                        </svg>
                                                    </div>
                                                    <ul className="text-xs">
                                                        <li className="text-gray-800 text-sm">squirel Planet</li>
                                                        <li>Pbabies • 1565 Christine Ave</li>
                                                        <li>0.7 miles away</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                {/* More items like the above can be added */}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </CardBody>
        </Card>
    );
}
