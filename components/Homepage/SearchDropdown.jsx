import React from "react";
import { motion } from "framer-motion";
import { Card, Chip, Spinner } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

function SearchDropdown({ results, isDataLoading }) {
  return (
    <>
      {isDataLoading && (
        <Card className="max-h-[50vh] overflow-y-auto py-2">
          <Spinner label="Loading..." color="warning" />
        </Card>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-2"
      >
        <Card className="max-h-[50vh] overflow-y-auto py-2">
          <div className="px-2 border-b border-gray-300">
            <div>
              {results?.towns?.length > 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    Places
                  </p>
                  <div>
                    {results?.towns.map((item, i) => (
                      // <Link
                      //   key={i}
                      //   href={`/search/${item?.replace(/\s+/g, "-")}`}
                      // >
                      //   <div className="flex my-3 cursor-pointer">
                      //     <Image
                      //       src="/icons/location.svg"
                      //       height={20}
                      //       width={20}
                      //       alt="dev"
                      //       className="mx-2"
                      //     />
                      //     <div>
                      //       <p className="text-sm text-primaryfonts">{item}</p>
                      //     </div>
                      //   </div>
                      // </Link>
                      <div key={i} className="my-3">
                        <div className="flex">
                          <Link
                            href={{
                              pathname: `/search/${item.name?.replace(
                                /\s+/g,
                                "-"
                              )}?type=${item.type}`,
                            }}
                          >
                            <div className="flex cursor-pointer">
                              <Image
                                src="/icons/location.svg"
                                height={20}
                                width={20}
                                alt="dev"
                                className="mx-2"
                              />
                              <div className="flex flex-row gap-4">
                                <span className="text-md font-light ">
                                  {item.name}
                                </span>

                                <span className="text-xs font-semibold shadow-md p-1  ">
                                  {" "}
                                  {item.type === "town" ? "City" : "County"}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                        {/* {
  item?.towns.map((town, i) => (
    <Link
      key={i}
      href={`/search/${town?.replace(/\s+/g, "-")}?type=town`}
    >
      <div className="flex cursor-pointer">
        <Image 
          src="/icons/location.svg"
          height={20}
          width={20}
          alt="dev"
          className="mx-2"
        />
        <div>
          <p className="text-sm text-primaryfonts">{town}</p>
        </div>
      </div>
    </Link>
  ))
} */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results?.county?.length >= 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    County
                  </p>
                  <div>
                    {results?.county.map((item, i) => (
                      <Link
                        key={i}
                        href={{
                          pathname: `/search/${item?.name?.replace(
                            /\s+/g,
                            "-"
                          )}?type=${item?.type}`,
                        }}
                      >
                        <div className="flex my-3 cursor-pointer">
                          <Image
                            src="/icons/country.svg"
                            height={20}
                            width={20}
                            alt="dev"
                            className="mx-2"
                          />
                          <div>
                            <p className="text-sm text-primaryfonts">
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results?.postcodes?.length > 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    PostCode
                  </p>
                  <div>
                    {results?.postcodes.map((item, i) => (
                      // <Link
                      //   key={i}
                      //   href={`/search/${item?.POSTCODE.replace(
                      //     /\s+/g,
                      //     "-"
                      //   )}`}
                      // >

                      <Link
                        key={i}
                        href={{
                          pathname: `/search/${item?.replace(/\s+/g, "-")}`,
                        }}
                      >
                        <div className="flex my-3 cursor-pointer">
                          <Image
                            src="/icons/location.svg"
                            height={20}
                            width={20}
                            alt="dev"
                            className="mx-2"
                          />
                          <div>
                            <p className="text-sm text-primaryfonts">{item}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results?.address?.length > 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    Addresses
                  </p>
                  <div>
                    {results?.address.map((item, i) => (
                      <Link
                        key={i}
                        href={{
                          pathname: item?.is_property
                            ? `/property/${item?.listingId}`
                            : `/house/${item?.full_address
                                ?.toLowerCase() // Convert to lowercase
                                .replace(/\s+/g, "-") // Replace spaces with hyphens
                                .replace(/,/g, "")}?uprn=${
                                item?.address?.uprn
                              }`,
                        }}
                      >
                        <div className="flex my-3 cursor-pointer">
                          <Icon
                            icon="entypo:address"
                            height={20}
                            width={20}
                            color="black"
                            className="mx-2"
                          />
                          <div>
                            <p className="text-sm text-primaryfonts">
                              {/* {item?.SUB_BUILDING_NAME} {item?.BUILDING_NAME} {item?.BUILDING_NUMBER} {item?.THOROUGHFARE} */}
                              {item?.full_address}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
export default SearchDropdown;

//Old code
{
  /* <Card className="max-h-[50vh] overflow-y-auto py-2">
{results?.uk?.length !== 0 && (
  <div className="px-2 border-b border-gray-300 ">
    <p className="my-1 text-sm font-semibold text-gray-800 uppercase ">
      PostCode
    </p>
    <div>
      {results?.uk?.map((item, i) => (
        <Link
          key={i}
          href={`/location/postcode-${item?._source?.post_code.replace(
            /\s+/g,
            "-"
          )}`}
        >
          <div
            onClick={() => setSearchInput(false)}
            className="flex my-3 cursor-pointer "
          >
            <Image
              src="/icons/location.svg"
              height={20}
              width={20}
              alt="dev"
              className="mx-2 "
            />
            <div>
              <p className="text-sm text-primaryfonts">
                {item?._source?.post_code}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

{results?.county?.length !== 0 && (
  <div className="px-2 border-b border-gray-300 ">
    <p className="my-1 text-sm font-semibold text-gray-800 uppercase ">
      County
    </p>
    <div>
      {[
        ...new Set(
          results?.county?.map((item) => item?._source?.countyAreaName)
        ),
      ].map((countyAreaName, i) => (
        <Link
          key={i}
          href={`/location/county-${countyAreaName.replace(
            /\s+/g,
            "-"
          )}`}
          passHref
        >
          <div
            onClick={() => setSearchInput(false)}
            className="flex my-3 cursor-pointer"
          >
            <Image
              src="/icons/country.svg"
              height={20}
              width={20}
              alt="dev"
              className="mx-2 "
            />
            <div>
              <p className="text-sm text-primaryfonts">
                {countyAreaName}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

{results?.address?.length !== 0 && (
  <div className="px-2 border-b border-gray-300 ">
    <p className="my-1 text-sm font-semibold text-gray-800 uppercase ">
      Address
    </p>
    <div>
      {results?.address?.map((item, i) => (
        <Link key={i} href={`/property/${item?._id}`}>
          <div
            onClick={() => setSearchInput(false)}
            className="flex my-3 cursor-pointer "
          >
            <Image
              src="/icons/location.svg"
              height={20}
              width={20}
              alt="dev"
              className="mx-2 "
            />
            <div>
              <p className="text-sm text-primaryfonts">
                {item?._source?.address}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
</Card> */
}
