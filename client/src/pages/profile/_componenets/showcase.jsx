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

    if (itemsData.isPending || achievementsData.isPending) {
        return <LoadingSpinner />;
    }

    if (itemsData.error || achievementsData.error) {
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred.
            </div>
        );
    }

    const playerItems = itemsData.data;
    const playerAchievements = achievementsData.data;

    const sortItemsByRarity = (items) => {
        const rarityOrder = ['LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'];
        return items.sort((a, b) => rarityOrder.indexOf(a.item.rarity) - rarityOrder.indexOf(b.item.rarity));
    };

    const sortAchievementsByDifficulty = (items) => {
        const difficulty = ['/sprites/Challenge3.png', '/sprites/Challenge2.png', '/sprites/Challenge1.png'];
        return items.sort((a, b) => difficulty.indexOf(a.achievement.iconImg) - difficulty.indexOf(b.achievement.iconImg));
    };

    const topItems = sortItemsByRarity(playerItems).slice(0, 4);
    const topAchievements = sortAchievementsByDifficulty(playerAchievements).slice(0, 2);

    const recentItems = playerItems
        .sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt))
        .slice(0, 2);

    return (
        <div className="flex flex-col md:flex-row justify-center gap-y-8 md:gap-x-20 p-5">
            {/* Item Showcase Card */}
            <Card className="w-full md:w-1/3">
                <CardHeader className="font-bold text-center">
                    Item Showcase
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {topItems.map((item) => (
                                <Tooltip key={item.id}>
                                    <TooltipTrigger>
                                        <img src={item.item.itemImg} className="w-14 h-14 mx-auto" />
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

            {/* Recently Obtained Card */}
            <Card className="w-full md:w-1/3">
                <CardHeader className="font-bold text-center">
                    Recently Obtained
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {recentItems.map((item) => (
                                <Tooltip key={item.id}>
                                    <TooltipTrigger>
                                        <img src={item.item.itemImg} className="w-14 h-14 mx-auto" />
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

            {/* Top Achievements Card */}
            <Card className="w-full md:w-1/3">
                <CardHeader className="font-bold text-center">
                    Top Achievements
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {topAchievements.map((achievement) => (
                                <Tooltip key={achievement.id}>
                                    <TooltipTrigger>
                                        <img src={achievement.achievement.iconImg} className="w-14 h-14 mx-auto" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {achievement.achievement.title}
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