"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

// import Other from "./components/other/other";
// import { OtherValidation, OtherDefault } from "./components/other/schema";
import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import axios from "@/lib/axios";
import { useRouter,useParams } from 'next/navigation'
import { useState, useEffect } from "react";
import React from "react";
import { FormInputField } from "@/components/form/field-input";
import { Button } from "@/components/ui/button";
import { ComboboxForm } from "@/components/form/combobox";
import { Month } from "@/app/resources/static-option-value";
import useSWR from "swr";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { PayrollDetailDialog } from "@/app/backoffice/payroll/prepayroll/components/dialog/payroll-detail-dialog-detail";
import { formatCurrency } from "@/app/helpers/global-helper";


const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function TransPayrollEdit() {
    const router = useRouter()
    const [Attendance, setAttendance] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [KaryawanId, setKaryawanId] = useState("");
    const [KaryawanNama, setKaryawanNama] = useState("");
    const [TransPayrollId, setTransPayrollId] = useState("");
    const [TransPayrollDetailId, setTransPayrollDetailId] = useState("");
    const [attendance_id, set_attendance_id] = useState('');
    const [trans_payroll_periode_bln, set_trans_payroll_periode_bln] = useState('');
    const [trans_payroll_periode_thn, set_trans_payroll_periode_thn] = useState('');
    const [trans_payroll_status, set_trans_payroll_status] = useState('');

    const { trans_payroll_id } = useParams();

    const { data } = useSWR(
        trans_payroll_id ? `/api/TransPayroll/${trans_payroll_id}` : null,
        fetcher
    );

    const form = useForm({
        resolver: zodResolver(
            z.object({
                trans_payroll_id: z.string().min(1, "Trans Payroll ID is required"),
                attendance_id: z.string().min(1, "Periode Payroll is required"),
                trans_payroll_periode_thn: z.string().min(1, "Year periode is required"),
                trans_payroll_periode_bln: z.string().min(1, "Month periode is required"),
                trans_payroll_status: z.string().min(1, "Status is required"),
            }),
        ),
        defaultValues: {trans_payroll_id:"",attendance_id:"",trans_payroll_periode_thn:"",trans_payroll_periode_bln:"", trans_payroll_status:""},
    });

     useEffect(() => {
        if (data) {
            form.setValue("trans_payroll_id", data.trans_payroll_id);
            form.setValue("attendance_id", data.attendance_id);
            form.setValue("trans_payroll_periode_thn", data.trans_payroll_periode_thn);
            form.setValue("trans_payroll_periode_bln", data.trans_payroll_periode_bln);
            form.setValue("trans_payroll_status", data.trans_payroll_status);

            set_attendance_id(data.attendance_id);
            set_trans_payroll_status(data.trans_payroll_status);
            set_trans_payroll_periode_thn(data.trans_payroll_periode_thn);
            set_trans_payroll_periode_bln(data.trans_payroll_periode_bln);

            setTimeout(() => {

                const set_attendance_temp = async () => {
                    const response_attendance = await axios.get(`/api/GetPeriodePayrollByPerusahaanEdit/${data.attendance_id}`);

                    const dataPeriodePayroll = response_attendance.data.data;
                    
                    const tempAttendance = dataPeriodePayroll.map((item: any) => {
                        return { value: item.attendance_id, label: `${item.attendance_kode}` }
                    });

                    setAttendance(tempAttendance);
                };

                set_attendance_temp();
                
            }, 100);
        }
    }, [data, form]);

    const ProsesTransPayrollDetail = async ({ page, length, search }: any) => {
        const payload_payroll_detail = {
            trans_payroll_id:trans_payroll_id,
            size:length,
            page,
            search
        };
 
        const response_payroll_detail = await axios.post("/api/GetPaginateSummaryTransPayrollDetail", payload_payroll_detail);

        if (response_payroll_detail.status === 200) {
            // Tambahkan RowNum ke setiap item dalam data
            const dataWithRowNum = response_payroll_detail.data.data.map((item: any, index: number) => ({
                ...item,
                RowNum: (page - 1) * length + index + 1, // Hitung nomor urut
            }));

            return {
                data: dataWithRowNum,
                total: response_payroll_detail.data.meta.total,
            };
        }

        return { data: [], total: 0 };
    }
    
    const columns = [
        {
            accessorKey: "RowNum",
            alias: "No",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="No" />
            ),
        },
        {
            accessorKey: "karyawan_nama",
            alias: "Employee",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Employee" />
            ),
        },
        {
            accessorKey: "divisi",
            alias: "Divisi",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Divisi" />
            ),
        },
        {
            accessorKey: "karyawan_level_nama",
            alias: "Level",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Level" />
            ),
        },
        {
            accessorKey: "penghasilanbruto",
            alias: "Nett Amount",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Nett Amount" />
            ),
            cell: ({ row }: { row: any }) => {
                const penghasilanbruto = row.original.penghasilanbruto;
                return formatCurrency(penghasilanbruto);
            },
        },
        {
            accessorKey: "trans_payroll_detail_keterangan",
            alias: "Remark",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Remark" />
            ),
        },
        {
            accessorKey: "trans_payroll_status",
            alias: "Status",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
        },
        {
            id: "actions",
            alias: "Actions",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Actions" />
            ),
            size: 70,
            cell: ({ row }: { row: any }) => {
                const trans_payroll_id = row.original.trans_payroll_id;
                const trans_payroll_detail_id = row.original.trans_payroll_detail_id;
                const karyawan_id = row.original.karyawan_id;
                const karyawan_nama = row.original.karyawan_nama;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm"
                         onClick={() => ViewModalPayrollDetail(trans_payroll_id, trans_payroll_detail_id, karyawan_id, karyawan_nama)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const ViewModalPayrollDetail = (trans_payroll_id: string, trans_payroll_detail_id: string, karyawan_id: string, karyawan_nama: string) => {
        setKaryawanId(karyawan_id);
        setKaryawanNama(karyawan_nama);
        setTransPayrollId(trans_payroll_id);
        setTransPayrollDetailId(trans_payroll_detail_id);
    
        setIsOpenDialog(true);
    }

    return (
        <>
        <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Form Pre Payroll</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="attendance_id" label="Periode Payroll" combobox={Attendance} disabled/>
                                <FormInputField className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_periode_thn" label="Year Periode" disabled/>
                                <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_periode_bln" label="Month Periode" combobox={Month()} disabled/>
                                <FormInputField type="hidden" className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_id" label="" />
                                <FormInputField className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_status" label="Status" disabled/>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                               <DataTable columns={columns} fetchData={ProsesTransPayrollDetail} lengthOption={10} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>Back</Button>
                                {/* <ButtonAct className="w-fit" text="Save" loading={loading} type="submit" /> */}
                            </div>
                        </form>
                    </Form>
                </div>
                <PayrollDetailDialog open={isOpenDialog} setOpen={setIsOpenDialog} TransPayrollId={TransPayrollId} TransPayrollDetailId={TransPayrollDetailId} KaryawanId={KaryawanId} KaryawanNama={KaryawanNama} />
            </div>
        </>
    );
}
