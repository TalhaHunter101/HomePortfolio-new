
import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import MainCard from "@/components/Property/MainCard";
import ThumbnailCard from "@/components/Property/ThumbnailCard";
import SideCard from "@/components/Property/SideCard";
import Footer from "@/components/common/Footer/Footer";

export default function PropertyPage({ params }) {
    let lisitngData = [
        {
          address: "Empire Reach, 4 Dowells Street",
          area: "London SE10",
          agent: {
            logoUri: "https://st.zoocdn.com/zoopla_static_agent_logo_(752658).png",
            branchId: "31334",
            branchName: "LiFE Residential - Greenwich",
            phone: "020 3463 0317",
          },
          attributes: {
            bedrooms: 1,
            bathrooms: 1,
            livingRooms: 1,
          },
          flag: "Just added",
          highlights: [],
          imageUris: [
            "https://lid.zoocdn.com/645/430/a08c736ce5863ea7e1d28e8834ef032d25011549.jpg",
            "https://lid.zoocdn.com/645/430/b7d352c4100ea22ee0162f31be3f82de2ac11fd9.jpg",
            "https://lid.zoocdn.com/645/430/466e8ce79cbe34a5e2e8124f88cd00b1d10e4292.jpg",
            "https://lid.zoocdn.com/645/430/2a740be0ac3200de968f6ef4a9c717d1da2e71ba.jpg",
            "https://lid.zoocdn.com/645/430/7a3009780254e834419408b627968011e110f916.jpg",
            "https://lid.zoocdn.com/645/430/e2e2d7eafeeedd44898ea415ba5b903944703329.jpg",
            "https://lid.zoocdn.com/645/430/a698c47f9b3943190dce49b9114ebf685e7b220e.jpg",
            "https://lid.zoocdn.com/645/430/f3e6db80ed786d8b65abe9c0606ce09860a11716.jpg",
            "https://lid.zoocdn.com/645/430/50082152336b5553adcf53570316232bf0220b37.jpg",
            "https://lid.zoocdn.com/645/430/40af41626ae5ce9382405a6f375a1ef10b14ebc7.jpg",
            "https://lid.zoocdn.com/645/430/45d137179ac6ff27c40a16426099bb01c6f3c203.jpg",
          ],
          isExpired: false,
          isFeatured: false,
          isPremium: false,
          listingId: "67980248",
          location: {
            coordinates: {
              latitude: 51.48246,
              longitude: -0.017057,
            },
          },
          pricing: {
            value: 400000,
            qualifier: "",
            qualifierLabel: "",
            label: "£400,000",
          },
          availability:{
            label: "Open",
            day: "Monday",
            date: "(8/10)",
            time: [
                {
                    from: "10:00",
                    to: "18:00",
                }
            ]

          },
          dimentions: {
              sqft: "1200"
          },
          publicationStatus: "Live",
          tags: [
            {
              label: "Leasehold",
            },
          ],
          title: "1 bed flat for sale",
          grossYields: 7.2,
          rentEstimate: 1300,
          roi: 2.5,
          cashOnCash: 13.2,
        },
        
    
    ]
    
    const images = [
        "https://nextui.org/images/hero-card-complete.jpeg",
        "https://nextui.org/images/card-example-2.jpeg",
        "https://nextui.org/images/card-example-3.jpeg"
      ];
      const mainImages = lisitngData[0].imageUris;  // All images for MainCard
      const thumbnailImages = lisitngData[0].imageUris.slice(0, 4); //first 4 images for thumbnails
      const { bedrooms, bathrooms } = lisitngData[0].attributes;
      
    return (
        <><div className="max-w-[87rem] mx-auto flex flex-col items-center justify-center ">
            <div className="p-4 flex items-center justify-between  w-full">
                <Button size="lg" variant="flat" className="bg-transparent">
                    <Icon icon="mdi:keyboard-arrow-left" />Back to {params.id}
                </Button>
                <div className="flex space-x-2">
                    <Button size="lg" className="bg-transparent">
                        <Icon icon="mdi:heart-outline" />Like
                    </Button>
                    <Button size="lg" className="bg-transparent">
                        <Icon icon="bx:share" />Share
                    </Button>
                </div>
            </div>
            {/* main div */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 p-4  w-full">
                <div className="lg:col-span-7 max-w-screen">
                    <MainCard images={mainImages} />
                </div>
                <div className="hidden lg:grid lg:col-span-3 grid-cols-1 md:grid-cols-2 gap-4">
                    {/* cards for 3d tour and videos */}
                    {/* <TourCard imageUrl={"https://nextui.org/images/card-example-3.jpeg"} />
    <VideoCard imageUrl={"https://nextui.org/images/card-example-3.jpeg"} /> */}
                    
                    {thumbnailImages.map((imageUrl, index) => (
                            <ThumbnailCard key={index} imageUrl={imageUrl} />
                        ))}
                </div>
            </div>

            {/* lower div */}
            <div className="p-4 flex justify-between w-full">
                <div className="flex-1">
                    <div className="mb-4">
                        <p className="font-bold text-md">
                            <span className="px-1 text-gray-400"><Icon width={10} height={10}  className="inline mx-1 " icon="fluent-emoji-flat:green-circle" />{lisitngData[0].tags[0].label}</span>
                            <span className="px-1 text-primary "><Icon className="inline mx-1" icon="gravity-ui:thunderbolt-fill" />{lisitngData[0].flag}</span>
                            <span className="px-1 text-primary"><Icon className="inline mx-1" icon="fa-solid:walking" />{lisitngData[0].availability.label}:</span>
                            <span className="px-1 text-primary">{lisitngData[0].availability.day}</span>
                            <span className="px-1 text-primary">{lisitngData[0].availability.date},</span>
                            <span className="px-1 text-primary">{lisitngData[0].availability.time[0].from}-{lisitngData[0].availability.time[0].to}</span>
                        </p>
                    </div>
                    <div className="mb-4 flex items-center">
                        <div className="flex-1 text-left">
                            <h3 className="font-bold text-4xl">{lisitngData[0].pricing.label}</h3>
                            <span className="font-bold text-sm">{lisitngData[0].address},</span>
                            <span className="font-bold text-gray-400 text-sm"> {lisitngData[0].area} </span>
                        </div>
                        <div className="flex flex-row ml-[auto] mr-8 space-x-8">
                            <div className="text-center">
                                <h3 className="font-semibold text-4xl">{bedrooms}</h3>
                                <p className="text-sm text-gray-600">beds</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-4xl">{bathrooms}</h3>
                                <p className="text-sm text-gray-600">baths</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-semibold text-4xl">{lisitngData[0].dimentions.sqft}</h3>
                                <p className="text-sm text-gray-600">sqft</p>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-sm text-bold">{lisitngData[0].title} | on [{lisitngData[0].agent.branchName}] </p>
                        <div className="pr-4 pt-4">
                            <Button size="lg" className="w-full bg-neutral shadow-sm border rounded-md font-bold text-gray-600">
                                Talk to agent
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 ">
                    <SideCard imageUrl="https://nextui.org/images/hero-card-complete.jpeg" />
                </div>
            </div>
            
        </div>
        <Footer />
        </>
    );
}
