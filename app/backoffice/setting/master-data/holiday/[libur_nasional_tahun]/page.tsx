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
import { generateNewID } from "@/app/helpers/global-helper";
import { MultipleHolidayInput } from "../components/multiple-holiday-input";
import { user } from "@/app/helpers/global-helper";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function HolidayForm() {
    const router = useRouter()
    const { libur_nasional_tahun } = useParams();
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const { data } = useSWR(
        libur_nasional_tahun ? `/api/LiburNasional/${libur_nasional_tahun}` : null,
        fetcher
    );

    const formSchema = z.object({
        year: z.string().min(1, "Year is required"),
        holidays: z.array(
            z.object({
                id: z.string().nullable(),
                date: z.date({ required_error: "Date holiday is required" }),
                description: z.string().min(1, "Description is required"),
            })
        ),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: new Date().getFullYear().toString(),
            holidays: [],
        },
    });

    useEffect(() => {
        if (data) {
            form.setValue("year", data.year);
            if(data.holidays.length > 0){
                const mappedHolidays = data.holidays.map((item: any) => ({
                    id: item.libur_nasional_id,
                    date: new Date(item.libur_nasional_tanggal),
                    description: item.libur_nasional_nama
                }));
    
                form.setValue("holidays", mappedHolidays);
            }
        }
    }, [data, form]);

    const onSubmit =  async (values: any) => {
        setLoading(true);

        if(values.holidays.length == 0){
            setAlertDialog({title: "Error!",message: "Holiday is required",type: "error"});
            setLoading(false);
            return;
        }
        
        const holidays = await Promise.all(values.holidays.map(async (item: any) => {
            const libur_nasional_id = item.id ? item.id : await generateNewID();
            return {
                libur_nasional_id,
                libur_nasional_tahun: values.year,
                libur_nasional_tanggal: item.date,
                libur_nasional_nama: item.description,
                is_new: item.id ? 0 : 1
            };
        }));        

        const payload = {
            user: user().name,
            holidays
        }

        await axios.put(`/api/LiburNasional/${libur_nasional_tahun}`, payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Update successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                console.log(errors);
                // const convertFieldName = {karyawan_divisi_kode: "code",karyawan_divisi_nama: "name"};
                // setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Holiday Edit</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            <FormInputField className="custom-field w-full md:w-1/4" form={form} error={form.formState.errors.year?.message} name="year" label="Year" disabled/>
                        </div>

                        <div className="my-3">
                            <MultipleHolidayInput />
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
