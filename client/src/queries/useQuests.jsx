import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { getUserQuests, createQuest, deleteQuest, editQuest } from '@/services/quests.service';
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
    createQuestMutation.mutate(questEntry);
  }

  const deleteQuestMutation = useMutation({
    mutationFn: (questId) => deleteQuest(user.user.id, user.token, questId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] })
    }
  })

  const deleteQuestMutate = async (questId) => {
    deleteQuestMutation.mutate(questId);
  }

  const editQuestMutation = useMutation({
    mutationFn: ({ questId, editedQuest }) => editQuest(user.user.id, user.token, questId, editedQuest),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['quests'], (oldData) => {
        return oldData.map(quest => 
          quest.id === variables.questId ? data : quest
        );
      });
    }
  })

  const editQuestMutate = async (questId, editedQuest) => {
    console.log(editedQuest)
    editQuestMutation.mutate({ questId, editedQuest });
  }

  return {
    getQuests,
    createQuestMutate,
    deleteQuestMutate,
    editQuestMutate
  }
}