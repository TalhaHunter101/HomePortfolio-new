
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";

const squareFootageOptions = [
  { label: "500-999", value: "500-999" },
  { label: "750-999", value: "750-999" },
  { label: "1000-1249", value: "1000-1249" },
  { label: "1250-1499", value: "1250-1499" },
  { label: "1500-1749", value: "1500-1749" },
  { label: "1750-2499", value: "1750-2499" },
];

const Step5 = ({ onSquareFootageSelect }) => {
  const [selectedValue, setSelectedValue] = useState("500"); 

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    onSquareFootageSelect(value);
  };

  return (
    <div className="flex flex-col z-50 pb-24  items-center">
      <p className="text-center text-lg text-default-700  mb-4">
        Select the <strong>square footage</strong>
      </p>
      <Autocomplete
      
     color="secondary"
        
        defaultItems={squareFootageOptions}
        label="Square Footage"
        placeholder="Select square footage"
        size="md"
        className="max-w-xs"
        onSelectionChange={handleSelectionChange}
        value={selectedValue}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
};

export default Step5;
