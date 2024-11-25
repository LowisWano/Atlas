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

export default function PlayerProfileBlock() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Profile</SidebarGroupLabel>
      <SidebarMenu>
        Player
      </SidebarMenu>
    </SidebarGroup>
  )
}