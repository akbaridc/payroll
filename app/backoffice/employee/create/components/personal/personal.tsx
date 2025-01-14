/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { FormInputFieldDate } from "@/components/form/field-input-date";
import { ComboboxForm } from "@/components/form/combobox";
import { RadioGroupForm } from "@/components/form/radio-group";

const genderOption = [
  {
    label: 'Male',value:'0'
  },
  {
    label: 'Female',value:'1'
  },
];

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

const Personal = ({ methods }: { methods: any }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInputField className="custom-field w-full" form={methods} name="personal.name" label="Name" />
        <FormInputField className="custom-field w-full" form={methods} type="number" name="personal.ktp" label="No. KTP" onInput={(e:any) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))} />
        <FormInputField className="custom-field w-full" form={methods} name="personal.phone" label="Phone" />
        <FormInputField className="custom-field w-full" form={methods} name="personal.email" label="Email" />
        <FormInputField className="custom-field w-full" form={methods} name="personal.place_birth" label="Place of Birth" />
        <FormInputFieldDate className="custom-field w-fit" form={methods} name="personal.date_birth" label="Date of Birth"/>
        <RadioGroupForm form={methods} name="personal.gender" label="Gender" radioItem={genderOption} />
        <ComboboxForm className="custom-field" form={methods} name="personal.religion" label="Religion" combobox={religionOption} />
      </div>
    );
  };

export default Personal;
