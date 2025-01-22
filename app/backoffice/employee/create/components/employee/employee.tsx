/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { FormInputFieldDate } from "@/components/form/field-input-date";
import { ComboboxForm } from "@/components/form/combobox";
import { Divisis, Levels } from "@/app/resources/static-option-value";

const Employee = ({ methods }: { methods: any }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInputField className="custom-field w-full" form={methods} name="employee.nip" label="NIP" />
            <ComboboxForm className="custom-field" form={methods} name="employee.company" label="Company" combobox={[]} />
            <ComboboxForm className="custom-field" form={methods} name="employee.divisi" label="Divisi" combobox={Divisis()} />
            <ComboboxForm className="custom-field" form={methods} name="employee.level" label="Level" combobox={Levels()} />
            <FormInputField className="custom-field w-full" form={methods} name="employee.frase" label="Frase" />
            <ComboboxForm className="custom-field" form={methods} name="employee.direct_supervisor" label="Direct Supervisor" combobox={[]} />
            <FormCheckboxField className="w-4 h-4" form={methods} id="status" name="employee.status" label="Status Active" />
            <FormInputFieldDate className="custom-field w-1/2" form={methods} name="employee.join_date" label="Join Date" />
            <FormCheckboxField className="w-4 h-4" form={methods} id="resign" name="employee.resign" label="Resign" />
        </div>
    );
};

export default Employee;
