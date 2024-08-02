'use client';
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, Tabs, Tab,Checkbox, Switch, Badge } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function Filter() {
  const [selectedKeys1, setSelectedKeys1] = useState(new Set(["Min Price"]));
  const [selectedKeys2, setSelectedKeys2] = useState(new Set(["Max Price"]));

  const selectedValue1 = Array.from(selectedKeys1).join(", ").replaceAll("_", " ");
  const selectedValue2 = Array.from(selectedKeys2).join(", ").replaceAll("_", " ");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSelected, setIsSelected] = useState(true);
  const handleSwitchChange = (checked) => {
    setIsSelected(checked);
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title 
                </ModalHeader>
              <ModalBody>
              
               
                <div className="px-1 py-2">
                  <h3 className="text-lg font-semibold mb-2">Price </h3>
                  <div className="flex gap-2">
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
                    <div className="pt-3"><Icon icon="ic:round-minus" /></div>
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
                  
                </div>
                <Divider />
                <div className="px-1 py-2">
                  <h3 className="text-lg font-semibold mb-2">Beds </h3>
                  <div className="flex gap-2">
                  <Tabs variant="bordered"  aria-label="Tabs variants" css={{ marginBottom: '10px' }}>
                <Tab key="photos" title="any" />
                <Tab key="music" title="1+" />
                <Tab key="videos" title="2+" />
                <Tab key="news" title="3+" />
                <Tab key="blogs" title="4+" />
              </Tabs>
                  </div>
                  
                </div>
                <div className="px-1 py-2">
                  <h3 className="text-lg font-semibold mb-2">Baths </h3>
                  <div className="flex gap-2">
                  <Tabs variant="bordered"  aria-label="Tabs variants" css={{ marginBottom: '10px' }}>
                <Tab key="photos" title="any" />
                <Tab key="music" title="1+" />
                <Tab key="videos" title="2+" />
                <Tab key="news" title="3+" />
                <Tab key="blogs" title="4+" />
              </Tabs>
                  </div>
                  
                </div>
             <Divider />
             <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold">Home Types</h4>
            <Switch 
              isSelected={isSelected} 
              onValueChange={handleSwitchChange}
              className="ml-auto text-xs"
              size="sm"
            >
              {isSelected ? "Deselect All" : "Select All"}
            </Switch>
          </div>
          <div className="grid  grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Checkbox  isSelected={isSelected} defaultSelected={isSelected}>Houses</Checkbox>
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>Condos</Checkbox>
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>Town Homes</Checkbox>
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>Multi family</Checkbox>
            </div>
            <div className="flex flex-col gap-2">
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>TIC</Checkbox>
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>Mobile</Checkbox>
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>Land</Checkbox>
              <Checkbox isSelected={isSelected} defaultSelected={isSelected}>Other</Checkbox>
            </div>
          </div>
              </ModalBody>
              <ModalFooter>
                

                
              <Button className="" >
                 Clear
                </Button>
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
