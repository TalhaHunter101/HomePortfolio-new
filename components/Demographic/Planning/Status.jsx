import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@nextui-org/react";

export function StatusCard({ label, count, iconColor, icon }) {
  return (
    <div className="flex flex-col items-center justify-center w-full sm:w-40 h-auto mb-2 sm:mb-0">
      <Card className="flex  flex-col items-center justify-center w-full sm:w-40 h-24">
        <CardBody>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{count}</p>
            <p className="text-sm font-medium">
              <Icon
                icon={icon}
                width={28}
                height={28}
                className={`inline pb-1 ${iconColor}`}
              />{" "}
              {label}
            </p>
            {/* <p className="text-xs text-gray-500">last 30 days</p> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
