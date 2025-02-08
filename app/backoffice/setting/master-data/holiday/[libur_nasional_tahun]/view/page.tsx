/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter, useParams } from 'next/navigation'
import axios from "@/lib/axios";
import DeleteDialog from "@/components/element/dialog/delete-dialog";
import {useState} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import moment from "moment";

const HolidayView = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState("");
    const { libur_nasional_tahun } = useParams();

    const fetchHoliday = async ({ page, length, search }: any) => {
        const payload = {
          size:length,
          page,
          search,
          libur_nasional_tahun
        };
    
        const response = await axios.post("/api/GetPaginateLiburNasional", payload);
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
            accessorKey: "libur_nasional_tanggal",
            alias: "Date",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Date" />
            ),
            cell: ({ row }: { row: any }) => {
                const libur_nasional_tanggal = row.original.libur_nasional_tanggal;
                return moment(libur_nasional_tanggal).format("DD/MM/YYYY")
            },
        },
        {
            accessorKey: "libur_nasional_nama",
            alias: "Description",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const libur_nasional_id = row.original.libur_nasional_id;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(libur_nasional_id)}>
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
            const response = await axios.delete(`/api/LiburNasional/${isDeleted}/detail`);
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
                <h1 className="text-2xl font-bold mb-4">Holiday Year {libur_nasional_tahun}</h1>
                <div className="flex gap-2">
                    <Button variant="destructive" className="text-foreground" title="Add Holiday" onClick={() => router.back()}>
                        <MoveLeft className="w-48 h-48" /> Back to List
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchHoliday} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default HolidayView;
