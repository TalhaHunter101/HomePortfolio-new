'use client';
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Checkbox, Switch } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function HomeTypes() {
  const [isSelected, setIsSelected] = useState(true);



  const handleSwitchChange = (checked) => {
    setIsSelected(checked);
  };

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button
          endContent={<Icon icon="ph:caret-down-fill" />}
          radius="sm"
          size="lg"
          className="w-full justify-between max-w-xs"
          auto>
          Home Types
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
