'use client';
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function Price() {
  const [selectedKeys1, setSelectedKeys1] = useState(new Set(["Min Price"]));
  const [selectedKeys2, setSelectedKeys2] = useState(new Set(["Max Price"]));

  const selectedValue1 = Array.from(selectedKeys1).join(", ").replaceAll("_", " ");
  const selectedValue2 = Array.from(selectedKeys2).join(", ").replaceAll("_", " ");

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button
          endContent={<Icon icon="ph:caret-down-fill" />}
          radius="sm"
          size="lg"
          className="w-full justify-between max-w-xs"
          auto>
          Price
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button 
               endContent={<Icon icon="uim:multiply" />}
                variant="bordered" 
                className="capitalize"
              >
                {selectedValue1}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Dropdown 1"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys1}
              onSelectionChange={setSelectedKeys1}
            >
              <DropdownItem key="50K">50K</DropdownItem>
              <DropdownItem key="100K">100K</DropdownItem>
              <DropdownItem key="200K">200K</DropdownItem>
              <DropdownItem key="150K">150K</DropdownItem>
              <DropdownItem key="250K">250K</DropdownItem>
            </DropdownMenu>
          </Dropdown>
               <div className=" pt-3 "><Icon icon="ic:round-minus" /></div>
          <Dropdown>
            <DropdownTrigger>
              <Button 
              endContent={<Icon icon="uim:multiply" />}
                variant="bordered" 
                className="capitalize"
              >
                {selectedValue2}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Dropdown 2"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys2}
              onSelectionChange={setSelectedKeys2}
            >
              <DropdownItem key="50K">50K</DropdownItem>
              <DropdownItem key="100K">100K</DropdownItem>
              <DropdownItem key="200K">200K</DropdownItem>
              <DropdownItem key="150K">150K</DropdownItem>
              <DropdownItem key="250K">250K</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </PopoverContent>
    </Popover>
  );
}
