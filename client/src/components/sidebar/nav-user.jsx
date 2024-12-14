"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { LogOut } from "lucide-react";
import { useUserStore } from "@/hooks/auth-hooks";
import { useNavigate } from "react-router-dom";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logoutUser } = useUserStore();
  const navigate = useNavigate();

  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    logoutUser();
    navigate('/login');
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="flex h-14" onClick={logoutHandler}>
          <LogOut className="size-4" />
          <span className="ml-2 text-base">Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}