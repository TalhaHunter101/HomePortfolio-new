'use client';
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useStore from "@/store/useStore";
 
export default function Price() {
  const { setMinPrice, setMaxPrice } = useStore();

  const [selectedKeys1, setSelectedKeys1] = useState(new Set(["Min Price"]));
  const [selectedKeys2, setSelectedKeys2] = useState(new Set(["Max Price"]));

  const selectedValue1 = Array.from(selectedKeys1).join(", ").replaceAll("_", " ");
  const selectedValue2 = Array.from(selectedKeys2).join(", ").replaceAll("_", " ");

  const [isOpen, setIsOpen] = useState(false);

  
  const handleMinPriceChange = (keys) => {
    setSelectedKeys1(keys);
    setMinPrice(Array.from(keys).join(", "));
  };

  const handleMaxPriceChange = (keys) => {
    setSelectedKeys2(keys);
    setMaxPrice(Array.from(keys).join(", "));
  };


  return (
    <Popover placement="bottom" 
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
              onSelectionChange={handleMinPriceChange}
            >
              <DropdownItem key="50000">50K</DropdownItem>
              <DropdownItem key="100000">100K</DropdownItem>
              <DropdownItem key="150000">150K</DropdownItem>
              <DropdownItem key="200000">200K</DropdownItem>
              <DropdownItem key="250000">250K</DropdownItem>
              <DropdownItem key="500000">500K</DropdownItem>
              <DropdownItem key="750000">750K</DropdownItem>
              <DropdownItem key="1000000">1M</DropdownItem>
              <DropdownItem key="2000000">2M</DropdownItem>
              <DropdownItem key="5000000">5M</DropdownItem>
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
              onSelectionChange={handleMaxPriceChange}
            >
              <DropdownItem key="50000">50K</DropdownItem>
              <DropdownItem key="100000">100K</DropdownItem>
              <DropdownItem key="150000">150K</DropdownItem>
              <DropdownItem key="200000">200K</DropdownItem>
              <DropdownItem key="250000">250K</DropdownItem>
              <DropdownItem key="500000">500K</DropdownItem>
              <DropdownItem key="750000">750K</DropdownItem>
              <DropdownItem key="1000000">1M</DropdownItem>
              <DropdownItem key="2000000">2M</DropdownItem>
              <DropdownItem key="5000000">5M</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </PopoverContent>
    </Popover>
  );
}
