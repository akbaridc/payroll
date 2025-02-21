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
import { useState, useEffect, useCallback } from "react";
import {  formatCurrency } from "@/app/helpers/global-helper";
import { ComboboxForm } from "@/components/form/combobox";
import { useForm } from "react-hook-form";

export default function PrePayrollCreate() {
    const [Payroll, setPayroll] = useState([]);
    const [Divisi, setDivisi] = useState<any[]>([]);
    const [Bank, setBank] = useState<any[]>([]);
    const [trans_payroll_id, set_trans_payroll_id] = useState(null);
    const [jenisbank_kode, set_jenisbank_kode] = useState('');
    const [divisi_id, set_divisi_id] = useState('');


    useEffect(() => {

        const set_payroll = async () => {

            const response_attendance = await axios.get(`/api/GetPayrollList`);
            const dataPeriodePayroll = response_attendance.data.data;

            console.log(response_attendance);
        
            const data_temp = dataPeriodePayroll.map((item: any) => {
                return { value: item.trans_payroll_id, label: `${item.trans_payroll_periode_thn} - ${item.trans_payroll_periode_bln_name}` }
            });

            setPayroll(data_temp);
        };

        const set_divisi = async () => {

            const response = await axios.get(`/api/KaryawanDivisiAktif`);
            const dataDivisi = response.data.data;

            console.log(dataDivisi);
        
            const data_temp = [
                { value: "", label: "Select Divisi" },
                ...dataDivisi.map((item: any) => {
                    return { value: item.karyawan_divisi_id, label: item.karyawan_divisi_nama };
                }),
            ];

            setDivisi(data_temp);
        };

        const set_bank = async () => {

            const response = await axios.get(`/api/BankAktif`);
            const dataBank = response.data.data;

            console.log(dataBank);

            const data_temp = [
                { value: "", label: "Select Bank" },
                ...dataBank.map((item: any) => {
                    return { value: item.jenisbank_kode, label: `${item.jenisbank_kode} - ${item.jenisbank_nama}` }
                }),
            ];

            setBank(data_temp);
        };

        set_payroll();
        set_bank();
        set_divisi();

    }, []);

    const DataPayroll = useCallback(async ({ page, length, search }: any) => {
        const payload_payroll_detail = {
            trans_payroll_id: trans_payroll_id,
            divisi: divisi_id,
            bank: jenisbank_kode,
            size: length,
            page,
            search,
        };

        const response_payroll_detail = await axios.post("/api/GetListPayrollPaginate", payload_payroll_detail);

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

        return {
            data: [],
            total: 0,
        };
    }, [trans_payroll_id, divisi_id, jenisbank_kode]);

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
            accessorKey: "karyawan_nip",
            alias: "NIP",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="NIP" />
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
            accessorKey: "karyawan_divisi_nama",
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
            accessorKey: "jenisbank_nama",
            alias: "Bank",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Bank" />
            ),
        },
        {
            accessorKey: "karyawan_no_rek",
            alias: "No Rekening",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="No Rekening" />
            ),
        },
        {
            accessorKey: "karyawan_nama_rek",
            alias: "Rekening Name",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Rekening Name" />
            ),
        },
        {
            accessorKey: "trans_payroll_detail2_totalvalue",
            alias: "Nett Amoun",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Nett Amount" />
            ),
            cell: ({ row }: { row: any }) => {
                const trans_payroll_detail2_totalvalue = row.original.trans_payroll_detail2_totalvalue;
                return formatCurrency(trans_payroll_detail2_totalvalue);
            },
        },
    ];

    const form = useForm({
        resolver: zodResolver(
            z.object({
                trans_payroll_id: z.string().min(1, "Trans Payroll ID is required"),
                divisi: z.string().min(1, "Divisi is required"),
                bank: z.string().min(1, "Baank periode is required"),
            }),
        ),
        defaultValues: {trans_payroll_id:"",divisi:"",bank:""},
    });

    const getPayroll = useCallback((tipe:any, value:any) => {

        if (tipe == 'trans_payroll_id') {
            set_trans_payroll_id(value);
        }else if (tipe == 'divisi') {
            set_divisi_id(value);
        }else if (tipe == 'bank') {
            set_jenisbank_kode(value);
        }
        
        DataPayroll({page:1, length:50, search:''});
    }, [DataPayroll]);

    return (
    <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Payroll</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...form}>
                    {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_id" label="Periode Payroll" combobox={Payroll} onChange={() => {
                                const selectedValue = form.getValues('trans_payroll_id');
                                getPayroll('trans_payroll_id', selectedValue);
                            }}/>
                            <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="divisi" label="Divisi" combobox={Divisi} onChange={() => {
                                const selectedValue = form.getValues('divisi');
                                getPayroll('divisi', selectedValue);
                            }}/>
                            <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="bank" label="Bank" combobox={Bank} onChange={() => {
                                const selectedValue = form.getValues('bank');
                                getPayroll('bank', selectedValue);
                            }}/>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <DataTable columns={columns} fetchData={DataPayroll} lengthOption={20} />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
