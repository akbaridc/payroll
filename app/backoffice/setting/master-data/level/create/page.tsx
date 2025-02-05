"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

// import Other from "./components/other/other";
// import { OtherValidation, OtherDefault } from "./components/other/schema";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import axios from "@/lib/axios";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { generateNewID, setErrorRequest } from "@/app/helpers/global-helper";
import { InterfaceLevelForm } from "@/components/element/interface/global-interface";
import { FormInputField } from "@/components/form/field-input";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { ComboboxForm } from "@/components/form/combobox";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function LevelCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();
    const [divisi, setDivisi] = useState([]);

    const form = useForm({
        resolver: zodResolver(
            z.object({
                code: z.string().nonempty("Code is required"),
                name: z.string().nonempty("Name is required"),
                divisi: z.string().nonempty("Divisi is required"),
                active: z.boolean().default(true),
            }),
        ),
        defaultValues: {code:"",name:"", divisi: "",active:true},
    });

    const { data } = useSWR('/api/KaryawanDivisiAktif',fetcher);

    useEffect(() => {
        if (data) {
            const tempDivisi = data.map((item: any) => {
                return { value: item.karyawan_divisi_id, label: `${item.karyawan_divisi_nama} - ( ${item.karyawan_divisi_kode} )` }
            });

            setDivisi(tempDivisi);
        }
    }, [data]);

    const onSubmit =  async (values: InterfaceLevelForm) => {
        setLoading(true);

        const karyawan_level_id = await generateNewID();

        const payload = {
            karyawan_level_id,
            karyawan_level_kode: values.code,
            karyawan_divisi_id: values.divisi,
            karyawan_level_nama: values.name,
            karyawan_level_is_aktif: values.active ? 1 : 0,
            karyawan_level_is_deleted: 0,
        }
        await axios.post("/api/KaryawanLevel", payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {karyawan_level_kode: "code",karyawan_level_nama: "name", karyawan_divisi_id: "divisi"};
                setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Level Create</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.code?.message} name="code" label="Level Code"/>
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.code?.message} name="name" label="Level Name" />
                            <ComboboxForm className="custom-field" form={form} error={form.formState.errors.code?.message} name="divisi" label="Divisi" combobox={divisi} />
                            <FormCheckboxField className="w-4 h-4" form={form} name="active" label="Active" />
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>
                                Back
                            </Button>
                            <ButtonAct className="w-fit" text="Submit" loading={loading} />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
