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

const Division = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState("");

    const fetchCategoryAbsensi = async ({ page, length, search }: any) => {
        const payload = {
          size:length,
          page,
          search
        };
    
        const response = await axios.post("/api/GetPaginateKategoriAbsensi", payload);
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
            accessorKey: "kategori_absensi_kode",
            alias: "Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Code" />
            ),
        },
        {
            accessorKey: "kategori_absensi_keterangan",
            alias: "Description",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },
        {
            accessorKey: "kategori_absensi_is_aktif",
            alias: "Status",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }: { row: any }) => {
                const status = row.getValue("kategori_absensi_is_aktif");
                return <StatusBadge status={status} />;
            },
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const kategori_absensi_id = row.original.kategori_absensi_id;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/setting/master-data/category-absensi/${kategori_absensi_id}`)}>
                            <Pencil />
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(kategori_absensi_id)}>
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
            const response = await axios.delete(`/api/KategoriAbsensi/${isDeleted}`);
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
                <h1 className="text-2xl font-bold mb-4">Category Absensi</h1>
                <div className="flex gap-2">
                    <Button className="text-foreground" title="Add Divisi" onClick={() => router.push("/backoffice/setting/master-data/category-absensi/create")}>
                        <CirclePlus className="w-48 h-48" /> Add data
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchCategoryAbsensi} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default Division;
