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
import { useAchievements } from "@/queries/useAchievements";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";

export default function Showcase() {
    const { getPlayerItems } = useItems();
    const itemsData = getPlayerItems();

    const { getUserAchievements } = useAchievements();
    const achievementsData = getUserAchievements();

    if (itemsData.isPending || achievementsData.isPending){
            return <LoadingSpinner />;
        }
    
    if (itemsData.error || achievementsData.error){
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const playerItems = itemsData.data;
    const playerAchievements = achievementsData.data;

    console.log("Fetched playerItems: ", playerItems);
    console.log("Fetched playerAchievements: ", playerAchievements);

    const sortItemsByRarity = (items) => {
        const rarityOrder = ['LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'];
        return items.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
    };

    const topItems = sortItemsByRarity(playerItems).slice(0, 4);
    const recentItems = playerItems.sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt)).slice(0, 2)
    // const recentAchievements = playerAchievements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2)

    return (
        <div className="flex justify-center">
            <Card>
                <CardHeader className="font-bold">
                    Item Showcase
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="flex flex-row gap-8">
                            {topItems.map((item) => (
                                
                                    <Tooltip key={item.id}>
                                        <TooltipTrigger>
                                            <img src={item.item.itemImg} className="w-14 h-14"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {item.item.itemName}
                                        </TooltipContent>
                                    </Tooltip>
                                
                            ))}
                        </div>
                    </TooltipProvider>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="font-bold">
                    Recently Obtained Items
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="flex flex-row gap-8">
                            {recentItems.map((item) => (
                                
                                    <Tooltip key={item.id}>
                                        <TooltipTrigger>
                                            <img src={item.item.itemImg} className="w-14 h-14"/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {item.item.itemName}
                                        </TooltipContent>
                                    </Tooltip>
                                
                            ))}
                        </div>
                    </TooltipProvider>
                </CardContent>
            </Card>
        </div>
    );
}