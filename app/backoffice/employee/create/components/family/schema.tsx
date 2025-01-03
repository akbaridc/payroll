import { z } from "zod";

const FamilyValidation = () => {
    return {
        name: z.string().nonempty("Name is required"),
        ktp: z.string().nonempty("No. KTP is required"),
        phone: z.string().nonempty("Phone is required"),
        email: z.string().nonempty("Email is required").email("Invalid email"),
        place_birth: z.string().nonempty("Place of Birth is required"),
        date_birth: z.string().nonempty("Date of Birth is required"),
        gender: z.string().nonempty("Gender is required"),
        religion: z.string().nonempty("Religion is required"),
    }
}

const FamilyDefault = () => {
    return { name:"", ktp: "", phone:"", email: "", place_birth:"", date_birth: "", gender:"", religion: "" }
}

export {FamilyValidation, FamilyDefault}