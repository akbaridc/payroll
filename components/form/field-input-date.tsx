/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import { directiveRawDate } from "@/app/helpers/global-helper";

interface FormInputFieldProps {
  label: string;
  name: string;
  form?: any;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

export function FormInputFieldDate({label, name, form, className, disabled, ...props }: FormInputFieldProps) {
  return (
    <FormField control={form?.control} name={name} render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} 
              onChangeRaw={(e) => {
                const target = e.target as HTMLInputElement;
                const date = directiveRawDate(target.value);
                if (date) field.onChange(date)
              }} dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy" className={cn("w-full inline-block", className)} disabled={disabled} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}