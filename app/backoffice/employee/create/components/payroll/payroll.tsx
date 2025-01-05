/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { ComboboxForm } from "@/components/form/combobox";

const Payroll = ({ methods }: { methods: any }) => {

  const religionOption = [
    {
      label: 'Islam',value:'Islam'
    },
    {
      label: 'Kristem',value:'Kristen'
    },
    {
      label: 'Budha',value:'Budha'
    },
  ];
   
  return (
      <div className="grid grid-cols-1 gap-4">
          <ComboboxForm className="custom-field w-full md:w-1/2" form={methods} name="payroll.category_employee" label="Category Employee" combobox={religionOption} />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.salary" label="Basic Salary / Hours" />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.bpjs" label="Basic BPJS" />
          <ComboboxForm className="custom-field w-full md:w-1/2" form={methods} name="payroll.bank" label="Bank" combobox={religionOption} />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.acc_number" label="Account Number" />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.acc_name" label="Account Name" />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.npwp15" label="NPWP (15 Digit)" />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.npwp16" label="NPWP (16 Digit)" />
          <ComboboxForm className="custom-field w-full md:w-1/2" form={methods} name="payroll.ptpk" label="Category PTKP" combobox={religionOption} />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.netto" label="Beginning Netto" />
          <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="payroll.pph21" label="PPH 221 Pay" />
          <ComboboxForm className="custom-field w-full md:w-1/2" form={methods} name="payroll.tax" label="Tax Method" combobox={religionOption} />
          <ComboboxForm className="custom-field w-full md:w-1/2" form={methods} name="payroll.type_tax" label="Type of Tax" combobox={religionOption} />
          <ComboboxForm className="custom-field w-full md:w-1/2" form={methods} name="payroll.obligation" label="Status Obligation" combobox={religionOption} />
      </div>
    );
  };

export default Payroll;
