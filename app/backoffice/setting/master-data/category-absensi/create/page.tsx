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
import { useState } from "react";
import { generateNewID, setErrorRequest } from "@/app/helpers/global-helper";
import { FormInputField } from "@/components/form/field-input";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { user } from "@/app/helpers/global-helper";

export default function CategoryAbsensiCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const form = useForm({
        resolver: zodResolver(
            z.object({
                code: z.string().min(1, "Code is required"),
                name: z.string().min(1, "Name is required"),
                description: z.string().nullable(),
                presence: z.boolean().default(true),
                active: z.boolean().default(true),
            }),
        ),
        defaultValues: {code:"",name:"", description:'',presence:true,active:true},
    });

    const onSubmit =  async (values: any) => {
        setLoading(true);

        const kategori_absensi_id = await generateNewID();

        const payload = {
            kategori_absensi_id,
            kategori_absensi_kode: values.code,
            kategori_absensi_nama: values.name,
            kategori_absensi_keterangan: values.description,
            kategori_absensi_is_hadir: values.presence ? 1 : 0,
            kategori_absensi_is_aktif: values.active ? 1 : 0,
            kategori_absensi_who_create: user().name,
            kategori_absensi_tgl_create: new Date(),
        }
        await axios.post("/api/KategoriAbsensi", payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {kategori_absensi_kode: "code",kategori_absensi_nama: "name"};
                setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Category Absensi Create</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            <FormInputField className="custom-field w-full md:w-1/3" form={form} error={form.formState.errors.code?.message} name="code" label="Code"/>
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.code?.message} name="name" label="Name" />
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.code?.message} name="description" label="Description" />
                            <FormCheckboxField className="w-4 h-4" form={form} name="presence" label="Presence" />
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
