'use client';
import React, { useState } from 'react';
import HorizontalSteps from "@/components/BrrCalculator/Stepper";
import Steper3Calculator from "@/components/BrrCalculator/Steper3Calculator";
import Steper4Calculator from '@/components/BrrCalculator/Steper4Calculator';
import Steper1Calculator from '@/components/BrrCalculator/Steper1Calculator';
import Stepper2Calculator from '@/components/BrrCalculator/Stepper2Calculator';

function Calculators() {
  const [currentStep, setCurrentStep] = useState(0);

  // Components for each step
  const StepComponents = {
    0: () => (
      <Steper1Calculator/>
    ),
    1: () => (
      <Stepper2Calculator/>
    ),
    2: () => (
      <Steper3Calculator />
    ),
    3: () => (
      <Steper4Calculator />
    ),
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="container px-4">
      <div className="mt-20 flex justify-center">
        <HorizontalSteps
          currentStep={currentStep}
          onStepChange={handleStepChange}
          steps={[
            {
              title: "Property Info",
            },
            {
              title: "Purchase Info",
            },
            {
              title: "Rental Info",
            },
            {
              title: "Results",
            },
          ]}
        />
      </div>

      {/* Render current step component */}
      {StepComponents[currentStep]()}
    </div>
  );
}

export default Calculators;