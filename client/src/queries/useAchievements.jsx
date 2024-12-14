import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAchievementsList, getUserAchievementsList } from "@/services/achievements.service";
import { useUserStore } from "@/hooks/auth-hooks";

export function useAchievements() {
  const { user } = useUserStore();

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

  return {
    getAchievements,
    getUserAchievements,
  };
}
