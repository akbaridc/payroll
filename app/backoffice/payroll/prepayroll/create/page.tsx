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
import { useState, useEffect, useRef, useCallback } from "react";
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
import {
    // Navigasi / Arah
    Home,
    Menu,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ArrowRight,
    ArrowLeft,
  
    // Tindakan (CRUD)
    Plus,
    Minus,
    Edit,
    Pencil,
    Trash,
    Save,
    X,
    Check,
    ClipboardCopy,
    ClipboardPaste,
  
    // Status / Notifikasi
    Bell,
    AlertCircle,
    Info,
    HelpCircle,
    Loader,
    Circle,
    CircleCheck,
    CircleX,
  
    // Input & Form
    Eye,
    EyeOff,
    Search,
    Filter,
    Upload,
    Download,
  
    // Data & UI
    Table,
    List,
    FileText,
    Calendar,
    Clock,
    Tag,
    Star,
  
    // User & Setting
    User,
    Users,
    Settings,
    LogOut,
    Lock,
    Key,
  
    // Icon Khusus (Opsional)
    Globe,
    Database,
    Server,
    Building2
  } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { count } from "console";
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import { PayrollDetailDialog } from "../components/dialog/payroll-detail-dialog";
import { Loading } from "@/components/utils/loading";
import { log } from "util";

const NProgress = require("nprogress");
import "nprogress/nprogress.css";

