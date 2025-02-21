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
import { InterfaceDivisionForm } from "@/components/element/interface/global-interface";
import { FormInputField } from "@/components/form/field-input";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { Loading } from "@/components/utils/loading";

export default function DivisiCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const form = useForm({
        resolver: zodResolver(
            z.object({
                code: z.string().min(1, "Code is required"),
                name: z.string().min(1, "Name is required"),
                active: z.boolean().default(true),
            }),
        ),
        defaultValues: {code:"",name:"",active:true},
    });

    const onSubmit =  async (values: InterfaceDivisionForm) => {
        setLoading(true);

        const karyawan_divisi_id = await generateNewID();

        const payload = {
            karyawan_divisi_id,
            karyawan_divisi_kode: values.code,
            karyawan_divisi_nama: values.name,
            karyawan_divisi_is_aktif: values.active ? 1 : 0,
            karyawan_divisi_is_deleted: 0,
        }
        await axios.post("/api/KaryawanDivisi", payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
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
        <>
            {loading && <Loading />}
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Divisi Create</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.code?.message} name="code" label="Divisi Code"/>
                                <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.code?.message} name="name" label="Divisi Name" />
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
        </>
    );
}
