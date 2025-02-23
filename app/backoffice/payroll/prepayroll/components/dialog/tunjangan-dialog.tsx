/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { ClipboardPaste } from "lucide-react";

import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useState, useEffect } from "react";
import { generateNewID} from "@/app/helpers/global-helper";

export function TunjanganDialog({ open, setOpen, dataTabelPayrollDetail, TransPayrollId, TransPayrollDetailId, KaryawanId}: any) {

    const { setAlertDialog } = useAlertDialog();
    const [trans_payroll_detail2_id, set_trans_payroll_detail2_id] = useState(null);
    const [dataTabelTunjangan, setdataTabelTunjangan] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getTunjanganAktif");

            setdataTabelTunjangan(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const setChooseTunjangan = (row: any) => {

        const existData = dataTabelPayrollDetail.filter((value: any) => value.trans_payroll_detail_id === TransPayrollDetailId && value.tunjangan_id === row.tunjangan_id);

        if(existData.length === 0) {
            
            const set_newid = async () => {
                const new_id = await generateNewID();
                set_trans_payroll_detail2_id(new_id);
            };
            
            set_newid();

            setTimeout(() => {

                if (trans_payroll_detail2_id !== null) {

                    dataTabelPayrollDetail.push({
                        karyawan_id:KaryawanId,
                        trans_payroll_detail2_id:trans_payroll_detail2_id,
                        trans_payroll_detail_id:TransPayrollDetailId,
                        trans_payroll_id:TransPayrollId,
                        tunjangan_id: row.tunjangan_id,
                        tunjangan_kode: row.tunjangan_kode,
                        tunjangan_nama: row.tunjangan_nama,
                        trans_payroll_detail2_multiplier:"1",
                        trans_payroll_detail2_value:"0",
                        trans_payroll_detail2_totalvalue:"0",
                        trans_payroll_detail2_urut:0,
                        trans_payroll_detail2_autogen:0,
                        tunjangan_flag_pph:0
                    });

                    console.log("dataTabelPayrollDetail", dataTabelPayrollDetail);
                    

                    handleClose();

                }
                
            }, 1000);
            
        } else {
            setAlertDialog({title: "Warning!",message: "Data already exist in the list", type: "warning"});
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[90%] flex flex-col max-h-[90vh]">
                <DialogHeader className="sticky top-0 bg-background z-10 p-4 border-b">
                    <DialogTitle>Form Allowance</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="container mx-auto">
                        <table className="table-auto w-full mb-6">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">No</th>
                                    <th className="px-4 py-2 text-left">Code</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Type</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTabelTunjangan.map((item, index) => (
                                    <tr key={item.tunjangan_id}>
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{item.tunjangan_kode}</td>
                                        <td className="px-4 py-2">{item.tunjangan_nama}</td>
                                        <td className="px-4 py-2">{item.tunjangan_jenistunjangan}</td>
                                        <td className="px-4 py-2">
                                            <Button type="button" variant="warning" size="sm" onClick={() => setChooseTunjangan(item)}>
                                                <ClipboardPaste />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
