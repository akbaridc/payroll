/* eslint-disable @typescript-eslint/no-explicit-any */
import provinces from "@/app/resources/region-json/provinces.json";
import cities from "@/app/resources/region-json/cities.json";
import districts from "@/app/resources/region-json/districts.json";
import wards from "@/app/resources/region-json/wards.json";

const Genders = () => {
    return [
        { label: "Male", value: "0" },
        { label: "Female", value: "1" },
    ];
};

const Religions = () => {
    return [
        { label: "Islam", value: "Islam" },
        { label: "Protestan", value: "Protestan" },
        { label: "Katolik", value: "Katolik" },
        { label: "Hindu", value: "Hindu" },
        { label: "Buddha", value: "Buddha" },
        { label: "Khonghucu", value: "Khonghucu" },
        { label: "Sikh", value: "Sikh" },
        { label: "Jainisme", value: "Jainisme" },
        { label: "Yahudi", value: "Yahudi" },
        { label: "Taoisme", value: "Taoisme" },
    ];
};

const Relationships = () => {
    return [
        { label: "Ayah", value: "0" },
        { label: "Ibu", value: "1" },
        { label: "Anak", value: "2" },
        { label: "Saudara Kandung", value: "3" },
        { label: "Kakek", value: "4" },
        { label: "Nenek", value: "5" },
        { label: "Cucu", value: "6" },
        { label: "Paman", value: "7" },
        { label: "Bibi", value: "8" },
        { label: "Keponakan", value: "9" },
        { label: "Suami", value: "10" },
        { label: "Istri", value: "11" },
        { label: "Mertua", value: "12" },
        { label: "Menantu", value: "13" },
        { label: "Ipar", value: "14" },
        { label: "Anak Tiri", value: "15" },
        { label: "Orang Tua Tiri", value: "16" },
        { label: "Kakak/Adik Tiri", value: "17" },
        { label: "Anak Angkat", value: "18" },
        { label: "Keluarga Angkat", value: "19" },
    ];
};

const Month = () => {
    return [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" }
    ];
};

const StatusEmployees = () => {
    return [
        { label: "Tetap", value: "C248ADF7-5B50-405A-9614-C1F2C6995051" },
        { label: "Kontrak (PKWT)", value: "C248ADF7-5B50-405A-9614-C1F2C6995052" },
        { label: "Harian Lepas", value: "C248ADF7-5B50-405A-9614-C1F2C6995053" },
        { label: "Freelance", value: "C248ADF7-5B50-405A-9614-C1F2C6995054" },
        { label: "Penuh Waktu (Full-Time)", value: "C248ADF7-5B50-405A-9614-C1F2C6995055" },
        { label: "Paruh Waktu (Part-Time)", value: "C248ADF7-5B50-405A-9614-C1F2C6995056" },
        { label: "Musiman", value: "C248ADF7-5B50-405A-9614-C1F2C6995057" },
        { label: "Outsourcing", value: "C248ADF7-5B50-405A-9614-C1F2C6995058" },
        { label: "Magang (Internship)", value: "C248ADF7-5B50-405A-9614-C1F2C6995059" },
        { label: "Probation (Masa Percobaan)", value: "C248ADF7-5B50-405A-9614-C1F2C6995060" },
    ];
};

const Provinces = () => {
    return provinces.map((value: any) => {
        return {
            label: value.name,
            value: value.id,
        };
    });
};

const Cities = (province: string) => {
    return cities.filter((value: any) => value.province_id === province)
            .map((value: any) => ({
                label: value.name,
                value: value.id,
            }));
};

const Districts = (city: string) => {
    return districts.filter((value: any) => value.city_id === city)
                .map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }));
};

const Wards = (district: string) => {
    return wards.filter((value: any) => value.district_id === district)
                .map((value: any) => ({
                    label: value.name,
                    value: value.id,
                }));
};

const TypeAllowance = () => {
    return [
        { label: "Menambah Pendapatan", value: "MENAMBAH PENDAPATAN" },
        { label: "Mengurangi Pendapatan", value: "MENGURANGI PENDAPATAN" },
    ];
};

const PaymentBasis = () => {
    return [
        { label: "Tetap", value: "TETAP" },
    ];
};

const PaidMode = () => {
    return [
        { label: "Perusahaan", value: "PERUSAHAAN" },
        { label: "Karyawan", value: "KARYAWAN" },
    ];
};


export {
    Genders,
    Religions,
    Relationships,
    StatusEmployees,
    Provinces,
    Cities,
    Districts,
    Wards,
    Month,
    TypeAllowance,
    PaymentBasis,
    PaidMode
};
