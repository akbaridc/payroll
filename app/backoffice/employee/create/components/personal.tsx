/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";

const Personal = ({ methods }: { methods: any }) => {
    return (
      <div className="grid grid-row-2">
        <FormInputField 
          control={methods.control} 
          name="personal.email" 
          label="Email" 
          placeholder="m@example.com" 
        />
      </div>
    );
  };

export default Personal;
