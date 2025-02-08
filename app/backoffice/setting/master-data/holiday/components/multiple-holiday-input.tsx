// components/multiple-holiday-input.tsx
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputField } from "@/components/form/field-input";
import { FormInputFieldDate } from "@/components/form/field-input-date";


export function MultipleHolidayInput() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "holidays",
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-4">
                    <div className="w-56">
                        <FormInputField className="custom-field" 
                            form={control} 
                            type="hidden"
                            name={`holidays.${index}.id`} 
                            label="Id Holiday" 
                        />
                        <FormInputFieldDate className="custom-field" 
                            form={control} 
                            name={`holidays.${index}.date`} 
                            label="Date Holiday" 
                        />
                    </div>
                    <div className="w-96">
                        <FormInputField className="custom-field" 
                            form={control} 
                            name={`holidays.${index}.description`} 
                            label="Description"
                        />
                    </div>
                    <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button type="button" size="sm" onClick={() => append({ date: "", description: "" })}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Libur
            </Button>
        </div>
    );
}