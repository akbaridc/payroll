/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ComboBox } from "@/components/element/interface/global-interface"

interface ComboBoxProps {
    label: string
    name: string
    form?: any
    className?: string
    disabled?: boolean,
    combobox: ComboBox[]
}

export function ComboboxForm({label,name,form,className,disabled, combobox}:ComboBoxProps) {
  return (
    <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button variant="outline" role="combobox" disabled={disabled} className={cn("w-full h-[3.1rem] justify-between text-foreground hover:text-foreground", !field.value && "text-muted-foreground", className)}>
                            {field.value 
                                ? combobox.find((cmbx) => cmbx.value === field.value)?.label
                                : `Select ${label}`
                            }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${label}...`} />
                        <CommandList>
                            <CommandEmpty>No data found.</CommandEmpty>
                            <CommandGroup>
                            {combobox.map((cmbx) => (
                                <CommandItem className="cursor-pointer" value={cmbx.label} key={cmbx.value} onSelect={() => {form.setValue(name, cmbx.value)}}>
                                    {cmbx.label}
                                    <Check className={cn("ml-auto",cmbx.value === field.value ? "opacity-100": "opacity-0")}/>
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )} />
  )
}