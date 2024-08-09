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

export default function Baths() {
  const { selectedBaths, setSelectedBaths } = useStore();


  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button
          endContent={<Icon icon="ph:caret-down-fill" />}
          radius="sm"
          size="lg"
          className="w-full justify-between max-w-xs"
          auto
        >
          Baths
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-tiny">
            <Tabs
              variant="bordered"
              aria-label="Tabs variants"
              css={{ marginBottom: "10px" }}
              selectedKey={selectedBaths}
              onSelectionChange={setSelectedBaths}
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
