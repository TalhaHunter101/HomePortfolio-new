// FilterButtonWithPopover.js
import React, { useState, useMemo } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export const FilterButton = () => {
  const [selectedType1, setSelectedType1] = useState(new Set(["single_family"]));
  const [selectedMetric1, setSelectedMetric1] = useState(new Set(["beds"]));
  const [selectedType2, setSelectedType2] = useState(new Set(["condos"]));
  const [selectedMetric2, setSelectedMetric2] = useState(new Set(["beds"]));

  const [isOpenType1, setIsOpenType1] = useState(false);
  const [isOpenMetric1, setIsOpenMetric1] = useState(false);
  const [isOpenType2, setIsOpenType2] = useState(false);
  const [isOpenMetric2, setIsOpenMetric2] = useState(false);

  const selectedValue = (selectedKeys) => Array.from(selectedKeys).join(", ").replaceAll("_", " ");

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button size='sm' variant="bordered" isIconOnly>
          <Icon color='gray' icon="mage:filter-fill" width={20} height={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          {/* Type 1 Dropdown */}
          <div className="flex items-center space-x-2 mb-2">
            <span>Type 1:</span>
            <Dropdown onOpenChange={setIsOpenType1}>
              <DropdownTrigger>
                <Button size='sm' variant="faded" className="capitalize"
                  endContent={
                    <Icon  icon={isOpenType1 ? "ph:caret-up-fill" : "ph:caret-down-fill"} />
                  }>
                  {selectedValue(selectedType1)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Type 1 selection"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedType1}
                onSelectionChange={setSelectedType1}
              >
                <DropdownItem key="single_family">Single Family</DropdownItem>
                <DropdownItem key="condos">Condos</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown onOpenChange={setIsOpenMetric1}>
              <DropdownTrigger>
                <Button size='sm' variant="faded" className="capitalize"
                  endContent={
                    <Icon icon={isOpenMetric1 ? "ph:caret-up-fill" : "ph:caret-down-fill"} />
                  }>
                  {selectedValue(selectedMetric1)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Metric 1 selection"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedMetric1}
                onSelectionChange={setSelectedMetric1}
              >
                <DropdownItem key="beds">Beds</DropdownItem>
                <DropdownItem key="baths">Baths</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Type 2 Dropdown */}
          <div className="flex items-center space-x-2 mb-4">
            <span>Type 2:</span>
            <Dropdown onOpenChange={setIsOpenType2}>
              <DropdownTrigger>
                <Button size='sm' variant="faded" className="capitalize"
                  endContent={
                    <Icon icon={isOpenType2 ? "ph:caret-up-fill" : "ph:caret-down-fill"} />
                  }>
                  {selectedValue(selectedType2)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Type 2 selection"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedType2}
                onSelectionChange={setSelectedType2}
              >
                <DropdownItem key="single_family">Single Family</DropdownItem>
                <DropdownItem key="condos">Condos</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown onOpenChange={setIsOpenMetric2}>
              <DropdownTrigger>
                <Button size='sm' variant="faded" className="capitalize"
                  endContent={
                    <Icon icon={isOpenMetric2 ? "ph:caret-up-fill" : "ph:caret-down-fill"} />
                  }>
                  {selectedValue(selectedMetric2)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Metric 2 selection"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedMetric2}
                onSelectionChange={setSelectedMetric2}
              >
                <DropdownItem key="beds">Beds</DropdownItem>
                <DropdownItem key="baths">Baths</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Analyse Button */}
          <div className="flex w-full justify-center">
            <Button size='sm' variant="ghost" className='w-full' flat>
              Analyse
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
