"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import StepWizard from "@/components/form/step-wizard"
import Personal from "./components/personal/personal";
import { PersonalValidation, PersonalDefault } from "./components/personal/schema";

import Employee from "./components/employee/employee";
import { EmployeeValidation, EmployeeDefault } from "./components/employee/schema";

import Payroll from "./components/payroll/payroll";
import { PayrollValidation, PayrollDefault } from "./components/payroll/schema";

import Family from "./components/family/family";
import { FamilyValidation, FamilyDefault } from "./components/family/schema";

import Residence from "./components/residence/residence";
import { ResidenceValidation, ResidenceDefault } from "./components/residence/schema";

import Other from "./components/other/other";
import { OtherValidation, OtherDefault } from "./components/other/schema";

import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

export default function EmployeeCreate() {

  const { setAlertDialog } = useAlertDialog();

  const schema = z.object({
    personal: z.object(PersonalValidation()),
    employee: z.object(EmployeeValidation()),
    payroll: z.object(PayrollValidation()),
    family: z.object(FamilyValidation()),
    residence: z.object(ResidenceValidation()),
    other: z.object(OtherValidation()),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      personal: PersonalDefault(),
      employee: EmployeeDefault(),
      payroll: PayrollDefault(),
      family: FamilyDefault(),
      residence: ResidenceDefault(),
      other: OtherDefault(),
    },
  });

  const steps = [
    { id: 1, title: "Personal", form: "personal", content: <Personal methods={methods} /> },
    { id: 2, title: "Employee", form: "employee", content: <Employee methods={methods} /> },
    { id: 3, title: "Payroll", form: "payroll", content: <Payroll methods={methods} /> },
    { id: 4, title: "Family", form: "family", content: <Family methods={methods} /> },
    { id: 5, title: "Employee Residence", form: "residence", content: <Residence methods={methods} /> },
    { id: 6, title: "Other Data", form: "other", content: <Other methods={methods} /> },
  ];

  async function onSubmit(value: any): Promise<boolean> {
    try {
      const formSchema = Object.keys(value)[0];

      if(formSchema == 'personal'){}
      if(formSchema == 'employee'){}
      if(formSchema == 'payroll'){}
      if(formSchema == 'family'){}
      if(formSchema == 'residence'){}
      if(formSchema == 'other'){}

      setAlertDialog({title: "Success!", message: "Your action was completed successfully.", type: "success"});

      return true;
    } catch (error) {
      console.log(error);
      setAlertDialog({title: "Error!", message: "Something went wrong.", type: "error"});
      return false;
    }
  }

  return (
    <div className="w-full min-h-full">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <StepWizard steps={steps} methods={methods} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  );
}
  