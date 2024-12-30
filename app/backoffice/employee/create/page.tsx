import StepWizard from "@/components/form/step-wizard"

export default function EmployeeCreate() {

  const steps = [
    { id: 1, title: "Step 1", content: <p>Content for Step 1</p> },
    { id: 2, title: "Step 2", content: <p>Content for Step 2</p> },
    { id: 3, title: "Step 3", content: <p>Content for Step 3</p> },
    { id: 4, title: "Step 4", content: <p>Content for Step 4</p> },
    { id: 5, title: "Step 5", content: <p>Content for Step 5</p> },
    { id: 6, title: "Step 6", content: <p>Content for Step 6</p> },
    { id: 7, title: "Step 7", content: <p>Content for Step 7</p> },
  ];
    
    return (
      <div className="w-full min-h-full">
        <StepWizard steps={steps} />
      </div>
    );
  }
  