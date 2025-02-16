"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

// import Other from "./components/other/other";
// import { OtherValidation, OtherDefault } from "./components/other/schema";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import axios from "@/lib/axios";
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from "react";
import { generateNewID, setErrorRequest, formatCurrency, unformatCurrency } from "@/app/helpers/global-helper";
import { InterfacePrePayrollForm } from "@/components/element/interface/global-interface";
import { FormInputField } from "@/components/form/field-input";
import { FormInputFieldDate } from "@/components/form/field-input-date";
import { ButtonAct } from "@/components/form/button";
import { Button } from "@/components/ui/button";
import { FormCheckboxField } from "@/components/form/field-checkbox";
import { ComboboxForm } from "@/components/form/combobox";
import { user } from "@/app/helpers/global-helper";
import { Month } from "@/app/resources/static-option-value";
import useSWR from "swr";
import Attendence from "../page";
import { Pencil, Plus, Trash, ClipboardPaste } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { count } from "console";
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import { PayrollDetailDialog } from "../components/dialog/payroll-detail-dialog";

export default function PrePayrollCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();
    const [Attendance, setAttendance] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [trans_payroll_id, set_trans_payroll_id] = useState(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [KaryawanId, setKaryawanId] = useState("");
    const [KaryawanNama, setKaryawanNama] = useState("");
    const [TransPayrollId, setTransPayrollId] = useState("");
    const [TransPayrollDetailId, setTransPayrollDetailId] = useState("");
    const { register, watch } = useForm();
    const [attendance_id, set_attendance_id] = useState('');
    const [trans_payroll_periode_bln, set_trans_payroll_periode_bln] = useState('');
    const [trans_payroll_periode_thn, set_trans_payroll_periode_thn] = useState('');

    const handleTahunChange = (event: any) => {
        set_trans_payroll_periode_thn(event.target.value);
        
    };

    const handleBulanChange = (event: any) => {
        set_trans_payroll_periode_bln(event.target.value);
    };

    const handleSave = async ()=>{
        setLoading(true);
        
        const payload = {
            trans_payroll_id:trans_payroll_id,
            perusahaan_id:'2C3AFF51-4388-4D30-8C91-2580750960FC',
            depo_id:'7B186AAD-1DC8-478B-AEEE-0D2C263510EA',
            attendance_id:attendance_id,
            trans_payroll_status:'Draft',
            trans_payroll_periode_bln:trans_payroll_periode_bln,
            trans_payroll_periode_thn:trans_payroll_periode_thn,
            trans_payroll_who_create:user().name,
            trans_payroll_tgl_create:new Date(),
            trans_payroll_who_update:user().name,
            trans_payroll_tgl_update:new Date(),
            jenis_pajak:''
        }

        console.log(payload);

        await axios.post("/api/TransPayroll", payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
                    setLoading(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {attendance_kode: "code"};
                setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });   
    }


    useEffect(() => {
        const set_newid = async () => {
            const new_id = await generateNewID();
            set_trans_payroll_id(new_id);
        };

        const set_attendance_temp = async () => {
            const payload_attendance = {
                perusahaan_id: '2C3AFF51-4388-4D30-8C91-2580750960FC',
                depo_id: '7B186AAD-1DC8-478B-AEEE-0D2C263510EA'
            };

            const response_attendance = await axios.get(`/api/GetPeriodePayrollByPerusahaan`, {
                params: payload_attendance
            });
            const dataPeriodePayroll = response_attendance.data.data;

            console.log(response_attendance);
            
            
            const tempAttendance = dataPeriodePayroll.map((item: any) => {
                return { value: item.attendance_id, label: `${item.attendance_kode}` }
            });

            setAttendance(tempAttendance);
        };

        set_attendance_temp();
        set_newid();
    }, []);

    interface PayrollDetail {
        karyawan_id: string;
        tunjangan_id: string;
        tunjangan_kode: string;
        tunjangan_nama: string;
        trans_payroll_detail2_multiplier: number;
        trans_payroll_detail2_value: number;
        trans_payroll_detail2_totalvalue: number;
        trans_payroll_detail2_autogen: number;
        tunjangan_flag_pph: number;
    }

    const ProsesTransPayrollDetail = async ({ page, length, search }: any) => {
        if(selectedData){
            const payload_payroll_detail = {
                trans_payroll_id:trans_payroll_id,
                attendance_id:selectedData,
                size:length,
                page,
                search
            };
 
            const response_payroll_detail = await axios.post("/api/GetPaginateSummaryTransPayrollDetailTemp", payload_payroll_detail);

            if (response_payroll_detail.status === 200) {
                // Tambahkan RowNum ke setiap item dalam data
                const dataWithRowNum = response_payroll_detail.data.data.map((item: any, index: number) => ({
                    ...item,
                    RowNum: (page - 1) * length + index + 1, // Hitung nomor urut
                }));

                return {
                    data: dataWithRowNum,
                    total: response_payroll_detail.data.meta.total,
                };
            }
        }

        return { data: [], total: 0 };
    }

    const ViewModalPayrollDetail = (trans_payroll_id: string, trans_payroll_detail_id: string, karyawan_id: string, karyawan_nama: string) => {
        setKaryawanId(karyawan_id);
        setKaryawanNama(karyawan_nama);
        setTransPayrollId(trans_payroll_id);
        setTransPayrollDetailId(trans_payroll_detail_id);

        console.log("trans_payroll_id", trans_payroll_id);
        
    
        setIsOpenDialog(true);
    }

    const columns = [
        {
            accessorKey: "RowNum",
            alias: "No",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="No" />
            ),
        },
        {
            accessorKey: "karyawan_nama",
            alias: "Employee",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Employee" />
            ),
        },
        {
            accessorKey: "divisi",
            alias: "Divisi",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Divisi" />
            ),
        },
        {
            accessorKey: "karyawan_level_nama",
            alias: "Level",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Level" />
            ),
        },
        {
            accessorKey: "penghasilanbruto",
            alias: "Nett Amount",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Nett Amount" />
            ),
            cell: ({ row }: { row: any }) => {
                const penghasilanbruto = row.original.penghasilanbruto;
                return formatCurrency(penghasilanbruto);
            },
        },
        {
            accessorKey: "trans_payroll_detail_keterangan",
            alias: "Remark",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Remark" />
            ),
        },
        {
            accessorKey: "trans_payroll_status",
            alias: "Status",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
        },
        {
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const trans_payroll_id = row.original.trans_payroll_id;
                const trans_payroll_detail_id = row.original.trans_payroll_detail_id;
                const karyawan_id = row.original.karyawan_id;
                const karyawan_nama = row.original.karyawan_nama;
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm"
                         onClick={() => ViewModalPayrollDetail(trans_payroll_id, trans_payroll_detail_id, karyawan_id, karyawan_nama)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const form = useForm({
        resolver: zodResolver(
            z.object({
                trans_payroll_id: z.string().min(1, "Trans Payroll ID is required"),
                attendance_id: z.string().min(1, "Periode Payroll is required"),
                trans_payroll_periode_thn: z.string().min(1, "Year periode is required"),
                trans_payroll_periode_bln: z.string().min(1, "Month periode is required"),
            }),
        ),
        defaultValues: {trans_payroll_id:"",attendance_id:"",trans_payroll_periode_thn:"",trans_payroll_periode_bln:""},
    });

    const GetAttendance = async (selectedValue: any) => {
        const attendance_id_new = selectedValue;

        // Jalankan API ketika nilai combo box berubah
        const response_attendance = await axios.get(`/api/Attendance/${selectedValue}`);
        const dataPeriodePayroll = response_attendance.data;
        
        set_attendance_id(attendance_id_new);
        set_trans_payroll_periode_thn(dataPeriodePayroll.data.attendance_periode_thn);
        set_trans_payroll_periode_bln(dataPeriodePayroll.data.attendance_periode_bln);
        
        if (dataPeriodePayroll) {
            form.setValue("trans_payroll_periode_thn", dataPeriodePayroll.data.attendance_periode_thn);
            form.setValue("trans_payroll_periode_bln", dataPeriodePayroll.data.attendance_periode_bln);
        }

        setSelectedData(selectedValue);

        if(attendance_id_new){
            const payload = {
                trans_payroll_id:trans_payroll_id,
                attendance_id:attendance_id_new,
                pengguna_username:user().name,
            };
            
            const response = await axios.post("/api/ProsesSimpanHasilHitungPayrollTemp", payload);

            console.log(response);
            
        }

        return;

    };
    
    // const onSubmit =  async (values: InterfacePrePayrollForm) => {
        
    //     setLoading(true);

    //     console.log("form submit");
        

    //     const payload = {
    //         trans_payroll_id:values.trans_payroll_id,
    //         perusahaan_id:'2C3AFF51-4388-4D30-8C91-2580750960FC',
    //         depo_id:'7B186AAD-1DC8-478B-AEEE-0D2C263510EA',
    //         attendance_id:values.attendance_id,
    //         trans_payroll_status:'Draft',
    //         trans_payroll_periode_bln:values.trans_payroll_periode_bln,
    //         trans_payroll_periode_thn:values.trans_payroll_periode_thn,
    //         trans_payroll_who_create:user().name,
    //         trans_payroll_tgl_create:new Date(),
    //         trans_payroll_who_update:user().name,
    //         trans_payroll_tgl_update:new Date(),
    //         jenis_pajak:''
    //     }
    //     await axios.post("/api/TransPayroll", payload)
    //         .then((response) => {
    //             if(response.status == 200){
    //                 setAlertDialog({title: "Success!",message: "Create successfully",type: "success"});
    //                 setLoading(false);
    //                 router.back();
    //             }
    //         })
    //         .catch(error => {
    //             const errors = error.response?.data?.data;
    //             const convertFieldName = {attendance_kode: "code"};
    //             setErrorRequest(errors, form, convertFieldName);

    //             setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
    //         }).finally(() => {
    //             setLoading(false);
    //         });
    // };

    return (
    <>
    <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Pre Payroll</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...form}>
                    {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="attendance_id" label="Periode Payroll" combobox={Attendance} onChange={() => {
                                const selectedValue = form.getValues('attendance_id');
                                GetAttendance(selectedValue);
                            }}/>
                            <FormInputField className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.trans_payroll_periode_thn?.message} name="trans_payroll_periode_thn" label="Year Periode" onChange={handleTahunChange} disabled/>
                            <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_periode_bln" label="Month Periode" combobox={Month()} onChange={handleBulanChange} disabled/>
                            <FormInputField type="hidden" className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.trans_payroll_id?.message} name="trans_payroll_id" label="" />
                            {/* <FormInputField type="hidden" className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.trans_payroll_status?.message} name="trans_payroll_status" label="" />
                            <FormInputField type="hidden" className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.jenis_pajak?.message} name="jenis_pajak" label="" /> */}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <DataTable columns={columns} fetchData={ProsesTransPayrollDetail} lengthOption={5} />
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>Back</Button>
                            <Button type="button" variant="default" size="sm" onClick={handleSave}>Save</Button>
                            {/* <ButtonAct className="w-fit" text="Save" loading={loading} type="submit" /> */}
                        </div>
                    </form>
                </Form>
            </div>
            <PayrollDetailDialog open={isOpenDialog} setOpen={setIsOpenDialog} TransPayrollId={TransPayrollId} TransPayrollDetailId={TransPayrollDetailId} KaryawanId={KaryawanId} KaryawanNama={KaryawanNama} />
        </div>
    </>
    );
}
