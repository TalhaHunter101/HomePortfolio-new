
import React from "react";
import {  Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import  MainCard  from "@/components/Property/MainCard";
import  ThumbnailCard  from "@/components/Property/ThumbnailCard";
import SideCard from "@/components/Property/SideCard";



export default function PropertyPage({ params }) {
    return (
        <>
            <div className="p-4 flex items-center justify-between">
                <Button size="lg" variant="flat" className="bg-transparent"><Icon icon="mdi:keyboard-arrow-left" />Back to {params.id}</Button>
                <div className="flex space-x-2">
                    <Button size="lg" className="bg-transparent"><Icon icon="mdi:heart-outline" />Like</Button>
                    <Button size="lg" className="bg-transparent"><Icon icon="bx:share" />Share</Button>
                </div>
            </div>
         
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 p-4 ">
                <div className="lg:col-span-7 max-w-screen h-[50vh]">
                <MainCard imageUrl="https://nextui.org/images/hero-card-complete.jpeg"/>
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 h-[50vh]">
                    {[1, 2, 3, 4].map((item, index) => (
                        <ThumbnailCard
                        key={index}
                        imageUrl="https://lid.zoocdn.com/645/430/a08c736ce5863ea7e1d28e8834ef032d25011549.jpg"
                    />
                    ))}
                </div>
            </div>

            {/* lower div */}
            <div className="p-4 flex justify-between">
                <div className="flex-1">
                    <div className="mb-4">
                        <p className="font-bold text-lg">
                            For Sale New Open: Fri (8/9), 10:30 AM - 1:00 PM
                        </p>
                    </div>
                    <div className="mb-4 flex items-center">
                        <div className="flex-1 text-left">
                            <h3 className="font-bold text-4xl">$499,000</h3>
                            <span className="font-bold text-sm">323 Valley Gate Road,</span>
                            <span className="font-bold text-gray-400 text-sm"> Simi Valley, CA 93065 </span>
                        </div>
                        <div className="flex flex-row ml-[auto] mr-8 space-x-8">
                            <div className="text-center">
                                <h3 className="font-semibold text-4xl">2</h3>
                                <p className="text-sm text-gray-600">beds</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-4xl">19</h3>
                                <p className="text-sm text-gray-600">baths</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-4xl">1922</h3>
                                <p className="text-sm text-gray-600">sqft</p>
                            </div>
                        </div>
                    </div>

                  <div className="">
                    <p className="text-sm text-bold ">home for sale | on [company] </p>
                    <div className="pr-4 pt-4 ">
                    <Button size="lg"  className="w-full bg-neutral shadow-sm border rounded-md font-bold text-gray-600" >Talk to agent</Button>
                    </div>
                  </div>

                </div>
                <div className="w-1/4 h-[50vh]">
                    <SideCard imageUrl="https://nextui.org/images/hero-card-complete.jpeg" />
                </div>
               
            </div>
        </>
    );
}
