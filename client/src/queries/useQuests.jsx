import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { getUserQuests, createQuest } from '@/services/quests.service';
import { useUserStore } from "@/hooks/auth-hooks";

export function useQuests() {
  const { user } = useUserStore();
  const queryClient = useQueryClient()

  const { isPending, error, data } = useQuery({
    queryKey: ['quests'],
    queryFn: () => getUserQuests(user.user.id, user.token),
    refetchOnWindowFocus: false
  });
  
  function getQuests() {
    return {
      isPending,
      error,
      data,
    }
  }

  const createQuestMutation = useMutation({
    mutationFn: (newQuest) => createQuest(user.user.id, user.token, newQuest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] })
    }
  });

  const createQuestMutate = async (questEntry) => {
    createQuestMutation.mutate(questEntry)
  }

  return {
    getQuests,
    createQuestMutate
  }
}