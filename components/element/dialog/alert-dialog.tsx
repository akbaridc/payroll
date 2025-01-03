"use client";  // Menandakan file ini dijalankan di sisi klien

import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import { Check, X, Info, CircleAlert } from "lucide-react";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { Separator } from "@/components/ui/separator"

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
                    <DialogDescription className="text-md"></DialogDescription>
                </DialogHeader>
                <Separator className="my-3" />
                <p>{alertDialog.message || ''}</p>
            </DialogContent >
        </Dialog >
    );
};

export default AlertDialog;
