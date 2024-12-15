"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function NavMain({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
              <Link to = {item.url}>
            <SidebarMenuItem className="mb-4">
              <Link to={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                  <span>
                    {item.icon && <item.icon />}
                  </span>
                    {/* {item.icon && <item.icon />} */}
                  <span>{item.title}</span>
              </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
              </Link>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
