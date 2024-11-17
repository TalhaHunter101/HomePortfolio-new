import React from "react";
import { Input, Checkbox, RadioGroup, Radio, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

function Stepper2Calculator() {
  return (
    <div className="mx-24 p-8 bg-white shadow-md rounded-md space-y-8">
      {/* Purchase Details Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Purchase Details</h2>

        <Input
          label="Purchase Price *"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />
        <Input
          label="After Repair Value (ARV) *"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />
        <Input
          label="Purchase Closing Cost"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />
        <Input
          label="Estimated Repair Cost"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />
      </div>

      {/* Loan Details Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Purchase Loan Details</h2>

        <Checkbox>Cash Purchase?</Checkbox>

        <Input
          label="Down Payment of Purchase Price (%)"
          placeholder="Enter percentage or value"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Loan Interest Rate (%) *"
          placeholder="Enter interest rate"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Points Charged by Lender"
          placeholder="Enter points"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Other Charges From the Lender"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />
      </div>

      {/* Loan Options Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Loan Options</h2>

        <RadioGroup label="Loan Fees & Points">
          <Radio value="wrap">Wrap loan fees/points into the loan</Radio>
          <Radio value="pay">Pay loan fees/points out of pocket</Radio>
        </RadioGroup>

        <RadioGroup label="Interest Only?">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>

        <RadioGroup label="Include PMI?">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>

        <Input
          label="Amortized Over How Many Years?"
          placeholder="Enter years"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Refinance After How Many Months?"
          placeholder="Enter months"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Estimated Rehab Time in Months *"
          placeholder="0"
          fullWidth
          type="number"
          className="mb-4"
        />
      </div>

      {/* Refinance Loan Details Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Refinance Loan Details</h2>

        <Input
          label="Enter Loan Amount *"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Loan Interest Rate (%) *"
          placeholder="Enter interest rate"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Other Refinance Closing Costs or Lender Fees"
          placeholder="$"
          fullWidth
          type="number"
          className="mb-4"
        />

        <RadioGroup label="Loan Fees & Points *">
          <Radio value="wrap">Wrap loan fees/points into the loan</Radio>
          <Radio value="pay">Pay loan fees/points out of pocket</Radio>
        </RadioGroup>

        <RadioGroup label="Interest Only? *">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>

        <RadioGroup label="Include PMI? *">
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </RadioGroup>

        <Input
          label="Amortized Over How Many Years? *"
          placeholder="Enter years"
          fullWidth
          type="number"
          className="mb-4"
        />

        <Input
          label="Typical Cap Rate for Your Area (%)"
          placeholder="Enter cap rate"
          fullWidth
          type="number"
          className="mb-4"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button startContent={<Icon icon="gg:arrow-left" />} color="default">Previous Step</Button>
        <Button endContent={<Icon icon="gg:arrow-right" />} color="primary">Next Step</Button>
      </div>
    </div>
  );
}

export default Stepper2Calculator;
