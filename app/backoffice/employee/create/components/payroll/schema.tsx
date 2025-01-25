import { z } from "zod";

const PayrollValidation = () => {
    return {
        category_employee: z.string().nonempty("Category Employee is required"),
        salary: z
            .string()
            .nonempty("Basic Salary is required")
            .min(1, "Basic Salary is required"),
        bpjs: z.string().nonempty("Basic Salary is required"),
        bank: z.string().nullable(),
        acc_number: z.string().nullable(),
        acc_name: z.string().nullable(),
        npwp15: z.string().nullable(),
        npwp16: z.string().nullable(),
        netto: z.string().nullable(),
        pph21: z.string().nullable(),
        tax: z.string().nullable(),
        type_tax: z.string().nullable(),
        obligation: z.string().nullable(),
    };
};

const PayrollDefault = () => {
    return {
        category_employee: "",
        salary: 0,
        bpjs: "",
        bank: "",
        acc_number: "",
        acc_name: "",
        npwp15: "",
        npwp16: "",
        netto: "",
        pph21: "",
        tax: "",
        type_tax: "",
        obligation: "",
    };
};

export { PayrollValidation, PayrollDefault };
