"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { formatDate } from "@/utils/Helper";

export function PriceHistory({  data }) {
  return (
    <Card className="m-4" style={{ minHeight: "150px" }}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
        <section
          id="price-history"
          className="mb-5 sm:mb-6 h-full border border-gray-200 bg-default-white rounded-lg px-4 py-4  w-full"
        >
          <div className="text-xs md:text-sm text-foreground bg-opacity-50 bg-default  rounded-lg mb-5 sm:mb-6 p-4 border border-gray-200">
            No recent price changes.
          </div>
          <h2 className="flex items-center space-x-2 sm:space-x-4 font-semibold text-gray-800 mb-8 sm:mb-8 text-md md:text-[20px]">
            <span>Price history</span>
          </h2>
          <div className="overflow-y-auto  h-auto">
            {data && data?.priceHistory?.firstPublished && (
              <div className="grid grid-cols-8 col-auto mb-2 sm:mb-5 text-foreground text-xs sm:text-base font-medium">
                <div className="flex flex-row col-span-3">
                  <div className="c-zero text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0"
                      className="inline-block"
                    >
                      <path d="M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                    </svg>
                  </div>
                  <div className="mx-2">
                    {formatDate(data?.priceHistory?.firstPublished?.firstPublishedDate)}
                  </div>
                </div>
                <div className="col-span-3">
                  First Published
                  <br />
                  {/* <span className="subText">CRMLS #224003119</span> */}
                </div>
                <div className="col-span-2">
                  {data?.priceHistory?.firstPublished?.priceLabel}
                </div>
              </div>
            )}

            <div className="grid grid-cols-8 col-auto mb-2 sm:mb-5 text-foreground text-xs sm:text-base">
              <div className="col-span-10">
                <hr className="my-0 border-subtle-border dark:border-gray-700" />
              </div>
            </div>

            {data &&
              data?.priceChanges?.map((change, index) => (
                <div
                  className="grid grid-cols-8 col-auto mb-2 sm:mb-5 text-foreground text-xs sm:text-base"
                  key={index}
                >
                  <div className="flex flex-row col-span-3">
                    <div className="c-zero text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        className="inline-block"
                      >
                        <path d="M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                      </svg>
                    </div>
                    <div className="mx-2">
                      {formatDate(change.priceChangeDate)}
                    </div>
                  </div>
                  <div className="col-span-3">
                    Sold
                    <br />
                    <span className="subText">
                      {change.isPriceDrop ? "Price Drop" : "Price Change"}
                    </span>
                  </div>
                  <div className="col-span-2">{change.priceChangeLabel}</div>
                </div>
              ))}

            <div className="grid grid-cols-8 col-auto mb-2 sm:mb-5 text-foreground text-xs sm:text-base">
              <div className="col-span-10">
                <hr className="my-0 border-subtle-border dark:border-gray-700" />
              </div>
            </div>

            {data && data?.priceHistory?.lastSale && (
              <div className="grid grid-cols-8 col-auto mb-2 sm:mb-5 text-foreground text-xs sm:text-base font-medium">
                <div className="flex flex-row col-span-3">
                  <div className="c-zero text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0"
                      className="inline-block"
                    >
                      <path d="M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                    </svg>
                  </div>
                  <div className="mx-2">{formatDate(data?.priceHistory?.lastSale?.date)}</div>
                </div>
                <div className="col-span-3">
                  Last Published
                  <br />
                  {/* <span className="subText">CRMLS #224003119</span> */}
                </div>
                <div className="col-span-2">{data?.priceHistory?.lastSale?.priceLabel}</div>
              </div>
            )}
          </div>
          <div className="flex items-center h-6 mt-2 text-muted-foreground justify-start">
            Source: Public Records
          </div>
        </section>
      </CardBody>
    </Card>
  );
}
