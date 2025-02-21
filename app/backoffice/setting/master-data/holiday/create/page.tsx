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
import { generateNewID } from "@/app/helpers/global-helper";
// import { InterfaceDivisionForm } from "@/components/element/interface/global-interface";
import { FormInputField } from "@/components/form/field-input";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { MultipleHolidayInput } from "../components/multiple-holiday-input";
import { user } from "@/app/helpers/global-helper";
import { Loading } from "@/components/utils/loading";

export default function HolidayCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

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

    const onSubmit =  async (values: any) => {
        setLoading(true);

        if(values.holidays.length == 0){
            setAlertDialog({title: "Error!",message: "Holiday is required",type: "error"});
            setLoading(false);
            return;
        }
        
        const holidays = await Promise.all(values.holidays.map(async (item: any) => {
            const libur_nasional_id = await generateNewID();
            return {
                libur_nasional_id,
                libur_nasional_tahun: values.year,
                libur_nasional_tanggal: item.date,
                libur_nasional_nama: item.description
            };
        }));        

        const payload = {
            user: user().name,
            holidays
        }

        await axios.post("/api/LiburNasional", payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
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
        <>
            {loading && <Loading />}
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Holiday Create</h1>
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
        </>
    );
}
