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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FormCheckboxFieldProps {
    label: string;
    name: string;
    id?: string;
    form?: any;
    className?: string;
    disabled?: boolean;
    [key: string]: any;
}

export function FormCheckboxField({
    label,
    name,
    id,
    form,
    className,
    disabled,
    ...props
}: FormCheckboxFieldProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="mr-4">{label}</FormLabel>
                    <FormControl>
                        <Checkbox
                            {...field}
                            className={cn("w-full", className)}
                            id={id}
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
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
