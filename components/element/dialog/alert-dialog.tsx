"use client";  // Menandakan file ini dijalankan di sisi klien

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Info, CircleAlert } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

const AlertDialog = () => {
    const { alertDialog, setAlertDialog } = useAlertDialog();
    const [open, setOpen] = useState(false);

    // Fungsi untuk menutup dialog
    const handleClose = () => {
        setAlertDialog(null); 
    };

    useEffect(() => {
        if (alertDialog) {
            // Jika ada dialog yang disimpan di context, tampilkan dialog
            setOpen(true);
        } else {
            // Menutup dialog jika tidak ada data dialog
            setOpen(false);
        }
    }, [alertDialog]); // Menjalankan efek ini hanya ketika alertDialog berubah

    if (!alertDialog) {
        return null;  // Jika tidak ada data dialog, tidak menampilkan apa-apa
    }

    const type = alertDialog.type ?? "";

    const setIcons = {
        error: <X className="h-8 w-8" />,
        success: <Check className="h-8 w-8" />,
        warning: <CircleAlert className="h-8 w-8" />,
        info: <Info className="h-8 w-8" />,
    };

    const setColor = {
        error: "text-red-600",
        success: "text-green-600",
        warning: "text-yellow-600",
        info: "text-sky-600",
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    {type ? (
                        <DialogTitle className={`flex gap-2 items-center font-bold tracking-wider ${setColor[type as keyof typeof setColor]}`} >
                            {setIcons[type as keyof typeof setIcons]}
                            <div className="text-xl">{alertDialog.title}</div>
                        </DialogTitle>
                    ) : <DialogTitle>{alertDialog.title || 'Alert'}</DialogTitle>}
                    <DialogDescription className="text-md">
                        {alertDialog.message || ''}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};

export default AlertDialog;
