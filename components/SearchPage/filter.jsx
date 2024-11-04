"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Tabs,
  Tab,
  Checkbox,
  Switch,
  Badge,
  Slider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useStore from "@/store/useStore";

export default function Filter() {
  const {
    setMinPrice,
    setMaxPrice,
    selectedBeds,
    setSelectedBeds,
    homeType,
    setHomeType,
  } = useStore();
  const [selectedKeys1, setSelectedKeys1] = useState(new Set(["Min Price"]));
  const [selectedKeys2, setSelectedKeys2] = useState(new Set(["Max Price"]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const allHomeTypes = ["Flats", "Terraced", "Semi Detached", "Detached"];
  const isAllSelected = homeType.length === allHomeTypes.length;
  const homeTypeArray = Array.isArray(homeType) ? homeType : [];
  const [isSelected, setIsSelected] = useState(true);
  const [monthsListed, setMonthsListed] = useState(0);

  const handleSwitchChange = (checked) => {
    setIsSelected(checked);
    if (checked) {
      setHomeType(allHomeTypes);
    } else {
      setHomeType([]);
    }
  };

  const handleHomeTypeChange = (type, isChecked) => {
    setHomeType((prevTypes) => {
      const currentTypes = Array.isArray(prevTypes) ? prevTypes : [];
      if (isChecked) {
        return [...currentTypes, type];
      } else {
        return currentTypes.filter((item) => item !== type);
      }
    });
  };

  const handleMinPriceChange = (keys) => {
    setSelectedKeys1(keys);
    setMinPrice(Array.from(keys).join(", "));
  };

  const handleMaxPriceChange = (keys) => {
    setSelectedKeys2(keys);
    setMaxPrice(Array.from(keys).join(", "));
  };

  return (
    <>
      <Badge content="5" color="primary">
        <Button
          endContent={<Icon icon="mage:filter" />}
          radius="sm"
          size="lg"
          className="w-full justify-between max-w-xs"
          auto
          onPress={onOpen}
        >
          Filter
        </Button>
      </Badge>
      <Modal
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isKeyboardDismissDisabled={true}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {/* Price Selection */}
                <div className="px-1 py-2">
                  <p className="text-lg font-semibold mb-2">Price </p>
                  <div className="px-1 py-2 flex gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          endContent={<Icon icon="uim:multiply" />}
                          variant="bordered"
                          className="capitalize"
                        >
                          {Array.from(selectedKeys1)
                            .join(", ")
                            .replaceAll("_", " ")}
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
                      </DropdownMenu>
                    </Dropdown>
                    <div className=" pt-3 ">
                      <Icon icon="ic:round-minus" />
                    </div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          endContent={<Icon icon="uim:multiply" />}
                          variant="bordered"
                          className="capitalize"
                        >
                          {Array.from(selectedKeys2)
                            .join(", ")
                            .replaceAll("_", " ")}
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
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <Divider />
                {/* Beds Selection */}
                <div className="px-1 py-2">
                  <p className="text-lg font-semibold mb-2">Beds </p>
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
                </div>
                <Divider />
                {/* Home Types Selection */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Home Types</p>
                  <Switch
                    isSelected={isAllSelected}
                    onValueChange={handleSwitchChange}
                    className="ml-auto text-xs"
                    size="sm"
                  >
                    {isAllSelected ? "Deselect All" : "Select All"}
                  </Switch>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {allHomeTypes.map((type) => (
                    <Checkbox
                      key={type}
                      isSelected={homeTypeArray.includes(type)}
                      onValueChange={(isChecked) =>
                        handleHomeTypeChange(type, isChecked)
                      }
                    >
                      {type}
                    </Checkbox>
                  ))}
                </div>
                <Divider />
                {/* Months Listed Selection */}
                <div className="px-1 py-2">
                  <p className="text-lg font-semibold mb-2">Months Listed</p>
                  <Slider
                    size="md"
                    step={1}
                    color="foreground"
                    showSteps={true}
                    maxValue={25}
                    minValue={0}
                    value={monthsListed}
                    onChange={(value) => setMonthsListed(value)}
                    className="max-w-md"
                  />
                  <p className="text-sm mt-2">
                    Selected: {monthsListed} months
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="">Clear</Button>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
