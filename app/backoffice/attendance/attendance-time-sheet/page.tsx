/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import axios from "@/lib/axios";
import {useState, useEffect, useCallback} from 'react';
import { ComboboxForm } from "@/components/form/combobox";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSWR from "swr";
import {user} from "@/app/helpers/global-helper";
import { StatusBadge } from "@/components/badge/status";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
const Levels = () => {
    const [attendance, setAttendance] = useState("");
    const [periodePayroll, setPeriodePayroll] = useState([]);
    const [columnData, setColumnData] = useState([]);

    const form = useForm({
        resolver: zodResolver(
            z.object({
                periode_payroll: z.string().nullable(),
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

    const fetchAttendanceList = useCallback(async ({ page, length, search }: any) => {
        if (!attendance) return { data: [], total: 0 };
    
        try {
            const payload = {
                size: length,
                page,
                search,
                attendance,
                who: user()?.name,
            };
    
            const response = await axios.post("/api/attendance_timesheet", payload);
            if (response.status === 200) {
                setColumnData(response.data.columnData);
                return {
                    data: response.data.data,
                    total: response.data.meta.total,
                };
            }
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    
        return { data: [], total: 0 };
    }, [attendance]);

    const columns = [
        {
            accessorKey: "karyawan_nama",
            alias: "Employee",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Employee" />
            ),
        },
        {
            accessorKey: "masuk",
            alias: "Masuk",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Masuk" />
            ),
        },
        {
            accessorKey: "dinas",
            alias: "Dinas",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Dinas" />
            ),
        },
        {
            accessorKey: "cuti",
            alias: "Cuti",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Cuti" />
            ),
        },
        {
            accessorKey: "ijin",
            alias: "Ijin",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Ijin" />
            ),
        },
        {
            accessorKey: "off",
            alias: "Off",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Off" />
            ),
        },
        {
            accessorKey: "alpha",
            alias: "Alpha",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Alpha" />
            ),
        },
        {
            accessorKey: "libur",
            alias: "Libur",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Libur" />
            ),
        },
    ];

    if(columnData){
        columnData.map((item:any) => {
            columns.push({
                accessorKey: item.hari3,
                alias: item.hari3,
                size: 150,
                header: ({ column }: { column: any }) => (
                    <DataTableColumnHeader column={column} title={item.hari3} />
                ),
                cell: ({ row }: { row: any }) => {
                    const status = row.original[item.hari3];
                    return <StatusBadge status={status} />;
                },
            })
        })
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Attendance Time Sheet</h1>
                <div className="flex gap-2 my-2">
                    <Form {...form}>
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <ComboboxForm className="custom-field" form={form} name="periode_payroll" label="Month Periode" combobox={periodePayroll} onChange={(value: string) => setAttendance(value)} />
                            </div>
                        </form>
                    </Form>
                    
                </div>
                <DataTable columns={columns} fetchData={fetchAttendanceList} lengthOption={-1} />
            </div>
        </>
    );
};

export default Levels;
