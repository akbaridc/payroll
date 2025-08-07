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
import { TunjanganDialog } from "./tunjangan-dialog";
import { formatCurrency, unformatCurrency } from "@/app/helpers/global-helper";
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
import { Loading } from "@/components/utils/loading";

export function PayrollDetailDialog({ open, setOpen, TransPayrollId, TransPayrollDetailId, KaryawanId, KaryawanNama }: any) {

    type PayrollDetail = {
        karyawan_id: string;
        trans_payroll_detail2_id: string;
        trans_payroll_detail_id: string;
        trans_payroll_id:String;
        tunjangan_id: string;
        tunjangan_kode: string;
        tunjangan_nama: string;
        trans_payroll_detail2_multiplier: number;
        trans_payroll_detail2_value: number;
        trans_payroll_detail2_totalvalue: number;
        trans_payroll_detail2_urut: number;
        trans_payroll_detail2_autogen: number;
        tunjangan_flag_pph: number;
    }

    const [dataTabelPayrollDetail, setDataTabelPayrollDetail] = useState<PayrollDetail[]>([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    
    
    const filter_trans_payroll_detail_id_detail2_ref = useRef<string | null>(null);
    const filter_karyawan_id_detail2_ref = useRef<string | null>(null);
    const filter_karyawan_nama_detail2_ref = useRef<string | null>(null);

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

            const response = await axios.post("/api/GetTransPayrollDetail2TempByTransPayrollDetailId", payload);

            if(response.data !== ""){
                setDataTabelPayrollDetail(response.data.data);
            } else if (response.data.length === 0 && dataTabelPayrollDetail.length > 0) {
                setDataTabelPayrollDetail(dataTabelPayrollDetail);
                console.log("dataTabelPayrollDetail fetchData", dataTabelPayrollDetail);
            }else{
                setDataTabelPayrollDetail([]);
            }
            
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
    }, [open, TransPayrollDetailId, KaryawanId, KaryawanNama, form, fetchData]);

    const handleInputChange = (event: any) => {
        
        const { name, value } = event.target;
        let newDataTabelPayrollDetail = [];
        newDataTabelPayrollDetail = dataTabelPayrollDetail.map((item: any) => {
            if (item.trans_payroll_detail2_id === event.target.dataset.id) {
                const newItem = { ...item, [name]: value };
                if (name === 'trans_payroll_detail2_multiplier' || name === 'trans_payroll_detail2_value') {
                    
                    newItem.trans_payroll_detail2_multiplier = unformatCurrency(newItem.trans_payroll_detail2_multiplier);
                    newItem.trans_payroll_detail2_value = unformatCurrency(newItem.trans_payroll_detail2_value);
                    newItem.trans_payroll_detail2_totalvalue = unformatCurrency(newItem.trans_payroll_detail2_multiplier) * unformatCurrency(newItem.trans_payroll_detail2_value);
                }
                return newItem;
            }
            return item;
        });

        setDataTabelPayrollDetail(newDataTabelPayrollDetail);
    };

    const setFormatCurrency = (event: any) => {
        const nilai = formatCurrency(event.target.value);
        return nilai;
    };

    const handleClose = () => {
        setOpen(false);
        setDataTabelPayrollDetail([]);
    };

    const deletePayrollDetail = (row: any) => {
        const newDataTabelPayrollDetail = dataTabelPayrollDetail.filter((value) => value.trans_payroll_detail2_id !== row.trans_payroll_detail2_id);
        setDataTabelPayrollDetail(newDataTabelPayrollDetail);
    };

    const handleSave = async ()=>{
        setLoading(true)
        const payload = {
            trans_payroll_id:TransPayrollId,
            trans_payroll_detail_id:TransPayrollDetailId,
            dataTabelPayrollDetail
        };

        const response = await axios.post("/api/InsertTransPayrollDetail2Temp", payload);
        console.log(response);

        setLoading(false);
        setOpen(false);
        setDataTabelPayrollDetail([]);
        
    }

    const ViewModalTunjangan = () => {
        setIsOpenDialog(true);

        console.log("TransPayrollDetailId ViewModalTunjangan", TransPayrollDetailId);
    }

    return (
        <>
            {loading && <Loading />}
            <div>
                <Dialog open={open} onOpenChange={handleClose}>
                    <DialogContent className="sm:max-w-[90%] flex flex-col max-h-[90vh]">
                        <DialogHeader className="sticky top-0 bg-background z-10 p-4 border-b">
                            <DialogTitle>Form Payroll Detail</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="container mx-auto">
                                <Form {...form}>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                            <FormInputField className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 disabled:bg-gray-800 disabled:text-white" name="filter_karyawan_nama_detail2" label="" disabled />
                                            <FormInputField  type="hidden" className="custom-field w-full md:w-1/2" name="filter_karyawan_id_detail2" label="Employee Id" />
                                            <FormInputField type="hidden" className="custom-field w-full md:w-1/2" name="filter_trans_payroll_detail_id_detail2" label="Employee Id" />
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => ViewModalTunjangan()}> Add Allowance</button>
                                        </div>
                                    </div>
                                    <table className="table-auto w-full mb-6 text-white border border-gray-700">
                                        <thead className="bg-gray-800 text-white border-b border-gray-600">
                                            <tr>
                                            <th className="px-4 py-2 text-left">No</th>
                                            <th className="px-4 py-2 text-left">Allowance</th>
                                            <th className="px-4 py-2 text-left">Multiplier</th>
                                            <th className="px-4 py-2 text-left">Amount</th>
                                            <th className="px-4 py-2 text-left">Total Amount</th>
                                            <th className="px-4 py-2 text-left">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-900 divide-y divide-gray-700">
                                            {dataTabelPayrollDetail && (
                                                dataTabelPayrollDetail.map((item, index) => (
                                                    <tr key={item.trans_payroll_detail2_id}>
                                                        <td className="px-4 py-2">{index + 1}</td>
                                                        <td className="px-4 py-2">{item.tunjangan_nama}</td>
                                                        <td className="px-4 py-2">
                                                            <FormInputField className="w-full p-2 border border-gray-300 rounded" name="trans_payroll_detail2_multiplier" value={formatCurrency(item.trans_payroll_detail2_multiplier)} label="" data-id={item.trans_payroll_detail2_id} onChange={handleInputChange} onInput={setFormatCurrency} />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <FormInputField className="w-full p-2 border border-gray-300 rounded" name="trans_payroll_detail2_value" value={formatCurrency(item.trans_payroll_detail2_value)} label="" data-id={item.trans_payroll_detail2_id} onChange={handleInputChange} onInput={setFormatCurrency} />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <FormInputField className="w-full p-2 border border-gray-300 rounded" name="trans_payroll_detail2_totalvalue" value={formatCurrency(item.trans_payroll_detail2_totalvalue)} label="" data-id={item.trans_payroll_detail2_id} onChange={handleInputChange} disabled />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                        {item.trans_payroll_detail2_autogen !== 1 && (
                                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePayrollDetail(item)}>
                                                                <Trash />
                                                            </button>
                                                        )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </Form>
                            </div>
                        </div>
                        <DialogFooter>
                            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow" onClick={handleClose}><X className="w-4 h-4" /> Close</button>
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow" onClick={handleSave}><Save className="w-4 h-4" /> Save</button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {isOpenDialog && (
                    <TunjanganDialog open={isOpenDialog} setOpen={setIsOpenDialog} dataTabelPayrollDetail={dataTabelPayrollDetail} TransPayrollId={TransPayrollId} TransPayrollDetailId={TransPayrollDetailId} KaryawanId={KaryawanId} />
                )}
                
                
            </div>
        </>
    )
}
