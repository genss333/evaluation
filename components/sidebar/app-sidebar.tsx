"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home, Menu, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Probation",
    url: "/probation",
    icon: UserRoundPen,
  },
];

export function AppSidebar() {
  const sidbar = useSidebar();
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <Sidebar className="border-none" collapsible="icon">
      <SidebarHeader>
        <div
          className={cn(
            "group-data-[collapsible=icon]:flex justify-center",
            sidbar.open && "px-2"
          )}
        >
          <Menu onClick={() => sidbar.toggleSidebar()} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="px-2">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  currentPath === item.url &&
                    "bg-accent group-data-[collapsible=icon]:text-primary group-data-[collapsible=icon]:bg-sidebar"
                )}
              >
                <div className="group-data-[collapsible=icon]:justify-center px-2">
                  <Link href={item.url} className="flex gap-2 items-center">
                    <item.icon className="size-[20px]" />
                    <div className="font-body2 group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </div>
                  </Link>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
