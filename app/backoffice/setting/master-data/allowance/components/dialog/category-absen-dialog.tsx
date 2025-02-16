/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus, ClipboardPaste } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useCallback } from "react";

export function CategoryAbsenDialog({ open, setOpen, fields, append }: any) {

    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();

    const fetchCategoryAbsensi = useCallback(async ({ page, length, search }: any) => {
        const payload = { size: length, page, search };
    
        const response = await axios.post("/api/GetPaginateKategoriAbsensi", payload);
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
            accessorKey: "kategori_absensi_kode",
            alias: "Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Code" />
            ),
        },
        {
            accessorKey: "kategori_absensi_nama",
            alias: "Name",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Name" />
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
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm" onClick={() => setChooseCategoryAbsen(row.original)}>
                            <ClipboardPaste />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const setChooseCategoryAbsen = (row: any) => {
        const dataPayload = {
            absensi_id: row.kategori_absensi_id,
            code: row.kategori_absensi_kode,
            name: row.kategori_absensi_nama,
        }

        const existData = fields.filter((value: any) => value.absensi_id === row.kategori_absensi_id);
        if(existData.length === 0) {
            append(dataPayload);
        } else {
            setAlertDialog({title: "Warning!",message: "Data already exist in the list",type: "warning"});
        }

        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[90%]" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <DialogHeader>
                    <DialogTitle>Category Absensi</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="container mx-auto">
                    <div className="flex gap-2">
                        <Button className="text-foreground" title="Add Divisi" onClick={() => router.push("/backoffice/setting/master-data/category-absensi/create")}>
                            <CirclePlus className="w-48 h-48" /> Add data
                        </Button>
                    </div>
                    <DataTable columns={columns} fetchData={fetchCategoryAbsensi} lengthOption={5} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
