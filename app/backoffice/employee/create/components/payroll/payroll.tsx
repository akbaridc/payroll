/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInputField } from "@/components/form/field-input";
import { ComboboxForm } from "@/components/form/combobox";
import { StatusEmployees } from "@/app/resources/static-option-value";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus, ClipboardPaste, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { generateNewID, setErrorRequest, formatCurrency, unformatCurrency } from "@/app/helpers/global-helper";


const Payroll = ({ methods }: { methods: any }) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();
    const [Payroll, setPayroll] = useState([]);
    const [KategoriPTKP, setKategoriPTKP] = useState<any[]>([]);
    const [Bank, setBank] = useState<any[]>([]);
    const [selectedData, setSelectedData] = useState("");
    const [trans_payroll_id, set_trans_payroll_id] = useState(null);
    const [jenisbank_kode, set_jenisbank_kode] = useState('');
    const [divisi_id, set_divisi_id] = useState('');

    useEffect(() => {

        const set_bank = async () => {

            const response = await axios.get(`/api/BankAktif`);
            const dataBank = response.data.data;

            console.log(dataBank);

            const data_temp = [
                { value: "", label: "Select Bank" },
                ...dataBank.map((item: any) => {
                    return { value: item.jenisbank_kode, label: `${item.jenisbank_kode} - ${item.jenisbank_nama}` }
                }),
            ];

            setBank(data_temp);
        };

        // const set_kategori_ptkp = async () => {

        //     const response = await axios.get(`/api/BankAktif`);
        //     const dataKategoriPTKP = response.data.data;

        //     console.log(dataKategoriPTKP);

        //     const data_temp = [
        //         { value: "", label: "Select PTKP Category" },
        //         ...dataKategoriPTKP.map((item: any) => {
        //             return { value: item.kategori_ptkp_id, label: `${item.kategori_ptkp_nama}` }
        //         }),
        //     ];

        //     setKategoriPTKP(data_temp);
        // };

        set_bank();
        // set_kategori_ptkp();

    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComboboxForm className="custom-field" form={methods} name="payroll.category_employee" label="Category Employee" combobox={StatusEmployees()} />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.salary" label="Basic Salary (Days)" onInput={(e: any) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))} />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.bpjs" label="Basic BPJS" onInput={(e: any) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}/>
            <ComboboxForm className="custom-field" form={methods} name="payroll.bank" label="Bank" combobox={Bank} />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.acc_number" label="Account Number" />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.acc_name" label="Account Name" />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.npwp15" label="NPWP (15 Digit)" />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.npwp16" label="NPWP (16 Digit)" />
            <ComboboxForm className="custom-field" form={methods} name="payroll.ptpk" label="Category PTKP" combobox={[]} />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.netto" label="Beginning Netto" />
            <FormInputField className="custom-field w-full" form={methods} name="payroll.pph21" label="PPH 221 Pay" />
            <ComboboxForm className="custom-field" form={methods} name="payroll.tax" label="Tax Method" combobox={[]} />
            <ComboboxForm className="custom-field" form={methods} name="payroll.type_tax" label="Type of Tax" combobox={[]} />
            <ComboboxForm className="custom-field" form={methods} name="payroll.obligation" label="Status Obligation" combobox={[]} />
        </div>
    );
};

export default Payroll;
