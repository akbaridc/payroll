import { z } from "zod";

const PersonalValidation = () => {
    return {
        name: z.string().nonempty("Name is required"),
        ktp: z.string()
                .min(16, "No. KTP must be min 16 characters")
                .max(16, "No. KTP must be max 16 characters"),
        phone: z.string().nonempty("Phone is required"),
        email: z.string().nonempty("Email is required").email("Invalid email"),
        place_birth: z.string().nonempty("Place of Birth is required"),
        date_birth: z.string().nonempty("Date of Birth is required"),
        gender: z.string().nonempty("Gender is required"),
        religion: z.string().nonempty("Religion is required"),
    }
}

const PersonalDefault = () => {
    return { name:"", ktp: "", phone:"", email: "", place_birth:"", date_birth: "", gender:"0", religion: "" }
}

export {PersonalValidation, PersonalDefault}