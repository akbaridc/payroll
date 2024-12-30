/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ChevronRight} from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { SidebarItem } from "@/components/element/interface/global-interface";

export function NavMain({ items}: { items: SidebarItem[] }) {
  const currentPath = usePathname();
  const router = useRouter();
  const pathname = currentPath.replace(/^\/([^/]+)/, '$1')

  const checkActive = (url: string, items: any[]): boolean => {
    if (url === pathname) return true; // Match exact URL
    for (const item of items) {
      // Recursively check child items
      if (item.url === pathname || (item.items && checkActive(item.url, item.items))) {
        return true;
      }
    }
    return false;
  };

  const existSubmenu = (item: any) => !item.items || item.items.length === 0;

  const renderMenu = (menuItems: typeof items) => {
    return menuItems.map((item) => {
      let isActive = false;

      if (typeof item.url !== 'undefined') {
        isActive = pathname === item.url || (item.items && checkActive(item.url, item.items));
      }
    
      return (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className={existSubmenu(item) && isActive ? "bg-[hsl(var(--sidebar-accent))]" : ""}
                onClick={() => item.url !== '#' && router.push(`/${item.url}`)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {item.items && (
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-[state=open]:rotate-90" />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            {item.items && (
              <CollapsibleContent>
                <SidebarMenuSub>{renderMenu(item.items)}</SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      );
    });
  };

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>{renderMenu(items)}</SidebarMenu>
    </SidebarGroup>
  );
}
