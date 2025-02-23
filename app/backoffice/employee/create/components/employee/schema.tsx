import { z } from "zod";

const EmployeeValidation = () => {
    return {
        nip: z.string().nonempty("NIP is required"),
        company: z.string().nullable(),
        divisi: z.string().nonempty("Divisi is required"),
        level: z.string().nonempty("Level is required"),
        frase: z.string().nullable(),
        direct_supervisor: z.string().nullable(),
        status: z.boolean().default(true),
        join_date: z.date({ required_error: "Join date is required" }),
        resign: z.boolean().default(false),
    };
};

const EmployeeDefault = () => {
    return {
        nip: "",
        company: "",
        divisi: "",
        level: "",
        frase: "",
        direct_supervisor: "",
        status: true,
        join_date: "",
        resign: false,
    };
};

export { EmployeeValidation, EmployeeDefault };
