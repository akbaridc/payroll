/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/form-input-field.tsx
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    form?: any;
    className?: string;
    disabled?: boolean;
    [key: string]: any;
}

export function FormInputField({
    label,
    name,
    type = "text",
    placeholder = "",
    form,
    className,
    disabled,
    ...props
}: FormInputFieldProps) {
    return (
        <FormField
            control={form?.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className={cn("w-full", className)}
                            disabled={disabled}
                            {...props}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
