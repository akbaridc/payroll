/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { Loading } from "@/components/utils/loading";

type StepWizardProps = {
    steps: {
        id: number;
        title: string;
        form: string;
        content: React.ReactNode;
    }[];
    methods: any;
    onSubmit: (data: any) => Promise<boolean>;
};

const StepWizard: React.FC<StepWizardProps> = ({steps,methods,onSubmit}) => {
    const router = useRouter()
    const { setAlertDialog } = useAlertDialog();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [stepDone, setStepDone] = useState<number[]>([]);

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const nextStep = async () => {
        setLoading(true);
        const currentFormKey = steps[currentStep].form;
        const isValid = await methods.trigger(currentFormKey);

        if (isValid) {
            const formData = methods.getValues(currentFormKey);

            const success = await onSubmit({ [currentFormKey]: formData });

            if (success && !isLastStep) {
                setCurrentStep(currentStep + 1);
                setStepDone((prevStepDone) => [...new Set([...prevStepDone, steps[currentStep].id])]);
                setTimeout(() => setStepDone((prevStepDone) => [...new Set([...prevStepDone,steps[currentStep + 1].id])]),500);
                setLoading(false);
            }

            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const prevStep = () => {
        if (!isFirstStep) setCurrentStep(currentStep - 1);
    };

    const onJumpToStep = (step: number) => {
        if (!stepDone[step] && step !== currentStep)
            return setAlertDialog({
                title: "Warning!",
                message:
                    "cannot open this step, because this step has not been completed",
                type: "warning",
            });

        setCurrentStep(step);
    };

    return (
        <>
            {loading && <Loading />}
            <div className="p-3 flex flex-col md:flex-row gap-4 w-full justify-start">
                {/* Step Headers */}
                <div className="p-4 flex justify-start md:flex-col md:w-[25%] gap-2 items-baseline border-b md:border-r md:border-b-0 border-foreground">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`p-2 flex gap-3 justify-center md:justify-start items-center cursor-pointer w-full transition rounded hover:border-b hover:border-b-foreground hover:ease-out hover:duration-300 text-foreground`}
                            onClick={() => onJumpToStep(index)}
                            title={step.title}
                        >
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${index === currentStep ? "bg-primary text-white" : "bg-foreground text-background"}`}>
                                {index + 1}
                            </div>
                            <span className="hidden md:block">{step.title}</span>
                        </div>
                    ))}
                </div>
                <div className="w-full">
                    {/* Step Content */}
                    <div className="mb-6">{steps[currentStep].content}</div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 justify-start mt-7">
                        <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>
                            Back
                        </Button>

                        <button
                            type="button"
                            className={`px-4 py-2 bg-slate-800 text-white rounded-md text-sm ${isFirstStep ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={prevStep}
                            disabled={isFirstStep}
                        >
                            Previous
                        </button>

                        <ButtonAct
                            text={isLastStep ? "Save Employee" : "Submit & Continue"}
                            loading={loading}
                            className={`px-4 py-2 w-fit ${isLastStep ? "bg-green-500 hover:bg-green-500" : "bg-yellow-500 hover:bg-yellow-600"}  text-background rounded-md text-sm`}
                            onClick={nextStep}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StepWizard;
