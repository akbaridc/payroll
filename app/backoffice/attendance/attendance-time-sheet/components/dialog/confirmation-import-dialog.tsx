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

import { ButtonAct } from "@/components/form/button";
import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useCallback } from "react";
import {user} from "@/app/helpers/global-helper";
import { useState } from "react";
import { Loading } from "@/components/utils/loading";

export function ConfirmationImportDialog({ open, setOpen }: any) {
    const { setAlertDialog } = useAlertDialog();
    const [error, setError] = useState(0);
    const [success, setSuccess] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchAttendanceImportResult = useCallback(async ({ page, length, search }: any) => {
        const payload = { size: length, page, search, who: user().email };
    
        const response = await axios.post("/api/attendance/import/refresh-paginate-result", payload);
        if (response.status === 200) {
          setError(response.data.totalError);
          setSuccess(response.data.totalSuccess);
          return {
            data: response.data.data,
            total: response.data.meta.total,
          };
        }
    
        return { data: [], total: 0 };
    }, []);

    const columns = [
        {
            accessorKey: "attendance_code",
            alias: "Attendance Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Attendance Code" />
            ),
        },
        {
            accessorKey: "employee_nip",
            alias: "Karyawan NIP",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Karyawan NIP" />
            ),
        },
        {
            accessorKey: "check_in",
            alias: "Tanggal Check In",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Tanggal Check In" />
            ),
        },
        {
            accessorKey: "check_out",
            alias: "Tanggal Check Out",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Tanggal Check Out" />
            ),
        },
        {
            accessorKey: "error",
            alias: "Error",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Error" />
            ),
        },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handlerConfirm = async () => {
        setLoading(true);
        await axios.post("/api/attendance/import/confirm", {who: user().email})
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: response.data.message,type: "success"});
                    handleClose();
                }
            })
            .catch(error => {
                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            {loading && <Loading />}
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[90%] flex flex-col max-h-[90vh]">
                    <DialogHeader className="sticky top-0 bg-background z-10 p-4 border-b">
                        <DialogTitle>Confirmation Import Attendance</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="container mx-auto">
                            <div className="mb-4">
                                {error > 0 && (
                                    <h6>There was an error importing data</h6>
                                )}
                                {error == 0 ? (
                                    <h6>There was no error importing data</h6>
                                ) : (
                                    <h6>Error : {error}, Success: {success}</h6>
                                )}
                                {success > 0 && (
                                    <ButtonAct className="w-fit" text="Confirm Upload Data Success" loading={loading} onClick={handlerConfirm}/>
                                )}
                            </div>
                            <DataTable columns={columns} fetchData={fetchAttendanceImportResult} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
