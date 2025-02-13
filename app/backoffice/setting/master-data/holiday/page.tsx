/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus, Trash, Pencil, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import DeleteDialog from "@/components/element/dialog/delete-dialog";
import {useState, useCallback} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

const Holiday = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState("");

    const fetchHoliday = useCallback(async ({ page, length, search }: any) => {
        const payload = { size: length, page, search };
    
        const response = await axios.post("/api/GetPaginateLiburNasionalIndex", payload);
        if (response.status === 200) {
          return {
            data: response.data.data,
            total: response.data.meta.total,
          };
        }
    
        return { data: [], total: 0 };
    }, []);

    const columns = [
        {
            accessorKey: "libur_nasional_tahun",
            alias: "Years",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Years" />
            ),
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const libur_nasional_tahun = row.original.libur_nasional_tahun;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" size="sm" onClick={() => router.push(`/backoffice/setting/master-data/holiday/${libur_nasional_tahun}/view`)}>
                            <Eye />
                        </Button>
                        <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/setting/master-data/holiday/${libur_nasional_tahun}`)}>
                            <Pencil />
                        </Button>
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(libur_nasional_tahun)}>
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
            const response = await axios.delete(`/api/LiburNasional/${isDeleted}`);
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
                <h1 className="text-2xl font-bold mb-4">Holiday</h1>
                <div className="flex gap-2">
                    <Button className="text-foreground" title="Add Holiday" onClick={() => router.push("/backoffice/setting/master-data/holiday/create")}>
                        <CirclePlus className="w-48 h-48" /> Add data
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchHoliday} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default Holiday;
