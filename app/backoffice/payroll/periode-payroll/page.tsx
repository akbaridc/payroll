/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import DeleteDialog from "@/components/element/dialog/delete-dialog";
import {useState} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { StatusBadge } from "@/components/badge/status";
import { Pencil, Plus, Trash, ClipboardPaste, CirclePlus, Search } from "lucide-react";

const Attendence = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [isDeleted, setIsDeleted] = useState("");

    const fetchAttendence = async ({ page, length, search }: any) => {
        const payload = {
          size:length,
          page,
          search
        };
    
        const response = await axios.post("/api/GetPaginateAttendance", payload);
        if (response.status === 200) {
          return {
            data: response.data.data,
            total: response.data.meta.total,
          };
        }
    
        return { data: [], total: 0 };
    };

    const columns = [
        {
            accessorKey: "attendance_kode",
            alias: "Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Code" />
            ),
        },
        {
            accessorKey: "karyawan_divisi_nama",
            alias: "Division",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Division" />
            ),
        },
        {
            accessorKey: "attendance_thn_awal",
            alias: "First Year",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="First Year" />
            ),
        },
        {
            accessorKey: "attendance_bln_awal",
            alias: "First Month",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="First Month" />
            ),
        },
        {
            accessorKey: "attendance_tgl_awal",
            alias: "First Date",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="First Date" />
            ),
        },
        
        {
            accessorKey: "attendance_thn_akhir",
            alias: "End Year",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="End Year" />
            ),
        },
        {
            accessorKey: "attendance_bln_akhir",
            alias: "End Month",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="End Month" />
            ),
        },
        {
            accessorKey: "attendance_tgl_akhir",
            alias: "End Date",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="End Date" />
            ),
        },
        {
            accessorKey: "attendance_is_aktif",
            alias: "Status",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }: { row: any }) => {
                const status = row.getValue("attendance_is_aktif");
                return <StatusBadge status={status} />;
            },
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const attendance_id = row.original.attendance_id;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/payroll/periode-payroll/${attendance_id}`)}>
                            <Pencil />
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(attendance_id)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const onTriggerDelete = (id: string) => {
        setIsDialogOpen(true);
        setIsDeleted(id);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/Attendance/${isDeleted}`);
            if (response.status === 200) {
                setIsDialogOpen(false)
                setAlertDialog({title: "Success!",message: "Delete successfully",type: "success"});
            }
        } catch (error) {
            console.error(error);
            setAlertDialog({title: "Error!",message: "Something went wrong",type: "error",});
        }
    }

    const handleClickTes = () => {
    // Fungsi yang akan dijalankan saat tombol diklik
    setCount(count + 1);
    console.log('Tombol diklik!');
  };

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Periode Payroll</h1>
                <div className="flex gap-2">
                    <Button variant="ghost" className="text-foreground" title="Add Periode Payroll" onClick={() => router.push("/backoffice/payroll/periode-payroll/create")}>
                        <CirclePlus className="w-48 h-48" /> Add Periode Payroll
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchAttendence} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default Attendence;
