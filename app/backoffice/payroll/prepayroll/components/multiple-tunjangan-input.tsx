// components/multiple-holiday-input.tsx
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputField } from "@/components/form/field-input";
import { useState } from "react";
import { TunjanganDialog } from "./dialog/tunjangan-dialog";

export function MultipleTunjanganInput() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tunjangan",
    });

    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <>
            <div className="space-y-4">
                <FormInputField className="custom-field" form={control} name="filter_karyawan_nama_detail2" label="Employee" />
                <FormInputField className="custom-field" form={control} type="hidden" name="filter_karyawan_id_detail2" label="Tunjangan Id" />
                <Button type="button" size="sm" onClick={() => setIsOpenDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Allowance
                </Button>

                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4">
                        <div className="w-56">
                            ${index + 1}
                            <FormInputField className="custom-field" form={control} type="hidden" name={`tunjangan.${index}.tunjangan_id`} label="Tunjangan Id" />
                            <FormInputField className="custom-field" form={control} type="hidden" name={`tunjangan.${index}.tunjangan_kode`} label="Tunjangan Kode" />
                            <FormInputField className="custom-field" form={control} type="hidden" name={`tunjangan.${index}.trans_payroll_detail2_urut`} value={index+1} label="Id Holiday" />
                            <FormInputField className="custom-field" form={control} name={`tunjangan.${index}.code`} label="Code" disabled={true} />
                        </div>
                        <div className="w-96">
                            <FormInputField className="custom-field" form={control} name={`tunjangan.${index}.tunjangan_nama`} label="Name" disabled={true} />
                        </div>
                        <div className="w-96">
                            <FormInputField className="custom-field" form={control} name={`tunjangan.${index}.trans_payroll_detail2_multiplier`} label="Multiplier" disabled={true} />
                        </div>
                        <div className="w-96">
                            <FormInputField className="custom-field" form={control} name={`tunjangan.${index}.trans_payroll_detail2_value`} label="Multiplier" disabled={true} />
                        </div>
                        <div className="w-96">
                            <FormInputField className="custom-field" form={control} name={`tunjangan.${index}.trans_payroll_detail2_totalvalue`} label="Multiplier" disabled={true} />
                        </div>
                        <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <TunjanganDialog open={isOpenDialog} setOpen={setIsOpenDialog} fields={fields} append={append}/>
        </>
    );
}