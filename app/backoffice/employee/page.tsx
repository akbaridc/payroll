/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus, Trash, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Image from "next/image";
import { StatusBadge } from "@/components/badge/status";
import {useState} from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import DeleteDialog from "@/components/element/dialog/delete-dialog";

const Employee = () => {
    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState("");

    const fetchEmployees = async ({ page, length, search }: any) => {
        const payload = {
          size:length,
          page,
          search
        };
    
        const response = await axios.post("/api/GetPaginateKaryawan", payload);
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
            accessorKey: "karyawan_foto",
            alias: "Picture",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Picture" />
            ),
            cell: ({ row }: { row: any }) => {
                // Get the photo value and check if it is null or undefined
                const picture = row.getValue("karyawan_foto") 
                    ? (row.getValue("karyawan_foto") === "default.jpg" ? "/default.jpg" : row.getValue("karyawan_foto"))
                    : "/default.jpg"; // Fallback to default image if it's null or undefined
            
                return <Image src={picture} alt="Logo" width={60} height={60} />;
            },
        },
        {
            accessorKey: "karyawan_nama",
            alias: "Name",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "karyawan_divisi_nama",
            alias: "Divisi",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Divisi" />
            ),
        },
        {
            accessorKey: "karyawan_level_nama",
            alias: "Level",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Level" />
            ),
        },
        {
            accessorKey: "karyawan_is_aktif",
            alias: "Status",
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }: { row: any }) => {
                const status = row.getValue("karyawan_is_aktif");
                return <StatusBadge status={status} />;
            },
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const karyawan_id = row.original.karyawan_id;
                return (
                    <div className="flex space-x-2">
                        {/* <Button type="button" variant="warning" size="sm" onClick={() => router.push(`/backoffice/employee/${karyawan_id}`)}>
                            <Pencil />
                        </Button> */}
                        <Button type="button" variant="destructive" size="sm" onClick={() => onTriggerDelete(karyawan_id)}>
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
            const response = await axios.delete(`/api/Karyawan/${isDeleted}`);
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
                <h1 className="text-2xl font-bold mb-4">Employee</h1>
                <div className="flex gap-2">
                    <Button className="text-foreground" title="Add Employee" onClick={() => router.push("/backoffice/employee/create")}>
                        <CirclePlus className="w-48 h-48" /> Add data
                    </Button>
                </div>
                <DataTable columns={columns} fetchData={fetchEmployees} />
            </div>
            <DeleteDialog open={isDialogOpen} setOpen={setIsDialogOpen} onClick={handleDelete} />
        </>
    );
};

export default Employee;
