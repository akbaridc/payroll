"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import axios from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { setErrorRequest, formatCurrency, user } from "@/app/helpers/global-helper";
import { FormInputField } from "@/components/form/field-input";
import { Button } from "@/components/ui/button";
import { ComboboxForm } from "@/components/form/combobox";
import { Month } from "@/app/resources/static-option-value";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { PayrollDetailDialog } from "@/app/backoffice/payroll/prepayroll/components/dialog/payroll-detail-dialog-detail";
import { ButtonAct } from "@/components/form/button";
import { Loading } from "@/components/utils/loading";
import { Skeleton } from "@/components/ui/skeleton";

const NProgress = require("nprogress");
import "nprogress/nprogress.css";

type Payroll = {
  trans_payroll_id: string;
  attendance_id: string;
  trans_payroll_periode_thn: string;
  trans_payroll_periode_bln: string;
  trans_payroll_status: string;
  karyawan_divisi_id: string;
};

export default function TransPayrollEdit() {
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const { setAlertDialog } = useAlertDialog();

  const [selectedData, setSelectedData] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [KaryawanId, setKaryawanId] = useState("");
  const [KaryawanNama, setKaryawanNama] = useState("");
  const [TransPayrollId, setTransPayrollId] = useState("");
  const [TransPayrollDetailId, setTransPayrollDetailId] = useState("");

  const [attendance_id, set_attendance_id] = useState("");
  const [trans_payroll_periode_bln, set_trans_payroll_periode_bln] = useState("");
  const [trans_payroll_periode_thn, set_trans_payroll_periode_thn] = useState("");
  const [trans_payroll_status, set_trans_payroll_status] = useState("");
  const [karyawan_divisi_id, set_karyawan_divisi_id] = useState("");

  const [KaryawanDivisi, setKaryawanDivisi] = useState([]);
  const [Attendance, setAttendance] = useState([]);

  const { trans_payroll_id } = useParams();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        trans_payroll_id: z.string().min(1, "Trans Payroll ID is required"),
        attendance_id: z.string().min(1, "Periode Payroll is required"),
        trans_payroll_periode_thn: z.string().min(1, "Year periode is required"),
        trans_payroll_periode_bln: z.string().min(1, "Month periode is required"),
        trans_payroll_status: z.string().min(1, "Status is required"),
        karyawan_divisi_id: z.string().min(1, "Karyawan Divisi is required"),
      })
    ),
    defaultValues: {
      trans_payroll_id: "",
      attendance_id: "",
      trans_payroll_periode_thn: "",
      trans_payroll_periode_bln: "",
      trans_payroll_status: "",
      karyawan_divisi_id: "",
    },
  });

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

  const getPayroll = async (): Promise<Payroll | null> => {
  try {
    const res = await axios.get(`/api/TransPayroll/${trans_payroll_id}`);
    return res.data.data ?? null;
  } catch (error) {
    console.error("getPayroll error", error);
    return null;
  }
};

  const getAttendance = async (attId: string) => {
    try {
      const res = await axios.get(`/api/GetPeriodePayrollByPerusahaanEdit/${attId}`);
      return res.data.data.map((item: any) => ({
        value: item.attendance_id,
        label: `${item.attendance_kode}`,
      }));
    } catch {
      return [];
    }
  };

  NProgress.configure({ showSpinner: false, speed: 500 });

  // Load data awal
  useEffect(() => {
    (async () => {
      NProgress.start(); // mulai progress bar

      const payrollData = await getPayroll();
      const divisiData = await getKaryawanDivisi();

      setKaryawanDivisi(divisiData);

      console.log("payrollData",payrollData);
      console.log("divisiData",divisiData);
      
      if (payrollData) {
        
        const {
            trans_payroll_id,
            attendance_id,
            trans_payroll_periode_thn,
            trans_payroll_periode_bln,
            trans_payroll_status,
            karyawan_divisi_id
        } = payrollData;

        // Set form & state
        form.setValue("trans_payroll_id", trans_payroll_id);
        form.setValue("attendance_id", attendance_id);
        form.setValue("trans_payroll_periode_thn", trans_payroll_periode_thn);
        form.setValue("trans_payroll_periode_bln", trans_payroll_periode_bln);
        form.setValue("trans_payroll_status", trans_payroll_status);
        form.setValue("karyawan_divisi_id", karyawan_divisi_id);

        set_attendance_id(attendance_id);
        set_trans_payroll_status(trans_payroll_status);
        set_trans_payroll_periode_thn(trans_payroll_periode_thn);
        set_trans_payroll_periode_bln(trans_payroll_periode_bln);
        set_karyawan_divisi_id(karyawan_divisi_id);

        const [attData] = await Promise.all([
          getAttendance(attendance_id),
        ]);

        setAttendance(attData);

      } else {
        // Handle jika data kosong
        setAlertDialog({
            title: "Data Tidak Ditemukan",
            message: "Data payroll tidak tersedia untuk ID ini.",
            type: "warning",
        });
        setLoadingPage(false);
        NProgress.done();
        return;
      }

      console.log("payrollData",payrollData);
      console.log("attendance",Attendance);
      
      setLoadingPage(false);
      NProgress.done(); // hentikan progress bar
    })();
  }, [trans_payroll_id]);

  const ProsesTransPayrollDetail = useCallback(
    async ({ page, length, search }: any) => {
      try {
        NProgress.start(); // progress saat load tabel
        const payload = { trans_payroll_id, attendance_id: selectedData, size: length, page, search };
        const res = await axios.post("/api/GetPaginateSummaryTransPayrollDetail", payload);
        if (res.status === 200) {
          const dataWithRowNum = res.data.data.map((item: any, index: number) => ({
            ...item,
            RowNum: (page - 1) * length + index + 1,
          }));
          return { data: dataWithRowNum, total: res.data.meta.total };
        }
      } finally {
        NProgress.done();
      }
      return { data: [], total: 0 };
    },
    [selectedData, trans_payroll_id]
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
    setTransPayrollId(trans_payroll_id);
    setTransPayrollDetailId(trans_payroll_detail_id);
    setIsOpenDialog(true);
  };

  return (
    <>
      {(loadingSave || loadingConfirm) && <Loading />}
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Form Pre Payroll</h1>
        <div className="p-3 shadow-md rounded-md border border-foreground">
          {loadingPage ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-[300px] w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form className="space-y-8">
                <div className="grid grid-cols-1 gap-4">
                  <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="attendance_id" label="Periode Payroll" combobox={Attendance} disabled />
                  <FormInputField className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_periode_thn" label="Year Periode" disabled />
                  <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_periode_bln" label="Month Periode" combobox={Month()} disabled />
                  <ComboboxForm className="custom-field w-full md:w-1/2" form={form} name="karyawan_divisi_id" label="Karyawan Divisi" combobox={KaryawanDivisi} disabled />
                  <FormInputField type="hidden" form={form} name="trans_payroll_id" label="" />
                  <FormInputField className="custom-field w-full md:w-1/2" form={form} name="trans_payroll_status" label="Status" disabled />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <DataTable columns={columns} fetchData={ProsesTransPayrollDetail} lengthOption={5} />
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
        <PayrollDetailDialog open={isOpenDialog} setOpen={setIsOpenDialog} TransPayrollId={TransPayrollId} TransPayrollDetailId={TransPayrollDetailId} KaryawanId={KaryawanId} KaryawanNama={KaryawanNama} />
      </div>
    </>
  );
}
