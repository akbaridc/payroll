"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import StepWizard from "@/components/form/step-wizard";
import Personal from "./components/personal/personal";
import {
    PersonalValidation,
    PersonalDefault,
} from "./components/personal/schema";

import Employee from "./components/employee/employee";
import {
    EmployeeValidation,
    EmployeeDefault,
} from "./components/employee/schema";

import Payroll from "./components/payroll/payroll";
import { PayrollValidation, PayrollDefault } from "./components/payroll/schema";

import Family from "./components/family/family";
import { FamilyValidation, FamilyDefault } from "./components/family/schema";

import Residence from "./components/residence/residence";
import {
    ResidenceValidation,
    ResidenceDefault,
} from "./components/residence/schema";

// import Other from "./components/other/other";
// import { OtherValidation, OtherDefault } from "./components/other/schema";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

export default function EmployeeCreate() {
    const { setAlertDialog } = useAlertDialog();

    const schema = z.object({
        personal: z.object(PersonalValidation()),
        employee: z.object(EmployeeValidation()),
        payroll: z.object(PayrollValidation()),
        family: FamilyValidation(),
        residence: z.object(ResidenceValidation()),
        // other: z.object(OtherValidation()),
    });

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            personal: PersonalDefault(),
            employee: EmployeeDefault(),
            payroll: PayrollDefault(),
            family: FamilyDefault(),
            residence: ResidenceDefault(),
            // other: OtherDefault(),
        },
    });

    const steps = [
        { id: 1, title: "Personal", form: "personal", content: <Personal methods={methods} /> },
        { id: 2, title: "Employee", form: "employee", content: <Employee methods={methods} /> },
        { id: 3, title: "Payroll", form: "payroll", content: <Payroll methods={methods} /> },
        { id: 4, title: "Family", form: "family", content: <Family methods={methods} /> },
        { id: 5, title: "Employee Residence", form: "residence", content: <Residence methods={methods} /> },
        // { id: 6, title: "Other Data", form: "other", content: <Other methods={methods} /> },
    ];

    async function onSubmit(value: any): Promise<boolean> {
        try {
            const formSchema = Object.keys(value)[0];

            let message = "";
            const existingData = JSON.parse(localStorage.getItem("employee")) ?? {};
            let payloadLocalStorage = {};
            let payloadLocalStorageFamily = [];
            let payloadLocalStorageAddress = {};

            if (formSchema == "personal") {
                payloadLocalStorage = {
                    ...payloadLocalStorage,
                    karyawan_nama: value.personal.name,
                    karyawan_nik: value.personal.ktp,
                    karyawan_telepon: value.personal.phone,
                    karyawan_email: value.personal.email,
                    karyawan_tempat_lahir: value.personal.place_birth,
                    karyawan_tanggal_lahir: new Date(value.personal.date_birth).toISOString().slice(0, 10),
                    karyawan_jenis_kelamin: value.personal.gender,
                    karyawan_agama: value.personal.religion,
                }

                message = "Personal data has been save successfully";
            }
            if (formSchema == "employee") {
                payloadLocalStorage = {
                    ...existingData,
                    karyawan_nip: value.employee.nip,
                    perusahaan_id: value.employee.company,
                    karyawan_divisi_id: value.employee.divisi,
                    karyawan_level_id: value.employee.level,
                    // karyawan_tempat_lahir: value.employee.frase,
                    karyawan_supervisor_id: value.employee.direct_supervisor,
                    karyawan_is_aktif: value.employee.status,
                    karyawan_tgl_aktif: new Date(value.employee.join_date).toISOString().slice(0, 10),
                    karyawan_is_resign: value.employee.resign,
                }

                message = "Employee data has been save successfully";
            }
            if (formSchema == "payroll") {
                payloadLocalStorage = {
                    ...existingData,
                    kategori_ptkp_id: value.payroll.category_employee,
                    karyawan_basic_salary: value.payroll.salary,
                    karyawan_basic_bpjs: value.payroll.bpjs,
                    karyawan_bank: value.payroll.bank,
                    karyawan_no_rek: value.payroll.acc_number,
                    karyawan_nama_rek: value.payroll.acc_name,
                    karyawan_npwp15: value.payroll.npwp15,
                    karyawan_npwp16: value.payroll.npwp16,
                    // karyawan_is_aktif: value.payroll.ptpk,
                    karyawan_beginning_netto: value.payroll.netto,
                    karyawan_pph21paid: value.payroll.pph21,
                    karyawan_metodetax: value.payroll.tax,
                    karyawan_jenispajak: value.payroll.type_tax,
                    // karyawan_is_aktif: value.payroll.obligation,
                }

                message = "Payroll data has been save successfully";
            }
            if (formSchema == "family") {
                payloadLocalStorageFamily = value.family.map((item: any) => {
                    return {
                        karyawan_keluarga_nama: item.name,
                        karyawan_keluarga_tanggal_lahir: item.date_birth,
                        karyawan_keluarga_hub_keluarga: item.relationship,
                        karyawan_keluarga_jenis_kelamin: item.gender,
                        karyawan_keluarga_agama: item.religion,
                        karyawan_keluarga_pendidikan: 'SMA',
                        karyawan_keluarga_is_aktif: 1,
                    }
                });

                message = "Family data has been save successfully";
            }
            if (formSchema == "residence") {
                payloadLocalStorageAddress = {
                    karyawan_detail_judul_alamat: value.residence.fictive_address,
                    karyawan_detail_alamat: value.residence.address,
                    karyawan_detail_propinsi: value.residence.province,
                    karyawan_detail_kota: value.residence.city,
                    karyawan_detail_kecamatan: value.residence.district,
                    karyawan_detail_kelurahan: value.residence.ward,
                    karyawan_detail_kodepos: value.residence.postal_code,
                    karyawan_detail_phone: value.residence.contact,
                    karyawan_detail_is_deleted: 0,
                    karyawan_detail_is_aktif: 1,
                }

                message = "Employee Residence data has been save successfully";
            }

            localStorage.setItem("employee",JSON.stringify(payloadLocalStorage));
            if(payloadLocalStorageFamily.length > 0) {
                localStorage.setItem("employee-family",JSON.stringify(payloadLocalStorageFamily));
            }
            if(Object.keys(payloadLocalStorageAddress).length > 0) {
                localStorage.setItem("employee-address",JSON.stringify(payloadLocalStorageAddress));
            }

            setAlertDialog({
                title: "Success!",
                message: message,
                type: "success",
            });

            if(formSchema == "residence"){
                //post ke api dan redirect ke halaman awal
                const employee = localStorage.getItem("employee");
                const employeeFamily = localStorage.getItem("employee");
                const employeeAddress = localStorage.getItem("employee");

                console.log({
                    employee,
                    employeeFamily,
                    employeeAddress,
                })

                return false;
            }

            return true;
        } catch (error) {
            console.log(error);
            setAlertDialog({
                title: "Error!",
                message: "Something went wrong.",
                type: "error",
            });
            return false;
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Employee Create</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <StepWizard
                            steps={steps}
                            methods={methods}
                            onSubmit={onSubmit}
                        />
                    </form>
                </Form>
            </div>
        </div>
    );
}
