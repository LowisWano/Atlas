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

import { Link } from "react-router-dom";

const calculateLevelThreshold = (level) => {
  return level * 1000;
};

const calculateExpProgress = (level, currentExp) => {
  const currentLevelThreshold = calculateLevelThreshold(level);
  
  const expInCurrentLevel = currentExp; 
  const expNeededForLevel = currentLevelThreshold;
  
  const progressPercentage = Math.floor((expInCurrentLevel / expNeededForLevel) * 100);
  
  return {
    progress: Math.max(0, Math.min(100, progressPercentage)),
    actualExp: expInCurrentLevel,
    neededExp: expNeededForLevel
  };
};

export default function PlayerProfileBlock() {
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
  console.log(playerInfo)
  
  const { progress, actualExp, neededExp } = calculateExpProgress(playerInfo.level, playerInfo.experience);
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Profile</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link to="/profile">
            <SidebarMenuButton className="flex h-24">
              <div>
                <Avatar className={state === "collapsed" ? "h-7 w-7" : ""}>
                  <AvatarImage src={playerInfo?.profilePic || "src/assets/profile/noPfp.jpg"} alt="avatar" />
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
                <Progress value={progress} className="h-[7px]" />
                <span className="text-xs text-muted-foreground">
                  {actualExp.toLocaleString()} / {neededExp.toLocaleString()} EXP
                </span>
                <span className="flex items-center gap-1">
                  <img src="/gold.png" alt="gold" className="h-3"/>
                  <p className="text-label tracking-wider">{playerInfo?.gold?.toLocaleString() || 0}</p>
                </span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>        
      </SidebarMenu>
    </SidebarGroup>
  );
} 