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
    setMonthFilter,
    monthFilter,
  } = useStore();
  const [selectedKeys1, setSelectedKeys1] = useState(new Set(["Min Price"]));
  const [selectedKeys2, setSelectedKeys2] = useState(new Set(["Max Price"]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  

  const homeTypeArray = Array.isArray(homeType) ? homeType : [];
  const [isSelected, setIsSelected] = useState(true);
  const [monthsListed, setMonthsListed] = useState(0);
  const allHomeTypes = ["Flats", "Terraced", "Semi Detached", "Detached"];
  const [selectedHomeTypes, setSelectedHomeTypes] = useState(homeType);
  const isAllSelected = selectedHomeTypes.length === allHomeTypes.length;

  const handleSwitchChange = (checked) => {
    if (checked) {
      setSelectedHomeTypes(allHomeTypes);
    } else {
      setSelectedHomeTypes([]);
    }
    setHomeType(selectedHomeTypes);
  };

  const handleHomeTypeChange = (type, isChecked) => {
    let updatedTypes = [...selectedHomeTypes];
    if (isChecked) {
      updatedTypes.push(type);
    } else {
      updatedTypes = updatedTypes.filter((t) => t !== type);
    }
    setSelectedHomeTypes(updatedTypes);
    setHomeType(updatedTypes);
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
              <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
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
                        <DropdownItem key="500000">500K</DropdownItem>
                        <DropdownItem key="750000">750K</DropdownItem>
                        <DropdownItem key="1000000">1M</DropdownItem>
                        <DropdownItem key="2000000">2M</DropdownItem>
                        <DropdownItem key="5000000">5M</DropdownItem>
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
                        <DropdownItem key="500000">500K</DropdownItem>
                        <DropdownItem key="750000">750K</DropdownItem>
                        <DropdownItem key="1000000">1M</DropdownItem>
                        <DropdownItem key="2000000">2M</DropdownItem>
                        <DropdownItem key="5000000">5M</DropdownItem>
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
                  <Switch isSelected={monthFilter} onValueChange={setMonthFilter}>
                  Months Listed
                  </Switch>
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
