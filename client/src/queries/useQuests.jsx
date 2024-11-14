import { useQuery } from '@tanstack/react-query';
import { getUserQuests } from '@/services/quests.service';
import { useUserStore } from "@/hooks/auth-hooks";

export function useQuests() {
  const { user } = useUserStore();

  const { isPending, error, data } = useQuery({
    queryKey: ['quests'],
    queryFn: () => getUserQuests(user.user.id),
  });
  
  function getQuests() {
    return {
      isPending,
      error,
      data,
    }
  }

  return {
    getQuests,
  }
}