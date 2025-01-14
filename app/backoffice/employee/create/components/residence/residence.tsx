/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { ComboboxForm } from "@/components/form/combobox";
import { Provinces } from "@/app/resources/static-option-value";

const Personal = ({ methods }: { methods: any }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInputField className="custom-field w-full" form={methods} name="residence.fictive_address" label="Fictive Address" />
        <FormInputField className="custom-field w-full" form={methods} name="residence.address" label="Address" />
        <FormInputField className="custom-field w-full" form={methods} type="number" name="residence.contact" label="Contact" onInput={(e:any) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))} />
        <ComboboxForm className="custom-field" form={methods} name="residence.province" label="Province" combobox={Provinces()} />
        <ComboboxForm className="custom-field" form={methods} name="residence.city" label="City" combobox={[]} />
        <ComboboxForm className="custom-field" form={methods} name="residence.district" label="District" combobox={[]} />
        <ComboboxForm className="custom-field" form={methods} name="residence.ward" label="Ward" combobox={[]} />
      </div>
    );
  };

export default Personal;
