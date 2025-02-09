/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus, Trash, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import DeleteDialog from "@/components/element/dialog/delete-dialog";
import {useState} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { StatusBadge } from "@/components/badge/status";

const AllowancePage = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState("");

    const fetchAllowance = async ({ page, length, search }: any) => {
        const payload = {
          size:length,
          page,
          search
        };
    
        const response = await axios.post("/api/GetPaginateTunjangan", payload);
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
            accessorKey: "tunjangan_kode",
            alias: "Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Code" />
            ),
        },
        {
            accessorKey: "tunjangan_nama",
            alias: "Name",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "tunjangan_jenistunjangan",
            alias: "Jenis",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Jenis" />
            ),
        },
        {
            accessorKey: "tunjangan_dasarbayar",
            alias: "Dasar Bayar",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Dasar Bayar" />
            ),
        },
        {
            accessorKey: "tunjangan_keterangan",
            alias: "Keterangan",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Keterangan" />
            ),
        },
        {
            accessorKey: "tunjangan_is_aktif",
            alias: "Status",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }: { row: any }) => {
                const status = row.getValue("tunjangan_is_aktif");
                return <StatusBadge status={status} />;
            },
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const tunjangan_id = row.original.tunjangan_id;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/setting/master-data/allowance/${tunjangan_id}`)}>
                            <Pencil />
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(tunjangan_id)}>
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
            const response = await axios.delete(`/api/Tunjangan/${isDeleted}`);
            if (response.status === 200) {
                setIsDialogOpen(false)
                setAlertDialog({title: "Success!",message: "Delete successfully",type: "success"});
            }
        } catch (error) {
            console.error(error);
            setAlertDialog({title: "Error!",message: "Something went wrong",type: "error",});
        }
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Allowance</h1>
                <div className="flex gap-2">
                    <Button className="text-foreground" title="Add Divisi" onClick={() => router.push("/backoffice/setting/master-data/allowance/create")}>
                        <CirclePlus className="w-48 h-48" /> Add data
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchAllowance} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default AllowancePage;
