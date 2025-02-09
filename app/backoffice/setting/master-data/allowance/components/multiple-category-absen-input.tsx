// components/multiple-holiday-input.tsx
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputField } from "@/components/form/field-input";
import { useState } from "react";
import { CategoryAbsenDialog } from "./dialog/category-absen-dialog";

export function MultipleCategoryAbsenInput() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "category_absen",
    });

    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <>
            <div className="space-y-4">
                <Button type="button" size="sm" onClick={() => setIsOpenDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Kategori Absen
                </Button>

                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4">
                        <div className="w-56">
                            <FormInputField className="custom-field" form={control} type="hidden" name={`category_absen.${index}.absensi_id`} label="Id Holiday" />
                            <FormInputField className="custom-field" form={control} name={`category_absen.${index}.code`} label="Code" disabled={true} />
                        </div>
                        <div className="w-96">
                            <FormInputField className="custom-field" form={control} name={`category_absen.${index}.name`} label="Name" disabled={true} />
                        </div>
                        <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <CategoryAbsenDialog open={isOpenDialog} setOpen={setIsOpenDialog} fields={fields} append={append}/>
        </>
    );
}