export default function PrePayrollCreate() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();
    const [Attendance, setAttendance] = useState([]);
    const [KaryawanDivisi, setKaryawanDivisi] = useState([]);
    const [trans_payroll_id, set_trans_payroll_id] = useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [KaryawanId, setKaryawanId] = useState("");
    const [KaryawanNama, setKaryawanNama] = useState("");
    const [TransPayrollDetailId, setTransPayrollDetailId] = useState("");
    const { register, watch } = useForm();
    const [attendance_id, set_attendance_id] = useState('');
    const [karyawan_divisi_id, set_karyawan_divisi_id] = useState('');
    const [trans_payroll_periode_bln, set_trans_payroll_periode_bln] = useState('');
    const [trans_payroll_periode_thn, set_trans_payroll_periode_thn] = useState('');
    const [reloadKey, setReloadKey] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTahunChange = (event: any) => {
        set_trans_payroll_periode_thn(event.target.value);
        
    };

    const handleBulanChange = (event: any) => {
        set_trans_payroll_periode_bln(event.target.value);
    };
    

    const GetKaryawanDivisiId = async (selectedValue:any) => {
        set_karyawan_divisi_id(selectedValue)
    }

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
            jenis_pajak:'',
            karyawan_divisi_id:karyawan_divisi_id
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

    const set_newid = async (): Promise<string> => {
        try {
            const new_id = await generateNewID();
            return new_id ?? ""; // fallback jika null
        } catch {
            return "";
        }
    };

    const getKaryawanDivisi = async () => {
        try {
            const res = await axios.get(`/api/KaryawanDivisiAktif`);
            return res.data.data.map((item: any) => ({
                value: item.karyawan_divisi_id,
                label: `${item.karyawan_divisi_nama}`,
            }));
        } catch {
            return [];
        }
    };

    const getAttendance = async () => {
        try {
            const payload_attendance = {
                perusahaan_id: '2C3AFF51-4388-4D30-8C91-2580750960FC',
                depo_id: '7B186AAD-1DC8-478B-AEEE-0D2C263510EA'
            };

            const res = await axios.get(`/api/GetPeriodePayrollByPerusahaan`, {
                params: payload_attendance
            });

            return res.data.data.map((item: any) => ({
                value: item.attendance_id,
                label: `${item.attendance_kode}`,
            }));
        } catch {
            return [];
        }
    };

    useEffect(() => {
        (async () => {
          NProgress.start(); // mulai progress bar
    
          const attendanceData = await getAttendance();
          const divisiData = await getKaryawanDivisi();
          const NewID = await set_newid();
    
          setKaryawanDivisi(divisiData);
          setAttendance(attendanceData);
          set_trans_payroll_id(NewID);

          console.log("attendanceData",attendanceData);
          console.log("divisiData",divisiData);

          setLoading(false);
          NProgress.done(); // hentikan progress bar
        })();
    }, []);

    const ProsesTransPayrollDetail = useCallback(
        async ({ page, length, search }: any) => {
        try {
            NProgress.start(); // progress saat load tabel

            if(trans_payroll_id !== "" && attendance_id !== ""){
                const payload = { trans_payroll_id, attendance_id: attendance_id, size: length, page, search };
                const res = await axios.post("/api/GetPaginateSummaryTransPayrollDetailTemp", payload);

                if (res.status === 200) {
                    const dataWithRowNum = res.data.data.map((item: any, index: number) => ({
                    ...item,
                    RowNum: (page - 1) * length + index + 1,
                }));
                    return { data: dataWithRowNum, total: res.data.meta.total };
                }

            }else{
                return { data: [], total: 0 };
            }
        } finally {
            NProgress.done();
        }
            return { data: [], total: 0 };
        },
        [attendance_id, trans_payroll_id]
    );

    const columns = [
        { accessorKey: "RowNum", alias: "No", size: 150, header: ({ column }: any) => <DataTableColumnHeader column={column} title="No" /> },
        { accessorKey: "karyawan_nama", alias: "Employee", size: 150, header: ({ column }: any) => <DataTableColumnHeader column={column} title="Employee" /> },
        { accessorKey: "divisi", alias: "Divisi", size: 150, header: ({ column }: any) => <DataTableColumnHeader column={column} title="Divisi" /> },
        { accessorKey: "karyawan_level_nama", alias: "Level", size: 150, header: ({ column }: any) => <DataTableColumnHeader column={column} title="Level" /> },
        {
        accessorKey: "penghasilanbruto",
        alias: "Nett Amount",
        size: 150,
        header: ({ column }: any) => <DataTableColumnHeader column={column} title="Nett Amount" />,
        cell: ({ row }: any) => formatCurrency(row.original.penghasilanbruto),
        },
        { accessorKey: "trans_payroll_detail_keterangan", alias: "Remark", size: 150, header: ({ column }: any) => <DataTableColumnHeader column={column} title="Remark" /> },
        { accessorKey: "trans_payroll_status", alias: "Status", size: 150, header: ({ column }: any) => <DataTableColumnHeader column={column} title="Status" /> },
        {
        id: "actions",
        alias: "Actions",
        header: "Actions",
        size: 70,
        cell: ({ row }: any) => (
            <div className="flex space-x-2">
            <Button type="button" variant="warning" size="sm" onClick={() => ViewModalPayrollDetail(row.original.trans_payroll_id, row.original.trans_payroll_detail_id, row.original.karyawan_id, row.original.karyawan_nama)}>
                <Pencil className="h-4 w-4" />
            </Button>
            </div>
        ),
        },
    ];

    const ViewModalPayrollDetail = (trans_payroll_id: string, trans_payroll_detail_id: string, karyawan_id: string, karyawan_nama: string) => {
        setKaryawanId(karyawan_id);
        setKaryawanNama(karyawan_nama);
        set_trans_payroll_id(trans_payroll_id);
        setTransPayrollDetailId(trans_payroll_detail_id);

        console.log("trans_payroll_detail_id",trans_payroll_detail_id);
        
    
        setIsOpenDialog(true);
    }

    const form = useForm({
        resolver: zodResolver(
            z.object({
                trans_payroll_id: z.string().min(1, "Trans Payroll ID is required"),
                attendance_id: z.string().min(1, "Periode Payroll is required"),
                karyawan_divisi_id: z.string().min(1, "Karyawan Divisi is required"),
                trans_payroll_periode_thn: z.string().min(1, "Year periode is required"),
                trans_payroll_periode_bln: z.string().min(1, "Month periode is required"),
            }),
        ),
        defaultValues: {trans_payroll_id:"",attendance_id:"",karyawan_divisi_id:"",trans_payroll_periode_thn:"",trans_payroll_periode_bln:""},
    });

    const GetSelectedAttendance = async (selectedValue: any) => {
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

        console.log("attendance_id_new",attendance_id_new);
        

    };

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
            {loading && <Loading />}
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Create Pre Payroll</h1>
                <div className="p-3 shadow-md rounded-md border border-foreground">
                    <Form {...form}>
                        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="w-full md:w-1/2">
                                    <ComboboxForm className="w-full" form={form} name="attendance_id" label="Periode Payroll" combobox={Attendance} onChange={() => {
                                            const selectedValue = form.getValues('attendance_id');
                                            GetSelectedAttendance(selectedValue);
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
                                <Button type="button" variant="default" size="sm" onClick={handleSave}>Save</Button>
                                {/* <ButtonAct className="w-fit" text="Save" loading={loading} type="submit" /> */}
                            </div>
                        </form>
                    </Form>
                </div>

                {isOpenDialog && (           
                    <PayrollDetailDialog open={isOpenDialog} setOpen={setIsOpenDialog} TransPayrollId={trans_payroll_id} TransPayrollDetailId={TransPayrollDetailId} KaryawanId={KaryawanId} KaryawanNama={KaryawanNama} />
                )}
            </div>
        </>
    );
}
