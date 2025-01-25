/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Image from "next/image";

const Employee = () => {
    const router = useRouter();;

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
                return status === 1 ? <span>AKTIF</span> : <span>NON-AKTIF</span>;
            },
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Employee</h1>
            <div className="flex gap-2">
                <Button variant="ghost" className="text-foreground" title="Add Employee" onClick={() => router.push("/backoffice/employee/create")}>
                    <CirclePlus className="w-48 h-48" />
                </Button>
            </div>
            <DataTable columns={columns} fetchData={fetchEmployees} />
        </div>
    );
};

export default Employee;
