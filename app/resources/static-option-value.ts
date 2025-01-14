/* eslint-disable @typescript-eslint/no-explicit-any */
import provinces from '@/app/resources/region-json/provinces.json';
import cities from '@/app/resources/region-json/cities.json';
import districts from '@/app/resources/region-json/districts.json';
import wards from '@/app/resources/region-json/wards.json';

const Genders = () => {
    return [
        {label: 'Male',value:'0'},
        {label: 'Female',value:'1'},
    ]
}

const Religions = () => {
    return [
        {label: 'Islam',value:'Islam'},
        {label: 'Protestan',value:'Protestan'},
        {label: 'Katolik',value:'Katolik'},
        {label: 'Hindu',value:'Hindu'},
        {label: 'Buddha',value:'Buddha'},
        {label: 'Khonghucu',value:'Khonghucu'},
        {label: 'Sikh',value:'Sikh'},
        {label: 'Jainisme',value:'Jainisme'},
        {label: 'Yahudi',value:'Yahudi'},
        {label: 'Taoisme',value:'Taoisme'},
    ]
}

const Relationships = () => {
    return [
        {label: 'Ayah',value:'0'},
        {label: 'Ibu',value:'1'},
        {label: 'Anak',value:'2'},
        {label: 'Saudara Kandung',value:'3'},
        {label: 'Kakek',value:'4'},
        {label: 'Nenek',value:'5'},
        {label: 'Cucu',value:'6'},
        {label: 'Paman',value:'7'},
        {label: 'Bibi',value:'8'},
        {label: 'Keponakan',value:'9'},
        {label: 'Suami',value:'10'},
        {label: 'Istri',value:'11'},
        {label: 'Mertua',value:'12'},
        {label: 'Menantu',value:'13'},
        {label: 'Ipar',value:'14'},
        {label: 'Anak Tiri',value:'15'},
        {label: 'Orang Tua Tiri',value:'16'},
        {label: 'Kakak/Adik Tiri',value:'17'},
        {label: 'Anak Angkat',value:'18'},
        {label: 'Keluarga Angkat',value:'19'},
    ]
}

const StatusEmployees = () => {
    return [
        {label: 'Tetap',value:'0'},
        {label: 'Kontrak (PKWT)',value:'1'},
        {label: 'Harian Lepas',value:'1'},
        {label: 'Freelance',value:'1'},
        {label: 'Penuh Waktu (Full-Time)',value:'1'},
        {label: 'Paruh Waktu (Part-Time)',value:'1'},
        {label: 'Musiman',value:'1'},
        {label: 'Outsourcing',value:'1'},
        {label: 'Magang (Internship)',value:'1'},
        {label: 'Probation (Masa Percobaan)',value:'1'},
    ]
}

const Provinces = () => {
    return provinces.map((value: any) => {
        return {
            label: value.name,
            value: value.id
        }
    })
}

const Cities = (province: string) => {
    return cities.map((value: any) => {
        if(value.province_id === province) {
            return {
                label: value.name,
                value: value.id
            }
        }
    })
}

const Districts = (city: string) => {
    return districts.map((value: any) => {
        if(value.city_id === city) {
            return {
                label: value.name,
                value: value.id
            }
        }
    })
}

const Wards = (district: string) => {
    return wards.map((value: any) => {
        if(value.district_id === district) {
            return {
                label: value.name,
                value: value.id
            }
        }
    })
}
  

export { Genders, Religions, Relationships, StatusEmployees, Provinces, Cities, Districts, Wards }