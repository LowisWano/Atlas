import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAchievementsList, getUserAchievements } from "@/services/achievements.service";
import { useUserStore } from "@/hooks/auth-hooks";

export function useAchievements() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { isPending: isAchievementsPending, error: achievementsError, data: achievementsData } = useQuery({
    queryKey: ["achievements"],
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
    queryKey: ["userAchievements", user.user.id],
    queryFn: () => getUserAchievements(user.user.id, user.token),
    refetchOnWindowFocus: false,
  });

  function getUserAchievementsState() {
    return {
      isPending: isUserAchievementsPending,
      error: userAchievementsError,
      data: userAchievementsData,
    };
  }

  return {
    getAchievements,
    getUserAchievementsState,
  };
}
