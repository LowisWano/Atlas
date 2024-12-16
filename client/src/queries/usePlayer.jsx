import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPlayerInfo, getUserInfo, updatePlayer, updateUser, uploadProfilePic } from '@/services/player.service';
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

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser) => updateUser(user.user.id, user.token, updatedUser),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast({
        title: "Name Updated!",
        description: "Your name has been updated successfully.",
      });
    }
  });

  const uploadProfilePicMutation = useMutation({
    mutationFn: (formData) => uploadProfilePic(user.user.id, user.token, formData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['playerInfo'] });
      toast({
        title: "Profile Picture Updated!",
        description: "Your profile picture has been updated successfully.",
      });
      return data;
    }
  });

  const updatePlayerMutate = async (playerData) => {
    updatePlayerMutation.mutate(playerData);
  };

  const updateUserMutate = async (name) => {
    updateUserMutation.mutate(name);
  };

  const uploadProfilePicMutate = async (formData) => {
    return uploadProfilePicMutation.mutateAsync(formData);
  };

  return {
    getPlayerData,
    updatePlayerMutate,
    updateUserMutate,
    uploadProfilePicMutate,
  };
}