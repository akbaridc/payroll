import { z } from "zod";

const MIN_DATE = new Date(1900, 0, 1); // 01/01/1900
const MAX_DATE = new Date(2300, 11, 30); // 30/12/2300

const PersonalValidation = () => {
    return {
        name: z.string().nonempty("Name is required"),
        ktp: z.string()
                .min(16, "No. KTP must be min 16 characters")
                .max(16, "No. KTP must be max 16 characters"),
        phone: z.string().nonempty("Phone is required"),
        email: z.string().nonempty("Email is required").email("Invalid email"),
        place_birth: z.string().nonempty("Place of Birth is required"),
        date_birth: z.preprocess(
            (val) => {
              if (typeof val === "string") {
                // Validasi format dd/MM/yyyy
                console.l
                const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(val);
                if (match) {
                  const [_, day, month, year] = match;
                  const date = new Date(
                    parseInt(year, 10),
                    parseInt(month, 10) - 1,
                    parseInt(day, 10)
                  );
          
                  // Periksa apakah tanggal valid
                  if (!isNaN(date.getTime())) {
                    return date;
                  }
                }
                return undefined; // Format salah
              }
              return val;
            },
            z
              .date({ required_error: "Date is required" })
              .min(MIN_DATE, { message: `Date must be after ${MIN_DATE.toLocaleDateString("en-GB")}` })
              .max(MAX_DATE, { message: `Date must be before ${MAX_DATE.toLocaleDateString("en-GB")}` })
          ),
        gender: z.string().nonempty("Gender is required"),
        religion: z.string().nonempty("Religion is required"),
    }
}

const PersonalDefault = () => {
    return { name:"", ktp: "", phone:"", email: "", place_birth:"", date_birth: null, gender:"0", religion: "" }
}

export {PersonalValidation, PersonalDefault}