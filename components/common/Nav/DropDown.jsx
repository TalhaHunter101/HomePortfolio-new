"use client"
import React,{useState,cloneElement} from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';



export default function DropDown({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div onMouseLeave={handleMouseLeave} className='p-4'>
      <Dropdown isOpen={isOpen} closeOnSelect placement="bottom-end">
        <DropdownTrigger>{cloneElement(children, { onMouseEnter: handleMouseEnter })}</DropdownTrigger>
 
             <DropdownMenu 
        aria-label="Dropdown Variants"
        color={"primary"} 
        variant={"bordered"}
      >
        <DropdownItem key="new">AI powered Search</DropdownItem>
        <DropdownItem key="copy">Interactive map</DropdownItem>
        <DropdownItem key="edit">Nearby Info</DropdownItem>
      </DropdownMenu>

      </Dropdown>
    </div>
  );
}