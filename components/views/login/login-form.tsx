/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { ButtonAct } from "@/components/form/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInputField } from "@/components/form/field-input";
import { LoginInterface } from "@/components/element/interface/global-interface";
import axios from "@/lib/axios";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { mutate } from "swr";
import { useAlertDialog } from "@/components/element/context/alert-dialog-context";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { setAlertDialog } = useAlertDialog();

    const setDataLogin: LoginInterface = { email: "", password: "" };

    const form = useForm({
        resolver: zodResolver(
            z.object({
                email: z.string().min(1, "field is required").email(),
                password: z.string().min(1, "field is required"),
            }),
        ),
        defaultValues: setDataLogin,
    });

    const onSubmit =  async (values: LoginInterface) => {
        setLoading(true);

        await axios.post("/api/login", values)
            .then(async (response) => {
                console.log(response)
                localStorage.setItem("user", JSON.stringify(response.data.data));

                document.cookie = `auth_token=${response.data.token}; path=/;`;

                await mutate("api/user", async () => {
                    const response = await axios.get("api/user");
                    return response.data.data;
                });

                setAlertDialog({title: "Success!",message: "Login successfully",type: "success",});
                setLoading(false);
                router.push("/backoffice/dashboard");
            })
            .catch(error => {
                setAlertDialog({title: "Error!",message: error.response.data?.message || "Something went wrong",type: "error",});
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <FormInputField
                                            control={form}
                                            name="email"
                                            label="Email"
                                            placeholder="m@example.com"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormInputField
                                            type="password"
                                            control={form}
                                            name="password"
                                            label="Password"
                                        />
                                    </div>
                                    <ButtonAct
                                        text="Submit"
                                        loading={loading}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
