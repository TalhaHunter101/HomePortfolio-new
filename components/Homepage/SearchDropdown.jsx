import React from "react";
import { motion } from "framer-motion";
import { Card, Spinner } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

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
              {results?.postcode?.length > 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    PostCode
                  </p>
                  <div>
                    {results?.postcode.map((item, i) => (
                      <Link
                        key={i}
                        href={`/search/${item?.POSTCODE.replace(
                          /\s+/g,
                          "-"
                        )}`}
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
                            <p className="text-sm text-primaryfonts">
                              {item?.POSTCODE}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results?.posttown?.length > 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    Town
                  </p>
                  <div>
                    {results?.posttown.map((item, i) => (
                      <Link
                        key={i}
                        href={`/search/${item?.POST_TOWN.replace(
                          /\s+/g,
                          "-"
                        )}`}
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
                            <p className="text-sm text-primaryfonts">
                              {item?.POST_TOWN}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results?.thoroughfare?.length > 0 && (
                <div className="px-2 border-b-[1px] border-gray-300">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    Location
                  </p>
                  <div>
                    {results?.thoroughfare.map((item, i) => (
                      <Link key={i} href={`/property/${item?.UPRN}`}>
                        <div className="flex my-3 cursor-pointer">
                          <Image
                            src="/icons/location.svg"
                            height={20}
                            width={20}
                            alt="dev"
                            className="mx-2"
                          />
                          <div>
                            <p className="text-sm text-primaryfonts">
                              {item?.THOROUGHFARE_NAME ? `${item?.THOROUGHFARE_NAME}, ` : ""}
                              {item?.SUB_BUILDING_NAME ? `${item?.SUB_BUILDING_NAME}, ` : ""}
                              {item?.BUILDING_NAME ? `${item?.BUILDING_NAME}, ` : ""}
                              {item?.BUILDING_NUMBER ? `${item?.BUILDING_NUMBER}, ` : ""}
                              {item?.POST_TOWN} {item?.POSTCODE}
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
