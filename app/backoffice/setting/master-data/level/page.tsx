/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import DeleteDialog from "@/components/element/dialog/delete-dialog";
import {useState} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { StatusBadge } from "@/components/badge/status";

const Levels = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState("");

    const fetchLevels = async ({ page, length, search }: any) => {
        const payload = {
          size:length,
          page,
          search
        };
    
        const response = await axios.post("/api/level-paginate", payload);
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
            accessorKey: "karyawan_level_kode",
            alias: "Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Code" />
            ),
        },
        {
            accessorKey: "karyawan_level_nama",
            alias: "Name",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Name" />
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
            accessorKey: "karyawan_level_is_aktif",
            alias: "Status",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }: { row: any }) => {
                const status = row.getValue("karyawan_level_is_aktif");
                return <StatusBadge status={status} />;
            },
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const karyawan_level_id = row.original.karyawan_level_id;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/setting/master-data/level/${karyawan_level_id}`)}>
                            Edit
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(karyawan_level_id)}>
                            Delete
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
            const response = await axios.delete(`/api/KaryawanLevel/${isDeleted}`);
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
                <h1 className="text-2xl font-bold mb-4">Levels</h1>
                <div className="flex gap-2">
                    <Button variant="ghost" className="text-foreground" title="Add Level" onClick={() => router.push("/backoffice/setting/master-data/level/create")}>
                        <CirclePlus className="w-48 h-48" />
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchLevels} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default Levels;
