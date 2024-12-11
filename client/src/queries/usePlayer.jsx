import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPlayerInfo, getUserInfo } from '@/services/player.service';
import { useUserStore } from "@/hooks/auth-hooks";
import { useToast } from "@/hooks/use-toast";

export function usePlayer() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const playerQuery = useQuery({
    queryKey: ['playerInfo'],
    queryFn: () => getPlayerInfo(user.user.id, user.token),
    refetchOnWindowFocus: false
  });

  const userQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(user.user.id, user.token),
    refetchOnWindowFocus: false
  });

  const getPlayerData = () => ({
    playerInfo: playerQuery.data,
    userInfo: userQuery.data,
    isLoading: playerQuery.isLoading || userQuery.isLoading,
    error: playerQuery.error || userQuery.error,
  });

  const updatePlayerMutation = useMutation({
    mutationFn: (updatedPlayer) => updatePlayer(user.user.id, user.token, updatedPlayer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['playerInfo'] });
      toast({
        title: "Profile Updated!",
        description: "Your profile has been updated successfully.",
      });
    }
  });

  const updatePlayerMutate = async (playerData) => {
    updatePlayerMutation.mutate(playerData);
  };

  return {
    getPlayerData,
    updatePlayerMutate,
    // Add more mutations as needed
  };
}