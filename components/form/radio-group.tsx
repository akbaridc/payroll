/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioBox } from "@/components/element/interface/global-interface"

interface RadioGroupProps {
    label: string
    name: string
    form?: any
    style?: string,
    disabled?: boolean,
    radioItem: RadioBox[]
}

export function RadioGroupForm({label,name,form,disabled,style='horizontal',radioItem}:RadioGroupProps) {

  return (
    <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem className="space-y-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className={`flex space-y-1 ${style === 'vertical' ? 'flex-col' : 'flex-row'}`} disabled={disabled}>
                    {radioItem.map((item, index) => (
                        <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value={item.value} /></FormControl>
                            <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                        </FormItem>
                    ))}
                </RadioGroup>
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
    />
  )
}
