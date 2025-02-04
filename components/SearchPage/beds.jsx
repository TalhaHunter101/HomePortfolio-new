"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useStore from "@/store/useStore";

export default function Beds() {
  const { selectedBeds, setSelectedBeds } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom"
      showArrow={true}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button
          endContent={
            <Icon icon={isOpen ? "ph:caret-up-fill" : "ph:caret-down-fill"} />
          }
          radius="sm"
          size="lg"
          className="w-full justify-between max-w-xs"
          auto
        >
          Beds
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-tiny">
            <Tabs
              variant="bordered"
              aria-label="Tabs variants"
              css={{ marginBottom: "10px" }}
              selectedKey={selectedBeds}
              onSelectionChange={setSelectedBeds}
            >
              <Tab key="any" title="any" />
              <Tab key="1" title="1+" />
              <Tab key="2" title="2+" />
              <Tab key="3" title="3+" />
              <Tab key="4" title="4+" />
            </Tabs>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
