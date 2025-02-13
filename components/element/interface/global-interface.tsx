import { type LucideIcon } from "lucide-react";

export interface LoginInterface {
    email: string;
    password: string;
}

export interface SidebarItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
            icon?: LucideIcon;
            isActive?: boolean;
            items?: {
                title: string;
                url: string;
                icon?: LucideIcon;
                isActive?: boolean;
                items?: {
                    title: string;
                    url: string;
                    icon?: LucideIcon;
                    isActive?: boolean;
                    items?: {
                        title: string;
                        url: string;
                        icon?: LucideIcon;
                        isActive?: boolean;
                    }[];
                }[];
            }[];
        }[];
    }[];
}

export interface Employee {
    name: string;
    ktp: string;
    phone: string;
    email: string;
    born: string;
    date_birth: string;
    gender: string;
    religion: string;
}

export interface ComboBox {
    label: string;
    value: string | number;
}

export interface RadioBox {
    label: string;
    value: string;
}

export interface InterfaceDivisionForm {
    code: string;
    name: string;
    active: boolean;
}

export interface InterfaceLevelForm {
    code: string;
    name: string;
    divisi: string;
    active: boolean;
}

export interface InterfacePeriodePayrollForm {
    attendance_kode: string;
    attendance_tgl_awal: string;
    attendance_tgl_akhir: string;
    attendance_periode_thn: string;
    attendance_periode_bln: string;
    attendance_is_aktif: boolean;
}

export interface InterfacePrePayrollForm {
    trans_payroll_id: string;
    attendance_id: string;
    trans_payroll_periode_thn: string;
    trans_payroll_periode_bln: string;
}
