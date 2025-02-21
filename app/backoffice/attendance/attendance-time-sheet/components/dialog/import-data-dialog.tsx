/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInputFieldFile } from "@/components/form/field-input-file";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import {user} from "@/app/helpers/global-helper";
import {ConfirmationImportDialog} from "./confirmation-import-dialog";

export function ImportDataDialog({ open, setOpen}: any) {

    const { setAlertDialog } = useAlertDialog();
    const [loading, setLoading] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;  

    const form = useForm({
        resolver: zodResolver(
            z.object({
                file: z
                    .any()
                    .refine((file) => file !== null && file !== undefined, { message: "File is required." }) 
                    .refine((file) => file && file.size <= MAX_FILE_SIZE, { message: "Max file size is 5MB." })
                    .refine(
                        (file) => file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        { message: "File type must be .xlsx" }
                    ),
            }),
        ),
        defaultValues: {periode_payroll:"", file:undefined},
    });

    const handleClose = () => {
        setOpen(false);
    };

    const getTemplate = async () => {
        const response = await axios.get("/api/attendance/template-import/attendance", {
            responseType: "blob"
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const uniqueTime = Date.now();

        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = `import_absensi_${uniqueTime}.xlsx`;
        link.click();

        window.URL.revokeObjectURL(url);
    }

    const onSubmit =  async (values: any) => {
        setLoading(true);
        
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("who", user().email);

        await axios.post("/api/attendance/import/attendance", formData, {
            headers: { "Content-Type": "multipart/form-data" }
            // onUploadProgress: (progressEvent) => {
            //     console.log(progressEvent);
            //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent?.total);
            //     console.log(`Upload Progress: ${percentCompleted}%`);
            // },
        })
        .then((response) => {
            if(response.status == 200){
                setIsOpenDialog(true)
                handleClose();
            }
        })
        .catch(error => {
            setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[30%] flex flex-col max-h-[90vh]">
                    <DialogHeader className="sticky top-0 bg-background z-10 p-4 border-b">
                        <DialogTitle>Import Data</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="container mx-auto">
                            <div className="mb-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <div className="grid grid-cols-1 gap-4">
                                            <p className="w-full cursor-pointer text-blue-500 hover:text-blue-600" onClick={getTemplate}>Get Template</p>
                                            <FormInputFieldFile className="custom-field w-full" form={form} error={form.formState.errors.file?.message} label="File" name="file" type="file"
                                                accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            />
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <Button type="button" variant="destructive" size="sm" onClick={handleClose}>Cancel</Button>
                                            <ButtonAct className="w-fit" text="Submit" loading={loading} />
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <ConfirmationImportDialog open={isOpenDialog} setOpen={setIsOpenDialog}/>
        </>
    )
}
