/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/form-input-field.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormInputFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  control?: any
  className?: string
  disabled?: boolean
  [key: string]: any
}

export function FormInputField({label,name,type = "text",placeholder = "",control,className,disabled,...props}: FormInputFieldProps) {
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} type={type} placeholder={placeholder} className={className} disabled={disabled} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )
}
