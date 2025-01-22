/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FormInputField } from "@/components/form/field-input";
import { FormInputFieldDate } from "@/components/form/field-input-date";
import { RadioGroupForm } from "@/components/form/radio-group";
import { ComboboxForm } from "@/components/form/combobox";
import { CirclePlus, Trash } from "lucide-react";
import {
    Genders,
    Religions,
    Relationships,
} from "@/app/resources/static-option-value";
import { FamilyDefaultInterface } from "./schema";

const Family = ({ methods }: { methods: any }) => {
    const [families, setFamilies] = useState([...methods.getValues("family")]);

    const addFamily = () => {
        setFamilies([...families, FamilyDefaultInterface()]);
        methods.setValue("family", [...families, FamilyDefaultInterface()]);
    };

    const removeFamily = (index: number) => {
        // Hapus item berdasarkan index
        const newFamilies = families.filter((_, i) => i !== index);

        // Perbarui state families
        setFamilies(newFamilies);

        // Sinkronkan state dengan react-hook-form
        methods.setValue("family", newFamilies); // Perbarui value form dengan state terbaru
    };

    return (
        <div>
            {families.map((family, index) => (
                <div key={index} className="flex gap-2 border-b-2 border-foreground pb-4 mb-3" >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%]">
                        <FormInputField className="custom-field w-full" form={methods} name={`family[${index}].name`} label="Name" />
                        <RadioGroupForm form={methods} name={`family[${index}].gender`} label="Gender" radioItem={Genders()} />
                        <FormInputFieldDate className="custom-field w-1/2" form={methods} name="personal.date_birth" label="Date of Birth" />
                        <ComboboxForm className="custom-field" form={methods} name={`family[${index}].religion`} label="Religion" combobox={Religions()} />
                        <ComboboxForm className="custom-field" form={methods} name={`family[${index}].relationship`} label="Relationship" combobox={Relationships()} />
                    </div>
                    <div className="flex justify-center mx-auto gap-3">
                        <CirclePlus className="cursor-pointer hover:text-primary" onClick={addFamily} />
                        <Trash className="cursor-pointer hover:text-red-500" onClick={() => removeFamily(index)} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Family;
