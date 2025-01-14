/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils"
import { ButtonAct } from "@/components/form/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormInputField } from "@/components/form/field-input"
import { LoginInterface } from "@/components/element/interface/global-interface"
import AxiosInstance from "@/lib/axios/utils";
// import { useRouter } from 'next/navigation'
import { useState } from "react";

export function LoginForm({className, ...props}: React.ComponentPropsWithoutRef<"div">) {
  // const router = useRouter()
  const [loading, setLoading] = useState(false);
 
  const setDataLogin: LoginInterface = {email: "",password: "",}

  const form = useForm({
    resolver: zodResolver(z.object({
      email: z.string().min(1, "field is required").email(),
      password: z.string().min(1, "field is required")
    })),
    defaultValues: setDataLogin,
  })

  const onSubmit = (values: LoginInterface) => {
    console.log(values)
    console.log(process.env.NEXT_PUBLIC_API_URL)
    setLoading(true);
    
      AxiosInstance.post('api/auth/login', values)
        .then((response: any) => {
            console.log(response);

            //push to local storage
            // localStorage.setItem('dialogOpen', JSON.stringify({
            //     title: "Error!",
            //     message: 'mantapp bro',
            //     type: "error"
            // }));
            
            // setTimeout(() => {
            //   setLoading(false);
            //   router.push('/backoffice/dashboard')
            // },2000)
        })
        .catch(error => {
            console.log(error)
        }).finally(() => {
          setLoading(false);
        });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormInputField control={form} name="email" label="Email" placeholder="m@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <FormInputField type="password" control={form} name="password" label="Password" />
                  </div>
                  <ButtonAct text="Submit" loading={loading} />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
