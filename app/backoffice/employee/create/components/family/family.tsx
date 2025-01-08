/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";

const Family = ({ methods }: { methods: any }) => {
    return (
      <div className="grid grid-row-2">
        <FormInputField control={methods} name="family.name" label="Name" />
      </div>
    );
  };

export default Family;
