/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


const DeleteDialog = ({ open, setOpen, onClick }: any) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete data.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button size="sm" type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                    <Button variant="destructive" className="w-fit" size="sm" onClick={onClick}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog;