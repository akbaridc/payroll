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
    
        const response = await axios.post("/api/GetPaginateTransPayroll", payload);
        if (response.status === 200) {
            // Tambahkan RowNum ke setiap item dalam data
            const dataWithRowNum = response.data.data.map((item: any, index: number) => ({
                ...item,
                RowNum: (page - 1) * length + index + 1, // Hitung nomor urut
            }));

            return {
                data: dataWithRowNum,
                total: response.data.meta.total,
            };
        }
    
        return { data: [], total: 0 };
    };

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
            accessorKey: "trans_payroll_tgl_create",
            alias: "Date Created",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Date Created" />
            ),
        },
        {
            accessorKey: "attendance_kode",
            alias: "Periode Payroll",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Periode Payroll" />
            ),
        },
        {
            accessorKey: "trans_payroll_periode_thn",
            alias: "Year",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Year" />
            ),
        },
        {
            accessorKey: "trans_payroll_periode_bln_nama",
            alias: "Month",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Month" />
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
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const trans_payroll_id = row.original.trans_payroll_id;
                const trans_payroll_status = row.original.trans_payroll_status;

                if(trans_payroll_status == "Validation confirmed"){
                    return (
                        <div className="flex space-x-2">
                            <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/payroll/prepayroll/detail/${trans_payroll_id}`)}>
                                <Search />
                            </Button>
                        </div>
                    );
                }else{
                    return (
                        <div className="flex space-x-2">
                            <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/payroll/prepayroll/${trans_payroll_id}`)}>
                                <Pencil />
                            </Button>
                        </div>
                    );

                }
            },
        },
    ];

    const onTriggerDelete = (id: string) => {
        setIsDialogOpen(true);
        setIsDeleted(id);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/TransPayroll/${isDeleted}`);
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
                <h1 className="text-2xl font-bold mb-4">Pre Payroll</h1>
                <div className="flex gap-2">
                    <Button variant="ghost" className="text-foreground" title="Add Pre Payroll" onClick={() => router.push("/backoffice/payroll/prepayroll/create")}>
                        <CirclePlus className="w-48 h-48" /> Add Pree Payroll
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchAttendence} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default Attendence;
