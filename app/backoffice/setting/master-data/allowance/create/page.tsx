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
import { ComboboxForm } from "@/components/form/combobox";
import {TypeAllowance, PaymentBasis, PaidMode} from "@/app/resources/static-option-value";
import {MultipleCategoryAbsenInput} from "../components/multiple-category-absen-input";
import { Loading } from "@/components/utils/loading";

export default function AllowanceCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const formSchema = z.object({
        code: z.string().nonempty("Code is required"),
        name: z.string().nonempty("Name is required"),
        jenis: z.string().nonempty("Jenis is required"),
        dasar_bayar: z.string().nonempty("Dasar Bayar is required"),
        dibayar_oleh: z.string().nonempty("Dibayar Oleh is required"),
        dibayar_kepada: z.string().nonempty("Dibayar Kepada is required"),
        keterangan: z.string().nullable(),
        active: z.boolean().default(true),
        print_payslip: z.boolean().default(false),
        allowance_special: z.boolean().default(false),
        category_absen: z.array(
            z.object({
                absensi_id: z.string().nullable(),
                code: z.string().nullable(),
                name: z.string().nullable(),
            })
        ),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code:"",name:"",jenis:"", dasar_bayar: "", dibayar_oleh: "", dibayar_kepada: "", keterangan: "",active:true, print_payslip: false, allowance_special: false,
            category_absen: []
        },
    });

    const onSubmit =  async (values: any) => {
        setLoading(true);

        const tunjangan_id = await generateNewID();

        const payload = {
            tunjangan_id,
            tunjangan_kode: values.code,
            tunjangan_nama: values.name,
            tunjangan_jenistunjangan: values.jenis,
            tunjangan_dasarbayar: values.dasar_bayar,
            tunjangan_dibayar_oleh: values.dibayar_oleh,
            tunjangan_dibayar_kepada: values.dibayar_kepada,
            tunjangan_keterangan: values.keterangan,
            tunjangan_is_aktif: values.active ? 1 : 0,
            tunjangan_print_slip: values.print_payslip ? 1 : 0,
            tunjangan_khusus: values.allowance_special ? 1 : 0,
        }

        await axios.post("/api/Tunjangan", payload)
            .then(async (response) => {
                if(response.status == 200){

                    if(values.category_absen.length > 0){
                        try {
                            const AllowanceDetail = values.category_absen.map(async (item: any) => {
                                const tunjangan_detail_id = await generateNewID();
                                return axios.post("/api/TunjanganDetail", { tunjangan_detail_id, tunjangan_id, kategori_absensi_id: item.absensi_id });
                            });
                            await Promise.all(AllowanceDetail);
                        } catch (error:any) {
                            console.error(error)
                            setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
                            return;
                        }
                    }

                    setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {tunjangan_kode: "code",tunjangan_nama: "name", tunjangan_jenistunjangan: "jenis", tunjangan_dasarbayar: "dasar_bayar", tunjangan_dibayar_oleh: "dibayar_oleh", tunjangan_dibayar_kepada: "dibayar_kepada"};
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
                <h1 className="text-2xl font-bold mb-4">Allowance Create</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <FormInputField className="custom-field w-full" form={form} error={form.formState.errors.code?.message} name="code" label="Code"/>
                                <FormInputField className="custom-field w-full" form={form} error={form.formState.errors.code?.message} name="name" label="Name" />
                                <ComboboxForm className="custom-field" form={form} name="jenis" label="Jenis" combobox={TypeAllowance()} />
                                <ComboboxForm className="custom-field" form={form} name="dasar_bayar" label="Dasar Bayar" combobox={PaymentBasis()} />
                                <ComboboxForm className="custom-field" form={form} name="dibayar_oleh" label="Dibayar Oleh" combobox={PaidMode()} />
                                <ComboboxForm className="custom-field" form={form} name="dibayar_kepada" label="Dibayar Kepada" combobox={PaidMode()} />
                                <FormInputField className="custom-field w-full" form={form} error={form.formState.errors.code?.message} name="keterangan" label="Keterangan" />
                            </div>
                            <div className="flex aligns-center items-center gap-3">
                                <FormCheckboxField className="w-4 h-4" form={form} name="active" label="Active" />
                                <FormCheckboxField className="w-4 h-4" form={form} name="print_payslip" label="Tunjangan dicetak di payslip" />
                                <FormCheckboxField className="w-4 h-4" form={form} name="allowance_special" label="Tunjangan khusus" />
                            </div>
                            <hr />
                            <div className="my-3">
                                <MultipleCategoryAbsenInput />
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
