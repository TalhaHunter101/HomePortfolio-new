
import React from "react";
import { Button } from "@nextui-org/react";

const Step4 = ({ onBasementSelect }) => (
  <div className="flex flex-col items-center">
    <p className="text-center text-lg text-default-700 mb-4">
      Does your home have a <strong>finished basement</strong>?
    </p>
    <div className="flex space-x-4">
      <Button radius="md" variant="ghost" color="secondary"  className="w-24" onClick={() => onBasementSelect("Yes")}>
        Yes
      </Button>
      <Button radius="md" variant="ghost" color="secondary" className="w-24" onClick={() => onBasementSelect("No")}>
        No
      </Button>
    </div>
  </div>
);

export default Step4;
