/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useState, useEffect, useRef, useCallback } from "react";
import { generateNewID} from "@/app/helpers/global-helper";

export function TunjanganDialog({ open, setOpen, dataTabelPayrollDetail, TransPayrollId, TransPayrollDetailId, KaryawanId}: any) {

    const { setAlertDialog } = useAlertDialog();
    const [trans_payroll_detail2_id, set_trans_payroll_detail2_id] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        setReloadKey(prev => prev + 1);
    }, []);

    const dataTabelTunjangan = useCallback(async ({ page, length, search }: any) => {

        console.log("Sending to API GetPaginateTunjangan ...");
        
        const payload = {
            size:length,
            page,
            search
        };


        const response = await axios.post("/api/GetPaginateTunjangan", payload);

        if (response.status === 200) {
            // Tambahkan RowNum ke setiap item dalam data
            const dataWithRowNum = response.data.data.map((item: any, index: number) => ({
                ...item,
                RowNum: (page - 1) * length + index + 1, // Hitung nomor urut
            }));

            console.log("success API GetPaginateTunjangan ...");
            
            
            const dataTableTunjangan = dataWithRowNum.map((item:any, index:number) => ({
                ...item,
                is_disabled: dataTabelPayrollDetail.filter((value: any) => value.trans_payroll_detail_id === TransPayrollDetailId && value.tunjangan_id === item.tunjangan_id)
            }))

            console.log("TransPayrollDetailId", TransPayrollDetailId);
            console.log("dataTableTunjangan", dataTableTunjangan);
            console.log("dataTabelPayrollDetail", dataTabelPayrollDetail);

            return {
                data: dataTableTunjangan,
                total: dataTableTunjangan.length,
            };
        }

        return { data: [], total: 0 };

    }, []);

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
            accessorKey: "tunjangan_kode",
            alias: "Code",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Code" />
            ),
        },
        {
            accessorKey: "tunjangan_nama",
            alias: "Name",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "tunjangan_jenistunjangan",
            alias: "Type",
            size: 150,
            header: ({ column }: { column: any }) => (
                <DataTableColumnHeader column={column} title="Type" />
            ),
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
            id: "actions",
            alias: "Actions",
            header: "Actions",
            size: 70,
            cell: ({ row }: { row: any }) => {
                const item = row.original;
                const is_disabled = row.original.is_disabled;
                
                return (
                    <div className="flex space-x-2">
                        <Button type="button" variant="warning" size="sm" onClick={() => setChooseTunjangan(item)} disabled={is_disabled.length > 0}>
                            <ClipboardPaste />
                        </Button>
                    </div>
                );
            },
        },
    ];
    
    const setChooseTunjangan = (row: any) => {

        if(dataTabelPayrollDetail !== undefined || dataTabelPayrollDetail.length > 0){
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
                        
                        setReloadKey(prev => prev + 1);

                        handleClose();
    
                    }
                    
                }, 100);
                
            } else {
                setAlertDialog({title: "Warning!",message: "Data already exist in the list", type: "warning"});
            }

        }else{
            setAlertDialog({title: "Error!",message: "dataTabelPayrollDetail is undefined", type: "error"});
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
                        <DataTable key={reloadKey} columns={columns} fetchData={dataTabelTunjangan} lengthOption={10} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
