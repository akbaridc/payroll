import { z } from "zod";

const FamilyValidation = () => {
    return z.array(
        z.object({
            name: z.string().nullable(),
            relationship: z.string().nullable(),
            date_birth: z.string()
                        .transform((val) => (val === "" ? null : new Date(val)))
                        .pipe(z.union([z.date(), z.null()])),
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
        gender: "0",
        religion: "",
    };
};

const FamilyDefault = () => {
    return [FamilyDefaultInterface()];
};

export { FamilyValidation, FamilyDefault, FamilyDefaultInterface };
