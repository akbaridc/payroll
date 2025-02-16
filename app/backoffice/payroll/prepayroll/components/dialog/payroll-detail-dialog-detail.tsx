/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus, ClipboardPaste, Trash } from "lucide-react";
import { FormInputField } from "@/components/form/field-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { generateNewID, setErrorRequest, formatCurrency, unformatCurrency } from "@/app/helpers/global-helper";

export function PayrollDetailDialog({ open, setOpen, TransPayrollId, TransPayrollDetailId, KaryawanId, KaryawanNama }: any) {

    const [dataTabelPayrollDetail, setDataTabelPayrollDetail] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const router = useRouter();
    const { setAlertDialog } = useAlertDialog();
    
    const filter_trans_payroll_detail_id_detail2_ref = useRef<string | null>(null);
    const filter_karyawan_id_detail2_ref = useRef<string | null>(null);
    const filter_karyawan_nama_detail2_ref = useRef<string | null>(null);

    const fetchData = async () => {
        try {
            const payload = {
                trans_payroll_detail_id:TransPayrollDetailId
            };

            const response = await axios.post("/api/GetTransPayrollDetail2ByTransPayrollDetailId", payload);

            setDataTabelPayrollDetail(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (open) {
        // Jalankan API di sini
            fetchData();
            
            filter_trans_payroll_detail_id_detail2_ref.current = TransPayrollDetailId;
            filter_karyawan_id_detail2_ref.current = KaryawanId;
            filter_karyawan_nama_detail2_ref.current = KaryawanNama;

            form.setValue("filter_trans_payroll_detail_id_detail2", TransPayrollDetailId);
            form.setValue("filter_karyawan_id_detail2", KaryawanId);
            form.setValue("filter_karyawan_nama_detail2", KaryawanNama);

        }
    }, [open]);

    const handleInputChange = (event: any) => {
        console.log(event.target.value);
        
        const { name, value } = event.target;
        const newDataTabelPayrollDetail = dataTabelPayrollDetail.map((item: any) => {
            if (item.trans_payroll_detail2_id === event.target.dataset.id) {
                const newItem = { ...item, [name]: value };
                if (name === 'trans_payroll_detail2_multiplier' || name === 'trans_payroll_detail2_value') {
                    newItem.trans_payroll_detail2_totalvalue = newItem.trans_payroll_detail2_multiplier * newItem.trans_payroll_detail2_value;
                }
                return newItem;
            }
            return item;
        });
        
        console.log(newDataTabelPayrollDetail);
        setDataTabelPayrollDetail(newDataTabelPayrollDetail);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletePayrollDetail = (row: any) => {
        const newDataTabelPayrollDetail = dataTabelPayrollDetail.filter((value) => value.trans_payroll_detail2_id !== row.trans_payroll_detail2_id);
        setDataTabelPayrollDetail(newDataTabelPayrollDetail);
    };

    const form = useForm({
        resolver: zodResolver(
            z.object({
                    filter_karyawan_nama_detail2: z.string(),
                    filter_karyawan_id_detail2: z.string(),
                    filter_trans_payroll_detail_id_detail2: z.string(),
                    trans_payroll_detail2_multiplier: z.string(),
                    trans_payroll_detail2_value: z.string(),
                    trans_payroll_detail2_totalvalue: z.string(),
            }),
        ),
        defaultValues: {filter_karyawan_nama_detail2:"",filter_karyawan_id_detail2:"",filter_trans_payroll_detail_id_detail2:"",trans_payroll_detail2_multiplier:"",trans_payroll_detail2_value:"",trans_payroll_detail2_totalvalue:""},
    });

    return (
        <div>
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[90%]">
                    <DialogHeader>
                        <DialogTitle>Form Payroll Detail</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="container mx-auto p-4 md:p-6 lg:p-8">
                        <Form {...form}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                    <FormInputField className="w-full p-2 border border-gray-300 rounded" name="filter_karyawan_nama_detail2" label="" disabled />
                                    <FormInputField  type="hidden" className="custom-field w-full md:w-1/2" name="filter_karyawan_id_detail2" label="Employee Id" />
                                    <FormInputField type="hidden" className="custom-field w-full md:w-1/2" name="filter_trans_payroll_detail_id_detail2" label="Employee Id" />
                                </div>
                            </div>
                            <table className="table-auto w-full mb-6 table-custom">
                                <thead className="bg-gray-100">
                                    <tr>
                                    <th className="px-4 py-2 text-center">No</th>
                                    <th className="px-4 py-2 text-center">Allowance</th>
                                    <th className="px-4 py-2 text-center">Multiplier</th>
                                    <th className="px-4 py-2 text-center">Amount</th>
                                    <th className="px-4 py-2 text-center">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTabelPayrollDetail && (
                                        dataTabelPayrollDetail.map((item, index) => (
                                            <tr key={item.trans_payroll_detail2_id}>
                                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                                <td className="px-4 py-2">{item.tunjangan_nama}</td>
                                                <td className="px-4 py-2 text-end">{item.trans_payroll_detail2_multiplier}</td>
                                                <td className="px-4 py-2 text-end">{formatCurrency(item.trans_payroll_detail2_value)}</td>
                                                <td className="px-4 py-2 text-end">{formatCurrency(item.trans_payroll_detail2_totalvalue)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </Form>
                    </div>
                    <DialogFooter>
                        <button className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
