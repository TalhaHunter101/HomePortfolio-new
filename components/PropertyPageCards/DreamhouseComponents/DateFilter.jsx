// DropdownButton.js
import React, { useState, useMemo } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export const DropdownButton = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['last_7_days']));
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close status

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  return (
    <Dropdown onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Button
        
          size="sm"
          variant="bordered"
          className="capitalize "
          endContent={
            <Icon icon={isOpen ? "ph:caret-up-fill" : "ph:caret-down-fill"} />
          }
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Date range selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="last_7_days">Last 7 days</DropdownItem>
        <DropdownItem key="last_12_weeks">Last 12 weeks</DropdownItem>
        <DropdownItem key="last_12_months">Last 12 months</DropdownItem>
        <DropdownItem key="last_12_quarters">Last 12 quarters</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
