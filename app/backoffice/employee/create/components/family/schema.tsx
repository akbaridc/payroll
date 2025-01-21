import { z } from "zod";

const FamilyValidation = () => {
    return z.array(
        z.object({
            name: z.string().nullable(),
            relationship: z.string().nullable(),
            date_birth: z.date().nullable(),
            gender: z.string().nullable(),
            religion: z.string().nullable(),
        }),
    );
};

const FamilyDefaultInterface = () => {
    return {
        name: "",
        relationship: "",
        date_birth: "",
        gender: "",
        religion: "",
    };
};

const FamilyDefault = () => {
    return [FamilyDefaultInterface()];
};

export { FamilyValidation, FamilyDefault, FamilyDefaultInterface };
