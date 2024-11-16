import React from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Icon } from '@iconify/react';

function Steper1Calculator() {
  return (
    <div className="mx-24 p-8 bg-white shadow-md rounded-md  space-y-6">
      {/* Report Title */}
      <div>
        <Input 
          label="Report Title"
          required
          fullWidth
          placeholder="What do you want to name this report?"
          className="mb-4"
        />
      </div>

      {/* Property Address */}
      <div>
        <Input 
          label="Property Address"
          fullWidth
          placeholder="Enter property address"
          className="mb-4"
        />
      </div>

      {/* Property City, State, Zip */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input 
          label="Property City"
          fullWidth
          placeholder="City"
          className="flex-1"
        />
        <Input 
          label="Property State"
          fullWidth
          placeholder="State"
          className="flex-1"
        />
        <Input 
          label="Property Zip"
          fullWidth
          placeholder="Zip Code"
          className="flex-1"
        />
      </div>

      {/* Annual Property Taxes and MLS Number */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input 
          label="Annual Property Taxes"
          fullWidth
          placeholder="$"
          type="number"
          className="flex-1"
        />
        <Input 
          label="MLS Number"
          fullWidth
          placeholder="MLS Number"
          className="flex-1"
        />
      </div>

      {/* Property Photos */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Property Photos</label>
        <Button variant='ghost' endContent={<Icon icon="gg:add" />} className="bg-gray-200 text-gray-700">Add a photo</Button>
      </div>

      {/* Property Sales Description */}
      <div className="mb-4">
        <Textarea 
          label="Property Sales Description"
          disableAutosize
          fullWidth
          placeholder="Enter a description"
        />
      </div>

      {/* Other Property Features */}
      <div className="mb-4">
        <a href="#" className="text-blue-500 underline text-sm">
          Other property features
        </a>
      </div>

      {/* Next Step Button */}
      <div className="text-right">
        <Button endContent={<Icon icon="gg:arrow-right" />} className="bg-blue-600 text-white">Next Step</Button>
      </div>
    </div>
  );
}

export default Steper1Calculator;
