// useItems.jsx
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getUserItems, getUserPurchases, getPlayerInfo, purchaseItem } from '@/services/items.service';
import { checkFirstPurchaseAchievement } from '@/services/achievements.service';
import { useUserStore } from "@/hooks/auth-hooks";
import { useToast } from "@/hooks/use-toast";

export function useItems() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query for all items
  const { isPending: itemsLoading, error: itemsError, data: items } = useQuery({
    queryKey: ['items'],
    queryFn: () => getUserItems(user.token),
    refetchOnWindowFocus: false
  });

  // Query for player's purchases
  const { data: playerPurchases } = useQuery({
    queryKey: ['playerPurchases', user.user.id],
    queryFn: () => getUserPurchases(user.user.id, user.token),
    refetchOnWindowFocus: false
  });

  // Query for player info
  const { data: playerInfo } = useQuery({
    queryKey: ['playerInfo', user.user.id],
    queryFn: () => getPlayerInfo(user.user.id, user.token),
    refetchOnWindowFocus: false
  });

  // Purchase mutation
  const purchaseMutation = useMutation({
    mutationFn: (itemId) => purchaseItem(user.user.id, itemId, user.token),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['playerPurchases']);
      await queryClient.invalidateQueries(['playerInfo']);
      toast({
        title: "Success",
        description: "Item purchased successfully!",
      });
      // Check for first purchase achievement
      await checkFirstPurchaseAchievement(user.user.id, user.token);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function getItems() {
    return {
      isPending: itemsLoading,
      error: itemsError,
      data: items?.map(item => ({
        ...item,
        isOwned: playerPurchases?.some(purchase => purchase.itemId === item.id) || false,
        canAfford: (playerInfo?.gold || 0) >= item.price
      }))
    };
  }

  function getPlayerData() {
    return {
      gold: playerInfo?.gold || 0,
      purchases: playerPurchases || []
    };
  }

  const purchaseItemMutate = async (itemId) => {
    try {
      await purchaseMutation.mutateAsync(itemId);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return {
    getItems,
    getPlayerData,
    purchaseItemMutate,
    isPurchasing: purchaseMutation.isPending
  };
}