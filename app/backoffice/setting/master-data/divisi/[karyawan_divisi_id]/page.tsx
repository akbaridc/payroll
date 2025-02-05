"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

// import Other from "./components/other/other";
// import { OtherValidation, OtherDefault } from "./components/other/schema";

import useSWR from "swr";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import axios from "@/lib/axios";
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { InterfaceDivisionForm } from "@/components/element/interface/global-interface";
import { FormInputField } from "@/components/form/field-input";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { setErrorRequest } from "@/app/helpers/global-helper";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function DivisiForm() {
    const router = useRouter()
    const { karyawan_divisi_id } = useParams();
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const { data } = useSWR(
        karyawan_divisi_id ? `/api/KaryawanDivisi/${karyawan_divisi_id}` : null,
        fetcher
    );

    const form = useForm({
        resolver: zodResolver(
            z.object({
                code: z.string().min(1, "Code is required"),
                name: z.string().min(1, "Name is required"),
                active: z.boolean().default(true),
            }),
        ),
        defaultValues: {code:'', name: '', active: true},
    });

    useEffect(() => {
        if (data) {
            form.setValue("code", data.karyawan_divisi_kode);
            form.setValue("name", data.karyawan_divisi_nama);
            form.setValue("active", data.karyawan_divisi_is_aktif == 1 ? true : false);
        }
    }, [data, form]);

    const onSubmit =  async (values: InterfaceDivisionForm) => {
        setLoading(true);

        const payload = {
            karyawan_divisi_kode: values.code,
            karyawan_divisi_nama: values.name,
            karyawan_divisi_is_aktif: values.active ? 1 : 0
        }
        await axios.put(`/api/KaryawanDivisi/${karyawan_divisi_id}`, payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Update successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {karyawan_divisi_kode: "code",karyawan_divisi_nama: "name"};
                setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Divisi Edit</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} name="code" label="Divisi Code" disabled={true}/>
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} name="name" label="Divisi Name" />
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
