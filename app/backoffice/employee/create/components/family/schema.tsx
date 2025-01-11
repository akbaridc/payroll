import { z } from "zod";

const FamilyValidation = () => {
    return {
        name: z.string().nonempty("Name is required"),
        relationship: z.string().nonempty("Relationship is required"),
        education: z.string().nonempty("Education is required"),
        date_birth: z.string().nonempty("Date of Birth is required"),
        gender: z.string().nonempty("Gender is required"),
        religion: z.string().nonempty("Religion is required"),
    }
}

const FamilyDefault = () => {
    return { name:"", relationship: "", education:"", date_birth: "", gender:"", religion: "" }
}

export {FamilyValidation, FamilyDefault}