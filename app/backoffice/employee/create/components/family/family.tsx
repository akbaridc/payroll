/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { CirclePlus,Trash } from "lucide-react"

const Family = ({ methods }: { methods: any }) => {

  return (
      <>  
          <div className="flex gap-2">
            <div className="grid grid-cols-1 gap-4 w-[90%]">
              <FormInputField className="custom-field w-full md:w-1/2" form={methods} name="family.nip" label="NIP" />
            </div>
            <div className="flex flex-col gap-2">
               <CirclePlus />
               <Trash />
            </div>
          </div>
          
      </>
    );
  };

export default Family;
