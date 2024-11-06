import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const TimeFrameDropdown = ({ options, selectedKey, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownOpenChange = (openState) => {
    setIsOpen(openState);
  };

  return (
    <Dropdown  isOpen={isOpen} onOpenChange={handleDropdownOpenChange}>
      <DropdownTrigger>
        <Button variant="flat">
          Show: {options.find(option => option.key === selectedKey)?.label}<Icon icon={isOpen ? "mingcute:up-fill" : "mingcute:down-fill"} className="inline" />
          
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={new Set([selectedKey.toString()])}
        onSelectionChange={(keys) => onSelectionChange([...keys][0])}
      >
        {options.map((option) => (
          <DropdownItem key={option.key.toString()}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TimeFrameDropdown;
