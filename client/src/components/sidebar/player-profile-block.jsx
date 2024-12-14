import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { useUserStore } from "@/hooks/auth-hooks";
import { Progress } from "@/components/ui/progress"
import { usePlayer } from "@/queries/usePlayer";
import { useSidebar } from "@/components/ui/sidebar";

export default function PlayerProfileBlock() {
  const { token, user } = useUserStore();
  const { getPlayerData } = usePlayer();
  const { playerInfo, userInfo, isLoading } = getPlayerData();
  const { state } = useSidebar();

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Profile</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex h-20">
              Loading...
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  const expProgress = (playerInfo?.experience || 0) / (playerInfo?.level * 1000) * 100;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Profile</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="flex h-16">
            <div>
              <Avatar className={state === "collapsed" ? "h-7 w-7" : ""}>
                <AvatarImage src={playerInfo?.profilePic || "https://github.com/shadcn.png"} alt="avatar" />
                <AvatarFallback>{userInfo?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-label tracking-wider">
                <strong>{userInfo?.name || "Unknown"}</strong>
              </h1>
              <p className="text-label tracking-wider">
                Level {playerInfo?.level || 1} • {playerInfo?.adventurerRank?.charAt(0).toUpperCase() + playerInfo?.adventurerRank?.slice(1).toLowerCase() || "Unknown"}
              </p>
              <Progress value={expProgress} className="h-[7px]" />
              <span className="flex items-center gap-1">
                <img src="/gold.png" alt="gold" className="h-3"/>
                <p className="text-label tracking-wider">{playerInfo?.gold?.toLocaleString() || 0}</p>
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>        
      </SidebarMenu>
    </SidebarGroup>
  );
} 