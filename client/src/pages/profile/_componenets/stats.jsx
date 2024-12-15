import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { useItems } from "@/queries/useItems";
import { usePlayer } from "@/queries/usePlayer";
import { useAchievements } from "@/queries/useAchievements";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";

export default function Stats() {
    const { getPlayerData } = usePlayer();
    const { playerInfo, userInfo, isLoading, error } = getPlayerData();
    
    const { getPlayerItems } = useItems();
    const itemsData = getPlayerItems();

    const { getUserAchievements } = useAchievements();
    const achievementsData = getUserAchievements();

    if (isLoading || itemsData.isPending){
            return <LoadingSpinner />;
        }
    
    if (error || itemsData.error){
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const playerData = playerInfo;
    const userData = userInfo;
    const playerItems = itemsData.data;

    return (
        <div className="flex border border-red-500">
            <h1 className="text-center py-4">Stats Content</h1>
        </div>
    );
}