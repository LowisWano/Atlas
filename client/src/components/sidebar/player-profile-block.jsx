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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Card } from "../ui/card";

import { useUserStore } from "@/hooks/auth-hooks";
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react";
import {
  Collapsible,
} from "@/components/ui/collapsible"

export default function PlayerProfileBlock() {
  const [progress, setProgress] = useState(13)
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Profile</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="flex h-20">
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-label tracking-wider"><strong>Luis Andrei Ouano</strong></h1>
              <p className="text-label tracking-wider">Level 1 • Copper</p>
              <Progress value={progress} className="h-[7px]" />
              <span className="flex items-center gap-1">
                <img src="/gold.png" alt="gold" className="h-3"/>
                <p className="text-label tracking-wider">500,000</p>
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>        
      </SidebarMenu>
    </SidebarGroup>
  )
}