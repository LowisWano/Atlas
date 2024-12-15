import { useQuery } from "@tanstack/react-query";
import { getAchievementsList, getUserAchievementsList } from "@/services/achievements.service";
import { useUserStore } from "@/hooks/auth-hooks";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast"; // Adjust the import path as needed

export function useAchievements() {
  const { user } = useUserStore();
  const { toast } = useToast();

  // Load notified achievements from local storage
  const loadNotifiedAchievements = () => {
    const stored = localStorage.getItem('notifiedAchievements');
    return stored ? JSON.parse(stored) : [];
  };

  const [notifiedAchievements, setNotifiedAchievements] = useState(loadNotifiedAchievements);

  const { isPending: isAchievementsPending, error: achievementsError, data: achievementsData } = useQuery({
    queryKey: ["achievement"],
    queryFn: () => getAchievementsList(user.token),
    refetchOnWindowFocus: false,
  });

  function getAchievements() {
    return {
      isPending: isAchievementsPending,
      error: achievementsError,
      data: achievementsData,
    };
  }

  const { isPending: isUserAchievementsPending, error: userAchievementsError, data: userAchievementsData } = useQuery({
    queryKey: ["playerachievement"],
    queryFn: () => getUserAchievementsList(user.user.id, user.token),
    refetchOnWindowFocus: false,
  });

  function getUserAchievements() {
    return {
      isPending: isUserAchievementsPending,
      error: userAchievementsError,
      data: userAchievementsData,
    };
  }

  useEffect(() => {
    if (userAchievementsData) {
      userAchievementsData.forEach((achievement) => {
        if (!notifiedAchievements.includes(achievement.id)) {
          toast({
            title: "Achievement Unlocked",
            description: achievement.achievement.title,
          });
          const updatedNotifiedAchievements = [...notifiedAchievements, achievement.id];
          setNotifiedAchievements(updatedNotifiedAchievements);
          localStorage.setItem('notifiedAchievements', JSON.stringify(updatedNotifiedAchievements));
        }
      });
    }
  }, [userAchievementsData, toast, notifiedAchievements]);

  return {
    getAchievements,
    getUserAchievements,
  };
}