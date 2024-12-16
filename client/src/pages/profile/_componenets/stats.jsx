import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useItems } from "@/queries/useItems";
import { usePlayer } from "@/queries/usePlayer";
import { useAchievements } from "@/queries/useAchievements";
import { useQuests } from "@/queries/useQuests";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";

export default function Stats() {
    const { getPlayerData } = usePlayer();
    const { playerInfo, isLoading, error } = getPlayerData();

    const { getPlayerItems } = useItems();
    const itemsData = getPlayerItems();

    const { getUserAchievements } = useAchievements();
    const achievementsData = getUserAchievements();

    const { getQuests } = useQuests();
    const questData = getQuests();

    if (isLoading || itemsData.isPending) {
        return <LoadingSpinner />;
    }

    if (error || itemsData.error) {
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const playerData = playerInfo;
    const playerItems = itemsData.data;
    const playerAchievements = achievementsData.data;
    const playerCompletedQuest =
        questData && questData.data
            ? questData.data.filter(
                  (quest) =>
                      quest.status === "COMPLETED"
              )
            : [];

    return (
        <div className="flex flex-col md:flex-row justify-center gap-y-8 md:gap-x-20 p-5">

            <Card className="w-full md:w-1/6 flex flex-col justify-center items-center">
                <CardContent className="font-semibold text-base flex-col space-y-3">
                    <div className="relative mx-auto">
                        <img src="Streak.png" className="w-40" />
                        <div className="absolute inset-0 flex justify-center items-center text-5xl">
                            {playerData.streak}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="font-bold text-lg md:text-xl text-center">
                    Quest Streak
                </CardFooter>
            </Card>

            <Card className="w-full md:w-1/2">
                <CardHeader className="font-bold text-purple-800 text-lg md:text-3xl">
                    Statistics
                </CardHeader>
                <CardContent className="font-semibold text-sm md:text-base flex-col space-y-4">
                    <div className="flex justify-between">
                        <div>Total Quests Accomplished:</div>
                        <div className="text-stone-500 font-light">
                            {playerCompletedQuest.length}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>Items Collected:</div>
                        <div className="text-stone-500 font-light">
                            {playerItems.length}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>Achievements Earned:</div>
                        <div className="text-stone-500 font-light">
                            {playerAchievements.length}
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
