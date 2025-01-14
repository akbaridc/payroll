/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { ComboboxForm } from "@/components/form/combobox";
import { StatusEmployees } from "@/app/resources/static-option-value";

const Payroll = ({ methods }: { methods: any }) => {
   
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ComboboxForm className="custom-field" form={methods} name="payroll.category_employee" label="Category Employee" combobox={StatusEmployees()} />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.salary" label="Basic Salary / Hours" />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.bpjs" label="Basic BPJS" />
          <ComboboxForm className="custom-field" form={methods} name="payroll.bank" label="Bank" combobox={[]} />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.acc_number" label="Account Number" />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.acc_name" label="Account Name" />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.npwp15" label="NPWP (15 Digit)" />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.npwp16" label="NPWP (16 Digit)" />
          <ComboboxForm className="custom-field" form={methods} name="payroll.ptpk" label="Category PTKP" combobox={[]} />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.netto" label="Beginning Netto" />
          <FormInputField className="custom-field w-full" form={methods} name="payroll.pph21" label="PPH 221 Pay" />
          <ComboboxForm className="custom-field" form={methods} name="payroll.tax" label="Tax Method" combobox={[]} />
          <ComboboxForm className="custom-field" form={methods} name="payroll.type_tax" label="Type of Tax" combobox={[]} />
          <ComboboxForm className="custom-field" form={methods} name="payroll.obligation" label="Status Obligation" combobox={[]} />
      </div>
    );
  };

export default Payroll;
