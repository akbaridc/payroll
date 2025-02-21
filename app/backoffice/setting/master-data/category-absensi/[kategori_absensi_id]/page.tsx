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
import { FormInputField } from "@/components/form/field-input";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { setErrorRequest } from "@/app/helpers/global-helper";
import { user } from "@/app/helpers/global-helper";
import { Loading } from "@/components/utils/loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function CategoryAbsensiForm() {
    const router = useRouter()
    const { kategori_absensi_id } = useParams();
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const { data } = useSWR(
        kategori_absensi_id ? `/api/KategoriAbsensi/${kategori_absensi_id}` : null,
        fetcher
    );

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

    useEffect(() => {
        if (data) {
            form.setValue("code", data.kategori_absensi_kode);
            form.setValue("name", data.kategori_absensi_nama);
            form.setValue("description", data.kategori_absensi_keterangan || "");
            form.setValue("presence", data.kategori_absensi_is_hadir == 1 ? true : false);
            form.setValue("active", data.kategori_absensi_is_aktif == 1 ? true : false);
        }
    }, [data, form]);

    const onSubmit =  async (values: any) => {
        setLoading(true);

        const payload = {
            kategori_absensi_id,
            kategori_absensi_kode: values.code,
            kategori_absensi_nama: values.name,
            kategori_absensi_keterangan: values.description,
            kategori_absensi_is_hadir: values.presence ? 1 : 0,
            kategori_absensi_is_aktif: values.active ? 1 : 0,
            kategori_absensi_who_update: user().name,
            kategori_absensi_tgl_update: new Date(),
        }
        await axios.put(`/api/KategoriAbsensi/${kategori_absensi_id}`, payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Update successfully",type: "success"});
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
        <>
            {loading && <Loading />}
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Category Absensi Edit</h1>
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
        </>
    );
}
