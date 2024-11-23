import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { getUserQuests, createQuest, deleteQuest, editQuest } from '@/services/quests.service';
import { useUserStore } from "@/hooks/auth-hooks";
import { useToast } from "@/hooks/use-toast"

export function useQuests() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      toast({
        title: "Quest Created!",
        description: "Your new quest has been added successfully.",
      });
    }
  });

  const createQuestMutate = async (questEntry) => {
    createQuestMutation.mutate(questEntry);
  }

  const deleteQuestMutation = useMutation({
    mutationFn: (quest) => deleteQuest(user.user.id, user.token, quest.id),
    onSuccess: (data, quest) => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      toast({
        title: "Quest Deleted.",
        description: `${quest.title} has been deleted successfully.`,
      });
    }
  })
  
  const deleteQuestMutate = async (quest) => {
    deleteQuestMutation.mutate(quest);
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
    editQuestMutation.mutate({ questId, editedQuest });
  }

  return {
    getQuests,
    createQuestMutate,
    deleteQuestMutate,
    editQuestMutate
  }
}