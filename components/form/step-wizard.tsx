"use client";

import { useState } from "react";

type StepWizardProps = {
  steps: { id: number; title: string; content: React.ReactNode }[];
};

const StepWizard: React.FC<StepWizardProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const nextStep = () => {
    if (!isLastStep) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (!isFirstStep) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-6 w-full mx-auto bg-foreground shadow-md rounded-md">
      {/* Step Headers */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 text-center ${
              index <= currentStep ? "text-background font-semibold" : "text-background"
            }`}
          >
            <div
              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-foreground text-background" : "bg-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6">{steps[currentStep].content}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button className={`px-4 py-2 bg-background rounded-md text-sm ${isFirstStep ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={prevStep}
          disabled={isFirstStep}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-foreground text-background rounded-md text-sm"
          onClick={nextStep}
          disabled={isLastStep}
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepWizard;
