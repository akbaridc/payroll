import { z } from "zod";

const ResidenceValidation = () => {
    return {
        fictive_address: z.string().nullable(),
        address: z.string().nullable(),
        contact: z.string().nullable(),
        province: z.string().nullable(),
        city: z.string().nullable(),
        district: z.string().nullable(),
        ward: z.string().nullable(),
    };
};

const ResidenceDefault = () => {
    return {
        fictive_address: "",
        address: "",
        contact: "",
        province: "",
        city: "",
        district: "",
        ward: "",
    };
};

export { ResidenceValidation, ResidenceDefault };
