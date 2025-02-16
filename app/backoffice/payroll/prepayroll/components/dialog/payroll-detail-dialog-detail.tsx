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
import { FormInputField } from "@/components/form/field-input";
import axios from "@/lib/axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { formatCurrency } from "@/app/helpers/global-helper";

export function PayrollDetailDialog({ open, setOpen, TransPayrollId, TransPayrollDetailId, KaryawanId, KaryawanNama }: any) {

    const [dataTabelPayrollDetail, setDataTabelPayrollDetail] = useState<any[]>([]);
    
    const filter_trans_payroll_detail_id_detail2_ref = useRef<string | null>(null);
    const filter_karyawan_id_detail2_ref = useRef<string | null>(null);
    const filter_karyawan_nama_detail2_ref = useRef<string | null>(null);

    console.log(TransPayrollId);
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

    const fetchData = useCallback(async () => {
        try {
            const payload = {
                trans_payroll_detail_id:TransPayrollDetailId
            };

            const response = await axios.post("/api/GetTransPayrollDetail2ByTransPayrollDetailId", payload);

            setDataTabelPayrollDetail(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }, [TransPayrollDetailId]);

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
    }, [open, form, TransPayrollDetailId, KaryawanId, KaryawanNama, fetchData]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[90%] flex flex-col max-h-[90vh]">
                    <DialogHeader className="sticky top-0 bg-background z-10 p-4 border-b">
                        <DialogTitle>Form Payroll Detail</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-4">
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
                    </div>

                    <DialogFooter>
                        <button className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
