/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Personal from "../create/components/personal/personal";
import { PersonalValidation, PersonalDefault } from "../create/components/personal/schema";

import Employee from "../create/components/employee/employee";
import { EmployeeValidation, EmployeeDefault } from "../create/components/employee/schema";

import Payroll from "../create/components/payroll/payroll";
import { PayrollValidation, PayrollDefault } from "../create/components/payroll/schema";

import Family from "../create/components/family/family";
import { FamilyValidation, FamilyDefault } from "../create/components/family/schema";

import Residence from "../create/components/residence/residence";
import { ResidenceValidation, ResidenceDefault } from "../create/components/residence/schema";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EmployeeEdit(){

    const schema = z.object({
        personal: z.object(PersonalValidation()),
        employee: z.object(EmployeeValidation()),
        payroll: z.object(PayrollValidation()),
        family: FamilyValidation(),
        residence: z.object(ResidenceValidation()),
    });

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            personal: PersonalDefault(),
            employee: EmployeeDefault(),
            payroll: PayrollDefault(),
            family: FamilyDefault(),
            residence: ResidenceDefault(),
        },
    });

    async function onSubmit(value: any) {
        console.log(value);
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Employee Edit</h1>
            <div className="p-3 shadow-md rounded-md border border-foreground">
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="bg-transparent overflow-x-auto scrollbar-hide whitespace-nowrap">
                                <TabsTrigger value="personal">Personal</TabsTrigger>
                                <TabsTrigger value="employee">Employee</TabsTrigger>
                                <TabsTrigger value="payroll">Payroll</TabsTrigger>
                                <TabsTrigger value="family">Family</TabsTrigger>
                                <TabsTrigger value="residence">Residence</TabsTrigger>
                            </TabsList>
                            <TabsContent value="personal"><Personal methods={methods} /></TabsContent>
                            <TabsContent value="employee"><Employee methods={methods} /></TabsContent>
                            <TabsContent value="payroll"><Payroll methods={methods} /></TabsContent>
                            <TabsContent value="family"><Family methods={methods} /></TabsContent>
                            <TabsContent value="residence"><Residence methods={methods} /></TabsContent>
                        </Tabs>
                    </form>
                </Form>
            </div>
        </div>
    );
}