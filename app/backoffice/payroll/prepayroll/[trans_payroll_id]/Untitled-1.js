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
import { useRouter,useParams } from 'next/navigation'
import { useState, useEffect, useCallback } from "react";
import { setErrorRequest, formatCurrency } from "@/app/helpers/global-helper";
import { FormInputField } from "@/components/form/field-input";
import { Button } from "@/components/ui/button";
import { ComboboxForm } from "@/components/form/combobox";
import { user } from "@/app/helpers/global-helper";
import { Month } from "@/app/resources/static-option-value";
import useSWR from "swr";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { PayrollDetailDialog } from "../components/dialog/payroll-detail-dialog";
import { ButtonAct } from "@/components/form/button";
import { Loading } from "@/components/utils/loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
export default function TransPayrollEdit() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const { setAlertDialog } = useAlertDialog();
    const [Attendance, setAttendance] = useState([]);
    const [KaryawanDivisi, setKaryawanDivisi] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [KaryawanId, setKaryawanId] = useState("");
    const [KaryawanNama, setKaryawanNama] = useState("");
    const [TransPayrollId, setTransPayrollId] = useState("");
    const [TransPayrollDetailId, setTransPayrollDetailId] = useState("");
    const [attendance_id, set_attendance_id] = useState('');
    const [trans_payroll_periode_bln, set_trans_payroll_periode_bln] = useState('');
    const [trans_payroll_periode_thn, set_trans_payroll_periode_thn] = useState('');
    const [trans_payroll_status, set_trans_payroll_status] = useState('');
    const [karyawan_divisi_id, set_karyawan_divisi_id] = useState('');
    const { trans_payroll_id } = useParams();
    const [reloadKey, setReloadKey] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const { data } = useSWR(
        trans_payroll_id ? `/api/TransPayroll/${trans_payroll_id}` : null,
        fetcher
    );

    const form = useForm({
        resolver: zodResolver(
            z.object({
                trans_payroll_id: z.string().min(1, "Trans Payroll ID is required"),
                attendance_id: z.string().min(1, "Periode Payroll is required"),
                karyawan_divisi_id: z.string().min(1, "Karyawan Divisi is required"),
                trans_payroll_periode_thn: z.string().min(1, "Year periode is required"),
                trans_payroll_periode_bln: z.string().min(1, "Month periode is required"),
                trans_payroll_status: z.string().min(1, "Status is required"),
            }),
        ),
        defaultValues: {trans_payroll_id:"",attendance_id:"",karyawan_divisi_id:"",trans_payroll_periode_thn:"",trans_payroll_periode_bln:"",trans_payroll_status:""},
    });

     useEffect(() => {
        
        if (data) {
            form.setValue("trans_payroll_id", data.trans_payroll_id);
            form.setValue("attendance_id", data.attendance_id);
            form.setValue("trans_payroll_periode_thn", data.trans_payroll_periode_thn);
            form.setValue("trans_payroll_periode_bln", data.trans_payroll_periode_bln);
            form.setValue("trans_payroll_status", data.trans_payroll_status);

            set_attendance_id(data.attendance_id);
            set_trans_payroll_status(data.trans_payroll_status);
            set_trans_payroll_periode_thn(data.trans_payroll_periode_thn);
            set_trans_payroll_periode_bln(data.trans_payroll_periode_bln);

            setTimeout(() => {

                const set_payroll_detaiil = async () => {
                    const payload_payroll = {
                        trans_payroll_id: trans_payroll_id,
                        pengguna_username:user().name
                    };

                    const response_proses = await axios.post(`/api/ProsesHitungPayrollAsliKeTemp`, payload_payroll);
                    console.log(response_proses);
                    
                };

                set_payroll_detaiil();
                
                const set_atributte = async () => {
                    const payload_attendance = {
                        perusahaan_id: '2C3AFF51-4388-4D30-8C91-2580750960FC',
                        depo_id: '7B186AAD-1DC8-478B-AEEE-0D2C263510EA'
                    };

                    const response_attendance = await axios.get(`/api/GetPeriodePayrollByPerusahaanEdit/${attendance_id}`);;
                    const dataPeriodePayroll = response_attendance.data.data;

                    console.log(response_attendance);
                    
                    
                    const tempAttendance = dataPeriodePayroll.map((item: any) => {
                        return { value: item.attendance_id, label: `${item.attendance_kode}` }
                    });

                    setAttendance(tempAttendance);

                    const response_karyawan_divisi = await axios.get(`/api/KaryawanDivisiAktif`);
                    const dataKaryawanDivisi = response_karyawan_divisi.data.data;

                    console.log("KaryawanDivisiAktif", dataKaryawanDivisi);

                    const tempKaryawanDivisi = dataKaryawanDivisi.map((item:any) => {
                        return { value: item.karyawan_divisi_id, label: `${item.karyawan_divisi_nama}`}
                    });

                    setKaryawanDivisi(tempKaryawanDivisi);
                };

                set_atributte();
                    
            }, 100);
            
        }
    }, [data, form, trans_payroll_id]);

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

    };

    const GetKaryawanDivisiId = async (selectedValue:any) => {
        set_karyawan_divisi_id(selectedValue)
    }

    const handleTahunChange = (event: any) => {
        set_trans_payroll_periode_thn(event.target.value);
        
    };

    const handleBulanChange = (event: any) => {
        set_trans_payroll_periode_bln(event.target.value);
    };

    const handleSave = async ()=>{
        setLoadingSave(true);
        
        const payload = {
            trans_payroll_id:trans_payroll_id,
            perusahaan_id:'2C3AFF51-4388-4D30-8C91-2580750960FC',
            depo_id:'7B186AAD-1DC8-478B-AEEE-0D2C263510EA',
            attendance_id:attendance_id,
            trans_payroll_status:trans_payroll_status,
            trans_payroll_periode_bln:trans_payroll_periode_bln,
            trans_payroll_periode_thn:trans_payroll_periode_thn,
            trans_payroll_who_update:user().name,
            trans_payroll_tgl_update:new Date(),
            jenis_pajak:'',
            karyawan_divisi_id:karyawan_divisi_id
        }

        await axios.put(`/api/TransPayroll/${trans_payroll_id}`, payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Update successfully",type: "success"});
                    setLoadingSave(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {attendance_kode: "code"};
                setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoadingSave(false);
            });   
    }

    const handleConfirm = async ()=>{
        setLoadingConfirm(true);
        
        const payload = {
            trans_payroll_id:trans_payroll_id,
            perusahaan_id:'2C3AFF51-4388-4D30-8C91-2580750960FC',
            depo_id:'7B186AAD-1DC8-478B-AEEE-0D2C263510EA',
            attendance_id:attendance_id,
            trans_payroll_status:'Validation confirmed',
            trans_payroll_periode_bln:trans_payroll_periode_bln,
            trans_payroll_periode_thn:trans_payroll_periode_thn,
            trans_payroll_who_update:user().name,
            trans_payroll_tgl_update:new Date(),
            jenis_pajak:'',
            karyawan_divisi_id:karyawan_divisi_id
        }

        await axios.put(`/api/TransPayroll/${trans_payroll_id}`, payload)
            .then((response) => {
                if(response.status == 200){
                    setAlertDialog({title: "Success!",message: "Confirm successfully",type: "success"});
                    setLoadingConfirm(false);
                    router.back();
                }
            })
            .catch(error => {
                const errors = error.response?.data?.data;
                const convertFieldName = {attendance_kode: "code"};
                setErrorRequest(errors, form, convertFieldName);

                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoadingConfirm(false);
            });   
    }

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

    const ProsesTransPayrollDetail = useCallback(async ({ page, length, search }: any) => {

        if (selectedData) {
            const payload_payroll_detail = {
                trans_payroll_id:trans_payroll_id,
                attendance_id:selectedData,
                size:length,
                page,
                search
            };
 
            console.log("Sending to API GetPaginateSummaryTransPayrollDetailTemp ...");

            const response_payroll_detail = await axios.post("/api/GetPaginateSummaryTransPayrollDetailTemp", payload_payroll_detail);

            if (response_payroll_detail.status === 200) {
                // Tambahkan RowNum ke setiap item dalam data
                const dataWithRowNum = response_payroll_detail.data.data.map((item: any, index: number) => ({
                    ...item,
                    RowNum: (page - 1) * length + index + 1, // Hitung nomor urut
                }));

                console.log("success API GetPaginateSummaryTransPayrollDetailTemp ...");

                return {
                    data: dataWithRowNum,
                    total: response_payroll_detail.data.meta.total,
                };
            }
        }

        return { data: [], total: 0 };

    }, [selectedData, trans_payroll_id]);

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

    const ViewModalPayrollDetail = (trans_payroll_id: string, trans_payroll_detail_id: string, karyawan_id: string, karyawan_nama: string) => {
        setKaryawanId(karyawan_id);
        setKaryawanNama(karyawan_nama);
        setTransPayrollId(trans_payroll_id);
        setTransPayrollDetailId(trans_payroll_detail_id);
    
        setIsOpenDialog(true);
    }

    const ProsesPayrollTemp = async (params: any) => {
        if (isProcessing) return;

        setIsProcessing(true);
        setLoading(true);
        
        try {
            const payload = {
            trans_payroll_id,
            attendance_id,
            karyawan_divisi_id,
            pengguna_username: user().name,
            };

            console.log("Sending to API...");
            const response = await axios.post("/api/ProsesSimpanHasilHitungPayrollTemp", payload);
            console.log("API Success", response);

            setTimeout(() => {
                setReloadKey(prev => prev + 1);
            }, 500);

        } catch (err) {
            console.error("API Error", err);
        } finally {
            setIsProcessing(false);
            setLoading(false);
        }
        
    }

    return (
        <>
            {(loadingSave || loadingConfirm) && <Loading />}
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Form Pre Payroll</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="w-full md:w-1/2">
                                    <ComboboxForm className="w-full" form={form} name="attendance_id" label="Periode Payroll" combobox={Attendance} onChange={() => {
                                            const selectedValue = form.getValues('attendance_id');
                                            GetAttendance(selectedValue);
                                        }}/>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <FormInputField className="custom-field w-full" form={form} error={form.formState.errors.trans_payroll_periode_thn?.message} name="trans_payroll_periode_thn" label="Year Periode" onChange={handleTahunChange} disabled/>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <ComboboxForm className="custom-field w-full" form={form} name="trans_payroll_periode_bln" label="Month Periode" combobox={Month()} onChange={handleBulanChange} disabled/>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <FormInputField type="hidden" className="custom-field w-full" form={form} error={form.formState.errors.trans_payroll_id?.message} name="trans_payroll_id" label="" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <ComboboxForm className="custom-field w-full" form={form} name="karyawan_divisi_id" label="Karyawan Divisi" combobox={KaryawanDivisi} onChange={() => {
                                        const selectedValue = form.getValues('karyawan_divisi_id');
                                        GetKaryawanDivisiId(selectedValue);
                                    }}/>
                                </div>
                                {/* <FormInputField type="hidden" className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.trans_payroll_status?.message} name="trans_payroll_status" label="" />
                                <FormInputField type="hidden" className="custom-field w-full md:w-1/2" form={form} error={form.formState.errors.jenis_pajak?.message} name="jenis_pajak" label="" /> */}
                                <div className="w-half md:w-1/2">
                                    <Button type="button" variant="default" size="sm" onClick={ProsesPayrollTemp} disabled={loading || isProcessing}>Proses</Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <DataTable key={reloadKey} columns={columns} fetchData={ProsesTransPayrollDetail} lengthOption={10} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>Back</Button>
                                <ButtonAct type="button" className="w-fit" size="sm" text="Save" loading={loadingSave} onClick={handleSave}/>
                                <ButtonAct type="button" className="w-fit" size="sm" text="Confirm" loading={loadingConfirm} onClick={handleConfirm}/>
                                {/* <ButtonAct className="w-fit" text="Save" loading={loading} type="submit" /> */}
                            </div>
                        </form>
                    </Form>
                </div>
                {isOpenDialog && (           
                    <PayrollDetailDialog open={isOpenDialog} setOpen={setIsOpenDialog} TransPayrollId={TransPayrollId} TransPayrollDetailId={TransPayrollDetailId} KaryawanId={KaryawanId} KaryawanNama={KaryawanNama} />
                )}
            </div>
        </>
    );
}
