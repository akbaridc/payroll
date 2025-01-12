import { z } from "zod";

const FamilyValidation = () => {
  return z.array(
    z.object({
      name: z.string().nonempty("Name is required"),
      relationship: z.string().nonempty("Relationship is required"),
      date_birth: z.string().nonempty("Date of Birth is required"),
      gender: z.string().nonempty("Gender is required"),
      religion: z.string().nonempty("Religion is required"),
    })
  );
};

const FamilyDefaultInterface = () => {
    return {name: "", relationship: "", date_birth: "", gender: "", religion: ""}
}

const FamilyDefault = () => {
  return [FamilyDefaultInterface()];
};

export { FamilyValidation, FamilyDefault, FamilyDefaultInterface };
