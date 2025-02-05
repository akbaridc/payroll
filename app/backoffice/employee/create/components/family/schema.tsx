import { z } from "zod";

const FamilyValidation = () => {
    return z.array(
        z.object({
            name: z.string().nullable(),
            relationship: z.string().nullable(),
            date_birth: z.union([z.string(), z.date(), z.null()])
                        .transform((val) => {
                            if (val === "" || val === null) return null;
                            if (typeof val === "string" && !isNaN(Date.parse(val))) return new Date(val);
                            return val;
                        }),
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
