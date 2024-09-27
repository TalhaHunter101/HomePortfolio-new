"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { formatCurrency, timeAgo } from "@/utils/Helper";

export function BasicInfoCard({ title, content, data, price, area }) {
  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full mr-2">
            <Icon
              icon="mdi:home-outline"
              width={16} // Adjust the icon size to fit well within the circle
              className="text-purple-700" // Adjust the icon color if needed
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
            What are the home highlights here?
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <div class=" p-4 bg-default-white  rounded-md ">
          <h3 class="text-xl font-semibold text-black ">Home Highlights</h3>
          <div class="flex flex-wrap gap-4 my-5">
            <div class="flex items-center justify-center p-2 bg-gray-200 rounded-md ">
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                class="inline-block mr-2"
                viewBox="0 0 448 512"
              >
                <path
                  stroke="none"
                  d="M96 80a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm1.7 206c6.2-2.3 11.8-6.3 15-12.2l40-71.9c14.4-25.9 41.7-42 71.3-42s56.9 16.1 71.3 42l40 71.9c3.2 5.8 8.8 9.9 15 12.2 38.3 14 65.7 50.8 65.7 94 0 55.2-44.8 100-100 100-21.2 0-40.8-6.6-56.9-17.8-17.4-12-52.8-12-70.1 0-16.2 11.2-35.8 17.8-57 17.8-55.2 0-100-44.8-100-100 0-43.2 27.4-80 65.7-94zM304 32a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm48 160a48 48 0 1 1 96 0 48 48 0 1 1-96 0zM48 144a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                ></path>
              </svg>
              <p class="text-[12px] text-black font-medium ">Dog Friendly</p>
            </div>
            <div class="flex items-center justify-center p-2 bg-gray-200 rounded-md ">
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                class="inline-block mr-2"
                viewBox="0 0 512 512"
              >
                <path
                  stroke="none"
                  d="M288 96c0-17.7 14.3-32 32-32s32 14.3 32 32 14.3 32 32 32 32-14.3 32-32c0-53-43-96-96-96s-96 43-96 96v192h-64v-24c0-30.9-25.1-56-56-56H56c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c4.4 0 8 3.6 8 8v24H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h448c17.7 0 32-14.3 32-32s-14.3-32-32-32h-80v-24c0-4.4 3.6-8 8-8h56c13.3 0 24-10.7 24-24s-10.7-24-24-24h-56c-30.9 0-56 25.1-56 56v24h-64V96zm192 320v-32H32v32c0 53 43 96 96 96h256c53 0 96-43 96-96z"
                ></path>
              </svg>
              <p class="text-[12px] text-black font-medium ">
                Stainless Steel Appliances
              </p>
            </div>
            <div class="flex items-center justify-center p-2 bg-gray-200 rounded-md ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                class="inline-block mr-2"
                viewBox="0 0 512 512"
              >
                <path
                  stroke="none"
                  d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm129-281c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"
                ></path>
              </svg>
              <p class="text-[12px] text-black font-medium ">
                Upgraded Kitchen
              </p>
            </div>
            <div class="flex items-center justify-center p-2 bg-gray-200 rounded-md ">
              <p class="text-[12px] text-black font-medium ">
                Nearby Parks Playgrounds
              </p>
            </div>
            <div class="flex items-center justify-center p-2 bg-gray-200 rounded-md ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                class="inline-block mr-2"
                viewBox="0 0 640 512"
              >
                <path
                  stroke="none"
                  d="M400 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm27.2 64-61.8-48.8c-17.3-13.6-41.7-13.8-59.1-.3l-83.1 64.2c-30.7 23.8-28.5 70.8 4.3 91.6l60.5 38.4V416c0 17.7 14.3 32 32 32s32-14.3 32-32V288c0-10.7-5.3-20.7-14.2-26.6L295 232.9l60.3-48.5L396 217c5.7 4.5 12.7 7 20 7h64c17.7 0 32-14.3 32-32s-14.3-32-32-32h-52.8zM56 384a72 72 0 1 1 144 0 72 72 0 1 1-144 0zm200 0a128 128 0 1 0-256 0 128 128 0 1 0 256 0zm184 0a72 72 0 1 1 144 0 72 72 0 1 1-144 0zm200 0a128 128 0 1 0-256 0 128 128 0 1 0 256 0z"
                ></path>
              </svg>
              <p class="text-[12px] text-black font-medium ">Bike Friendly</p>
            </div>
            <div class="flex items-center justify-center p-2 bg-gray-200 rounded-md ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                class="inline-block mr-2"
                viewBox="0 0 320 512"
              >
                <path
                  stroke="none"
                  d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm-33.5 151.3c-1 .4-1.9.8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2S12 246.5 17.6 229.7l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14 44.6 0 84.8 26.8 101.9 67.9l15.4 36.9 21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1l-61.7 61.7c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"
                ></path>
              </svg>
              <p class="text-[12px] text-black font-medium ">Walker Paradise</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-3 mt-10 ">
            <div class="flex items-center ">
              <div class="flex items-center text-sm text-gray-500 gap-x-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"></path>
                </svg>
                <span>Price/Sqft :</span>
              </div>
              <p class="text-sm underline text-secNew  p-2">
                {formatCurrency(parseInt(price) / parseInt(area))}
              </p>
            </div>
            <div class="flex items-center">
              <div class="flex items-center text-sm text-gray-500 gap-x-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM240 320h-48v48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h96c52.9 0 96 43.1 96 96s-43.1 96-96 96zm0-128h-48v64h48c17.6 0 32-14.4 32-32s-14.4-32-32-32z"></path>
                </svg>
                <span>Parking : </span>
              </div>
              <p class="text-sm text-primaryfonts ">None, Off Street</p>
            </div>
            <div class="flex items-center ">
              <div class="flex items-center text-sm text-gray-500 gap-x-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"></path>
                </svg>
                <span>Time on HomePortfolio:</span>
              </div>
              <p class="text-sm text-primaryfonts">
                  {timeAgo( data?.publishedOn)}
              </p>
            </div>
          </div>
          <h3 class="mt-10 text-xl font-semibold text-black ">
            Property Facts
          </h3>
          <div class="flex flex-col sm:flex-row justify-between mt-5 text-sm text-gray-600 capitalize gap-x-10">
            <div class="flex flex-col gap-y-1 w-full sm:w-[40%]">
              <div class="grid grid-cols-2 ">
                <p>Status</p>
                <p class=" text-primaryfonts">
                  {data?.analyticsTaxonomy?.section}
                </p>
              </div>
              <div class="grid grid-cols-2 ">
                <p>Community</p>
                <p class=" text-primaryfonts">Pennine Ways Ltd</p>
              </div>
              <div class="grid grid-cols-2 ">
                <p>Property Type</p>
                <p class=" text-primaryfonts">
                  {data?.analyticsTaxonomy?.propertyType}
                </p>
              </div>

              <div class="grid grid-cols-2 ">
                <p>Virtual Tour</p>
                <p class="underline cursor-pointer text-primary">
                  {data?.content?.virtualTour ? (
                    <a
                      href={data?.content?.virtualTour[0]?.original}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "NA"
                  )}
                </p>
              </div>
              <div class="grid grid-cols-2 ">
                <p>Floor Size</p>
                <p class=" text-primaryfonts">
                  {area}
                  sqft.
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-y-1 w-full sm:w-[40%]">
              <div class="grid grid-cols-2 ">
                <p>Year Built</p>
                <p class=" text-primaryfonts">2005</p>
              </div>

              <div class="grid grid-cols-2 ">
                <p>County</p>
                <p class="  ">{data?.analyticsTaxonomy?.postTownName}</p>
              </div>
              <div class="grid grid-cols-2 ">
                <p>Time On HomePortfolio</p>
                <p class=" text-primaryfonts">
                  {timeAgo(data?.publishedOn)}
                </p>
              </div>
              <div class="grid grid-cols-2 ">
                <p>City</p>
                <p class="  ">{data?.location?.townOrCity}</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
