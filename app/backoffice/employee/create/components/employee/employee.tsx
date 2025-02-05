/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { FormInputFieldDate } from "@/components/form/field-input-date";
import { ComboboxForm } from "@/components/form/combobox";
import useSWR from "swr";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
const Employee = ({ methods }: { methods: any }) => {
    const [divisi, setDivisi] = useState([]);
    const [level, setLevel] = useState([]);

    const { data: Division } = useSWR('/api/KaryawanDivisiAktif',fetcher);

    useEffect(() => {
        if (Division) {
            const tempDivisi = Division.map((item: any) => {
                return { value: item.karyawan_divisi_id, label: `${item.karyawan_divisi_nama} - ( ${item.karyawan_divisi_kode} )` }
            });

            setDivisi(tempDivisi);
        }
    }, [Division]);

    const onChangeDivisi = async (value: string) => {
        await axios.get(`/api/getKaryawanLevelDivisi/${value}`).then((response) => {

            if(!response.data.data) return setLevel([]);

            const data = response.data.data.map((item: any) => {
                return { value: item.karyawan_level_id, label: `${item.karyawan_level_nama} - ( ${item.karyawan_level_kode} )` }
            });

            setLevel(data);

        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInputField className="custom-field w-full" form={methods} name="employee.nip" label="NIP" />
            <ComboboxForm className="custom-field" form={methods} name="employee.company" label="Company" combobox={[]} />
            <ComboboxForm className="custom-field" form={methods} name="employee.divisi" label="Divisi" combobox={divisi} onChange={onChangeDivisi} />
            <ComboboxForm className="custom-field" form={methods} name="employee.level" label="Level" combobox={level} />
            <FormInputField className="custom-field w-full" form={methods} name="employee.frase" label="Frase" />
            <ComboboxForm className="custom-field" form={methods} name="employee.direct_supervisor" label="Direct Supervisor" combobox={[]} />
            <FormCheckboxField className="w-4 h-4" form={methods} id="status" name="employee.status" label="Status Active" />
            <FormInputFieldDate className="custom-field w-1/2" form={methods} name="employee.join_date" label="Join Date" />
            <FormCheckboxField className="w-4 h-4" form={methods} id="resign" name="employee.resign" label="Resign" />
        </div>
    );
};

export default Employee;
