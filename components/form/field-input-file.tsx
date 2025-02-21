/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
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

const FormInputFieldFile = React.forwardRef<HTMLInputElement, FormInputFieldProps>(
    ({ label, name, type = "text", placeholder = "", form, className, disabled, ...props }, ref) => {
        if (type === "hidden") {
            return <Input {...form?.register(name)} type="hidden" ref={ref} {...props} />;
        }

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
                                ref={ref}
                                {...props}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    field.onChange(file);
                                }}
                                value={type === "file" ? undefined : field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
    }
);

// Tambahkan display name untuk debugging
FormInputFieldFile.displayName = "FormInputFieldFile";

export { FormInputFieldFile };
