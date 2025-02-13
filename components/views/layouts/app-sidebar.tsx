"use client";

import * as React from "react";

import { NavMain } from "@/components/views/layouts/nav-main";
import { NavUser } from "@/components/views/layouts/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { SidebarResource } from "../../../app/resources/sidebar";
// import Image from "next/image";
import { user } from "@/app/helpers/global-helper";
import { cn } from "@/lib/utils";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open } = useSidebar();
    const data = {
        user: {
            name: user()?.name || "Guest",
            email: user()?.email || "Guest@gmail.com",
            avatar: `https://ui-avatars.com/api/?name=${user()?.name || "Guest"}`,
        },
    };

    const { sidebarItem } = SidebarResource();
    return (
        <>
            <Sidebar collapsible="icon" {...props} >
                <SidebarHeader
                    className="cursor-pointer"
                    onClick={() =>
                        (window.location.href = "/backoffice/dashboard")
                    }
                >
                    <div className="flex justify-center items-center h-12">
                        <span className={cn("font-bold bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg transition-all duration-300 hover:scale-110", open ? 'text-4xl' : 'text-lg')}>
                           {open ? 'PBS Payroll' : 'PBS'}   
                        </span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={sidebarItem} />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </>
    );
}
