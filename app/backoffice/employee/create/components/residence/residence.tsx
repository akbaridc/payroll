/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { ComboboxForm } from "@/components/form/combobox";
import { Provinces, Cities, Districts, Wards  } from "@/app/resources/static-option-value";
import { useState } from "react";

const Personal = ({ methods }: { methods: any }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [labelCity, setLabelCity] = useState("City");
    const [labelDistrict, setLabelDistrict] = useState("District");
    const [labelWard, setLabelWard] = useState("Ward");

    const onChangeProvinces = (value: string) => {
        setLabelCity("City");
        setLabelDistrict("District");
        setLabelWard("Ward")
        setCities(Cities(value));
        setDistricts([]);
        setWards([]);
        
    }

    const onChangeCity = (value: string) => {
        setLabelDistrict("District");
        setLabelWard("Ward")
        setDistricts(Districts(value));
        setWards([]);
        
    }

    const onChangeDistrict = (value: string) => {
        setLabelWard("Ward")
        setWards(Wards(value));
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInputField className="custom-field w-full" form={methods} name="residence.fictive_address" label="Fictive Address" />
            <FormInputField className="custom-field w-full" form={methods} name="residence.address" label="Address" />
            <FormInputField className="custom-field w-full" form={methods} type="number" name="residence.contact" label="Contact" onInput={(e: any) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))} />
            <ComboboxForm className="custom-field" form={methods} name="residence.province" label="Province" combobox={Provinces()} onChange={onChangeProvinces} />
            <ComboboxForm className="custom-field" form={methods} name="residence.city" label={labelCity} combobox={cities} onChange={onChangeCity} />
            <ComboboxForm className="custom-field" form={methods} name="residence.district" label={labelDistrict} combobox={districts} onChange={onChangeDistrict}/>
            <ComboboxForm className="custom-field" form={methods} name="residence.ward" label={labelWard} combobox={wards} />
            <FormInputField className="custom-field w-full" form={methods} name="residence.postal_code" label="Postal Code" />
        </div>
    );
};

export default Personal;
