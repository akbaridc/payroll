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
