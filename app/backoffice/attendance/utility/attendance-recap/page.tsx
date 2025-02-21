/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ComboboxForm } from "@/components/form/combobox";

import axios from "@/lib/axios";
import {useState, useEffect} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import useSWR from "swr";
import {user} from "@/app/helpers/global-helper";
import { ButtonAct } from "@/components/form/button";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/utils/loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
const AttendanceRecap = () => {
    const { setAlertDialog } = useAlertDialog();
    const [loading, setLoading] = useState(false);
    const [periodePayroll, setPeriodePayroll] = useState([]);

    const form = useForm({
        resolver: zodResolver(
            z.object({
                periode_payroll: z.string().nonempty("Periode Payroll is required"),
            }),
        ),
        defaultValues: {periode_payroll:""},
    });

    const { data } = useSWR('/api/attendace_active',fetcher);

    useEffect(() => {
        if (data) {
            const tempPeriodePayroll = data.map((item: any) => {
                return { value: item.attendance_id, label: `${item.attendance_kode} ( ${new Date(item.attendance_tgl_awal).toLocaleDateString("id-ID")} - ${new Date(item.attendance_tgl_akhir).toLocaleDateString("id-ID")} )` }
            });

            setPeriodePayroll(tempPeriodePayroll);
        }
    }, [data]);

    const onSubmit =  async (values: any) => {
        setLoading(true);

        const payload = {
            attendance: values.periode_payroll,
            who: user()?.name
        }
        await axios.post("/api/attendace-recap", payload)
            .then((response) => {
                if(response.status == 200){
                    console.log(response);
                    setAlertDialog({title: "Success!",message: response.data.message,type: "success"});
                    setLoading(false);
                    form.setValue("periode_payroll", "");
                }
            })
            .catch(error => {
                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <>  
            {loading && <Loading />}
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Attendance Recap</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex items-end gap-4">
                                <div className="w-1/2 md:w-1/3">
                                    <ComboboxForm className="custom-field w-full" form={form} name="periode_payroll" title="Periode Payroll" combobox={periodePayroll} />
                                </div>
                                <ButtonAct className="w-fit" text="Recap" loading={loading} />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default AttendanceRecap;
