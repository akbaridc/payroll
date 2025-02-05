import { z } from "zod";

const ResidenceValidation = () => {
    return {
        fictive_address: z.string().nonempty("Fictive Address is required"),
        address: z.string().nonempty("Address is required"),
        contact: z.string().nonempty("Contact Address is required"),
        province: z.string().nonempty("Province is required"),
        city: z.string().nonempty("City is required"),
        district: z.string().nonempty("District is required"),
        ward: z.string().nonempty("Ward is required"),
        postal_code: z.string().nonempty("Postal Code is required"),
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
        postal_code: "",
    };
};

export { ResidenceValidation, ResidenceDefault };
