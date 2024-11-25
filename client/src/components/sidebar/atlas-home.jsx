import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Link } from "react-router-dom"

export default function AtlasHome() {
  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
             <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base py-1">
              <img src="/atlas-web-logo-theme.png" loading="lazy" className="object-cover h-9 w-auto max-w-none" alt="atlas logo" />
              <span>Atlas</span>
            </Link>
            </SidebarMenuButton>
  
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
