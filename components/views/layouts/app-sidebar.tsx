"use client"

import * as React from "react"

import { NavMain } from "@/components/views/layouts/nav-main"
import { NavUser } from "@/components/views/layouts/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarResource } from "../../../app/resources/sidebar";
import Image from 'next/image'

// This is sample data.
const data = {
  user: {
    name: "AkbarIDC",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {sidebarItem} = SidebarResource()
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="cursor-pointer" onClick={() => window.location.href = '/backoffice/dashboard'}>
          <div className="flex justify-center items-center">
            <Image src="/logo.jpg" alt="Logo" width={200} height={100} />
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
  )
}
