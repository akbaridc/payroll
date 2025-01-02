"use client";  // Menandakan file ini dijalankan di sisi klien

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Info, CircleAlert } from "lucide-react";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

const AlertDialog = () => {
    const { alertDialog, setAlertDialog } = useAlertDialog();

    const handleClose = () => setAlertDialog(null);

    if (!alertDialog) return null;

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
        <Dialog open={!!alertDialog} onOpenChange={handleClose}>
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
                        <Button variant="outline" type="button" onClick={handleClose}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};

export default AlertDialog;
