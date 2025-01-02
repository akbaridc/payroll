/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

type StepWizardProps = {
  steps: { id: number; title: string; form:string; content: React.ReactNode }[];
  methods: any;
  onSubmit: (data: any) => Promise<boolean>;
};

const StepWizard: React.FC<StepWizardProps> = ({ steps, methods, onSubmit }) => {
  const { setAlertDialog } = useAlertDialog();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepDone, setStepDone] = useState<number[]>([]);
  
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  
  const nextStep = async () => {
    const currentFormKey = steps[currentStep].form;
    const isValid = await methods.trigger(currentFormKey);

    if (isValid) {
      const formData = methods.getValues(currentFormKey);
      
      const success = await onSubmit({ [currentFormKey]: formData });

      if (success && !isLastStep) {
        setCurrentStep(currentStep + 1);
        setStepDone((prevStepDone) => [...new Set([...prevStepDone, steps[currentStep].id])]);
        setTimeout(() => setStepDone((prevStepDone) => [...new Set([...prevStepDone, steps[currentStep + 1].id])]), 500);
      }
    }
  };

  const prevStep = () => {
    if (!isFirstStep) setCurrentStep(currentStep - 1);
  };

  const onJumpToStep = (step: number) => {
    console.log(stepDone);
    if(!stepDone[step] && step !== currentStep) return setAlertDialog({title: "Warning!", message: "cannot open this step, because this step has not been completed", type: "warning"});
  }

  return (
    <div className="p-6 flex flex-col md:flex-row gap-4 w-full shadow-md rounded-md border border-foreground justify-start">
      {/* Step Headers */}
      <div className="p-4 flex justify-start flex-wrap md:flex-col md:w-[20%] gap-2 items-baseline border-b md:border-r md:border-b-0 border-foreground">
        {steps.map((step, index) => (
          <div key={step.id} className={`p-2 flex gap-3 items-center cursor-pointer w-full transition rounded hover:bg-primary/70 hover:ease-out hover:duration-300 ${index === currentStep ? "text-background font-semibold bg-green-300" : "text-background"}`} onClick={() => onJumpToStep(index)}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-foreground`}>
              {index + 1}
            </div>
            <span className={`text-sm ${index === currentStep ? "text-background" : "text-foreground"}`}>{step.title}</span>
          </div>
        ))}
      </div>
      <div className="w-full">
        {/* Step Content */}
        <div className="mb-6">{steps[currentStep].content}</div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 justify-end mt-4">
          <button type="button" className={`px-4 py-2 bg-gray-500 rounded-md text-sm ${isFirstStep ? "opacity-50 cursor-not-allowed" : ""}`} onClick={prevStep} disabled={isFirstStep}>
            Back
          </button>
          <button type="submit" className={`px-4 py-2 ${isLastStep ? 'bg-green-500' : 'bg-yellow-500'}  text-background rounded-md text-sm`} onClick={nextStep} disabled={isLastStep} >
            {isLastStep ? "Finish" : "Submit & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepWizard;
