/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";

const Residence = ({ methods }: { methods: any }) => {
    return (
      <div className="grid grid-row-2">
        <FormInputField 
          control={methods} 
          name="residence.name" 
          label="Name"
        />
      </div>
    );
  };

export default Residence;
