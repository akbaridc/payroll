/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
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
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        <FormInputField className="custom-field" form={methods} name="personal.name" label="Name" />
        <FormInputField className="custom-field" form={methods} type="number" name="personal.ktp" label="No. KTP" onInput={(e:any) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))} />
        <FormInputField className="custom-field" form={methods} name="personal.phone" label="Phone" />
        <FormInputField className="custom-field" form={methods} name="personal.email" label="Email" />
        <FormInputField className="custom-field" form={methods} name="personal.place_birth" label="Place of Birth" />
        <FormInputField className="custom-field" form={methods} name="personal.date_birth" label="Date of Birth" type="date" />
        <RadioGroupForm form={methods} name="personal.gender" label="Gender" radioItem={genderOption} />
        <ComboboxForm className="custom-field" form={methods} name="personal.religion" label="Religion" combobox={religionOption} />
      </div>
    );
  };

export default Personal;
