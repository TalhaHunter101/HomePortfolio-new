
import React from "react";
import { Input, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Step1 = ({ onContinue }) => (
    <div className="flex flex-col justify-center items-center">
        <p className="text-center text-xl text-default-700 mb-4">
            Get started with a free estimate - simply enter your <strong>home address</strong> below:
        </p>
        <div className="flex justify-center  w-full space-x-4">
            <Input
                color="secondary"
                label="Home Address"

                className="max-w-lg"
                placeholder="123 Example Street..."
                contentLeft={<Icon icon="bi:house-fill" />}
            />
            <Input
                color="secondary"
                label="Unit # (optional)"

                placeholder="1203"
                contentLeft={<Icon icon="clarity:building-line" />}
                className="max-w-xs"
            />
        </div>
        <div className="flex justify-end mt-8 pr-14 w-full">
            <Button size="lg" endContent={<Icon icon="bi:arrow-right" />} radius="full" color="secondary" onClick={onContinue}>
                Continue
            </Button>
        </div>
    </div>
);

export default Step1;
