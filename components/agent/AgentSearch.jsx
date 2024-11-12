import { Card, Image, Spinner } from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function AgentSearch({ postcodeData }) {
  console.log("postcodeData is", postcodeData);

  return (
    <>
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
              {postcodeData.length > 0 && (
                <div className="px-2">
                  <p className="my-1 text-xs font-semibold text-gray-500 uppercase">
                    Postcode
                  </p>
                  <div>
                    {postcodeData?.map((item, i) => (
                      <div key={i} className="my-3">
                        <div className="flex">
                          <Link
                            href={{
                              pathname: `/compare-agents/search/${item.ref_postcode
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}`,
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
                              <div className="flex flex-row gap-4 ml-6">
                                <span className="text-md font-light ">
                                  {item.ref_postcode}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
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

export default AgentSearch;
