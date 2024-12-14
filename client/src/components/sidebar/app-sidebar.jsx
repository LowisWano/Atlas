import * as React from "react"
import {
  Calendar,
  Store,
  Award,
  Home
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import AtlasHome from "@/components/sidebar/atlas-home"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import PlayerProfileBlock from "./player-profile-block"
import { useUserStore } from "@/hooks/auth-hooks"
import { useNavigate, useLocation } from "react-router-dom"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Adventurer's Shop",
      url: "/shop",
      icon: Store,
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: Award,
    },
  ]
}

export function AppSidebar({...props}) {
  const { user, logoutUser }= useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    logoutUser();
    navigate('/login');
  }

  // Check if the current path is login or signup
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AtlasHome />
      </SidebarHeader>
      <SidebarContent>
        {user && <PlayerProfileBlock />}
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="flex h-14" onClick={logoutHandler}>
                <LogOut className="size-4" />
                <span className="ml-2 text-base">Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}