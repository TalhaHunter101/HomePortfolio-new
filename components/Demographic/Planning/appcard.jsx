import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { formatDateNew } from "@/utils/Helper";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function AppCard({ data }) {

  return (
    <Card className="m-4 p-0 overflow-hidden  ">
      <CardBody>
        <h3 className="font-semibold text-xs mb-2">Planning Applications</h3>

        {data &&
          data.map((item, index) => (
            <div
              className="bg-gray-100 shadow-md p-2 rounded-md mb-2"
              key={index}
            >
              <span className="text-xs text-gray-500">
                {formatDateNew(item?._source?.other_fields?.date_received)}
              </span>
              <div className="flex items-center">
                <Chip
                  size="sm"
                  className={`${
                    [
                      "Granted",
                      "Approved",
                      "Approve",
                      "Approval",
                      "Approve with Conditions",
                    ].includes(item?._source?.other_fields?.decision)
                      ? "bg-green-400"
                      : ["Refused", "Withdrawn", "Refuse"].includes(
                          item?._source?.other_fields?.decision
                        )
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  } text-white text-xs font-bold px-2 py-1  mr-2`}
                >
                  {item?._source?.other_fields?.decision}
                </Chip>

                <span className="font-semibold">
                  <a href={item?._source?.other_fields?.source_url}>
                    <Icon  icon="iconamoon:link-external-thin" />
                  </a>
                </span>
              </div>
              <p className="text-sm text-gray-600">{item?._source?.address}</p>
            </div>
          ))}
      </CardBody>
    </Card>
  );
}
