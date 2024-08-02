'use client';
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Tabs, Tab } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function Baths() {
  const variants = [
    "solid",
    "underlined",
    "bordered",
    "light",
  ];

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button
         endContent={<Icon icon="ph:caret-down-fill" />}
         radius="sm"
         size="lg"
         className="w-full justify-between max-w-xs"
         auto>Baths</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
         
          <div className="text-tiny">
           
              <Tabs variant="bordered"  aria-label="Tabs variants" css={{ marginBottom: '10px' }}>
                <Tab key="photos" title="any" />
                <Tab key="music" title="1+" />
                <Tab key="videos" title="2+" />
                <Tab key="news" title="3+" />
                <Tab key="blogs" title="4+" />
              </Tabs>
           
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
