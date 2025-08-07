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
import { useState, useEffect } from "react";
import { generateNewID, setErrorRequest } from "@/app/helpers/global-helper";
import { InterfacePeriodePayrollForm } from "@/components/element/interface/global-interface";
import { FormInputField } from "@/components/form/field-input";
import { FormInputFieldDate } from "@/components/form/field-input-date";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { ComboboxForm } from "@/components/form/combobox";
import { Month } from "@/app/resources/static-option-value";
import { user } from "@/app/helpers/global-helper";
import { Loading } from "@/components/utils/loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function DivisiCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();
    const { attendance_id } = useParams();

    const { data } = useSWR(
        attendance_id ? `/api/Attendance/${attendance_id}` : null,
        fetcher
    );

    const form = useForm({
        resolver: zodResolver(
            z.object({
                attendance_kode: z.string().min(1, "Code is required"),
                attendance_tgl_awal: z.date({ required_error: "First date is required" }),
                attendance_tgl_akhir: z.date({ required_error: "End date is required" }),
                attendance_periode_thn: z.string().min(1, "Year periode is required"),
                attendance_periode_bln: z.string().min(1, "Month periode is required"),
                attendance_is_aktif: z.boolean().default(true),
            }),
        ),
        defaultValues: {attendance_kode:"",attendance_tgl_awal:"",attendance_tgl_akhir:"",attendance_periode_thn:"",attendance_periode_bln:"",attendance_is_aktif:true},
    });

     useEffect(() => {
        if (data) {
            form.setValue("attendance_kode", data.attendance_kode);
            form.setValue("attendance_tgl_awal", data.attendance_tgl_awal);
            form.setValue("attendance_tgl_akhir", data.attendance_tgl_akhir);
            form.setValue("attendance_periode_thn", data.attendance_periode_thn);
            form.setValue("attendance_periode_bln", data.attendance_periode_bln);
            form.setValue("attendance_is_aktif", data.attendance_is_aktif == 1 ? true : false);
        }
    }, [data, form]);


    const onSubmit =  async (values: InterfacePeriodePayrollForm) => {
        
        setLoading(true);

        const tgl_awal = new Date(values.attendance_tgl_awal);
        const tgl_akhir = new Date(values.attendance_tgl_akhir);

        const selisihHari = (tgl_akhir - tgl_awal) / (1000 * 60 * 60 * 24) + 1;

        const attendance_thn_awal = tgl_awal.getFullYear(); 
        const attendance_bln_awal = (tgl_awal.getMonth() + 1) < 10 ? "0"+(tgl_awal.getMonth() + 1): (tgl_awal.getMonth() + 1);
        const attendance_hari_awal = tgl_awal.getDate() < 10 ? "0"+tgl_awal.getDate() : tgl_awal.getDate();

        const attendance_thn_akhir = tgl_akhir.getFullYear(); 
        const attendance_bln_akhir = (tgl_akhir.getMonth() + 1) < 10 ? "0"+(tgl_akhir.getMonth() + 1): (tgl_akhir.getMonth() + 1);
        const attendance_hari_akhir = tgl_akhir.getDate() < 10 ? "0"+tgl_akhir.getDate() : tgl_akhir.getDate();

        const tgl_awal_new = attendance_thn_awal + "-" + attendance_bln_awal + "-" + attendance_hari_awal;
        const tgl_akhir_new = attendance_thn_akhir + "-" + attendance_bln_akhir + "-" + attendance_hari_akhir;

        if(selisihHari > 31){
            setAlertDialog({title: "Error!",message: "The periode must be less than or equal to 31 days.",type: "error"});
            setLoading(false);
            return;
        }

        const payload = {
                    attendance_id,
                    perusahaan_id:'2C3AFF51-4388-4D30-8C91-2580750960FC',
                    depo_id:'7B186AAD-1DC8-478B-AEEE-0D2C263510EA',
                    attendance_kode:values.attendance_kode,
                    attendance_thn_awal:attendance_thn_awal,
                    attendance_bln_awal:attendance_bln_awal,
                    attendance_tgl_awal:tgl_awal_new,
                    attendance_thn_akhir:attendance_thn_akhir,
                    attendance_bln_akhir:attendance_bln_akhir,
                    attendance_tgl_akhir:tgl_akhir_new,
                    attendance_who_create:user().name,
                    attendance_tgl_create:new Date(),
                    attendance_who_update:user().name,
                    attendance_tgl_update:new Date(),
                    attendance_is_aktif:values.attendance_is_aktif ? 1 : 0,
                    attendance_is_generate_pph21:0,
                    attendance_periode_bln:values.attendance_periode_bln,
                    attendance_periode_thn:values.attendance_periode_thn
        }
        
        await axios.put(`/api/Attendance/${attendance_id}`, payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Update successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {attendance_kode: "code"};
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
                <h1 className="text-2xl font-bold mb-4">Periode Payroll Create</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.attendance_kode?.message} name="attendance_kode" label="Periode Payroll Code"/>
                                <FormInputFieldDate className="custom-field w-1/2" form={form} name="attendance_tgl_awal" label="First Date" />
                                <FormInputFieldDate className="custom-field w-1/2" form={form} name="attendance_tgl_akhir" label="End Date" />
                                <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.attendance_periode_thn?.message} name="attendance_periode_thn" label="Year Periode" />
                                <ComboboxForm className="custom-field" form={form} name="attendance_periode_bln" label="Month Periode" combobox={Month()} />
                                <FormCheckboxField className="w-4 h-4" form={form} name="attendance_is_aktif" label="Active" />
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
