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
    const { playerInfo, userInfo, isLoading, error } = getPlayerData();

    const { getPlayerItems } = useItems();
    const itemsData = getPlayerItems();

    const { getUserAchievements } = useAchievements();
    const achievementsData = getUserAchievements();

    const { getQuests } = useQuests();
    const questData = getQuests();
    

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
    const playerAchievements = achievementsData.data;
    const playerQuest = questData.data || [];
    const playerCompletedQuest = questData && questData.data ? questData.data.filter(quest => quest.status === "COMPLETED" && quest.questType === "NORMAL_QUEST") : [];

    console.log("Fetched : playerData", playerData);
    console.log("Fetched : userData", userData);
    console.log("Fetched : playerItems", playerItems);
    console.log("Fetched : playerAchievements", playerAchievements);
    console.log("Fetched : playerQuest", playerQuest);
    console.log("Fetched : playerCompletedQuest", playerCompletedQuest);

    return (
        <div className="flex flex-row justify-center gap-20">
            
            <Card>
                <CardContent className="font-semibold text-base flex-col space-y-3">
                    <div className="relative">
                        <img src="Streak.png" className="w-52"/>
                        <div className="flex absolute text-7xl inset-x-20 inset-y-28">
                            {playerData.streak}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="font-bold text-xl justify-center">
                    Quest Streak
                </CardFooter>
            </Card>

            <Card>
                <CardHeader className="font-bold text-purple-800 text-xl">
                    Statistics
                </CardHeader>
                <CardContent className="font-semibold text-base flex-col space-y-3">
                    <div className="flex gap-40"><div>Total Quests Accomplished:</div><div className="text-stone-500 font-light"> {playerCompletedQuest.length}</div></div>
                    <div className="flex justify-between"><div>Items Collected:</div><div className="text-stone-500 font-light"> {playerItems.length}</div></div>
                    <div className="flex justify-between"><div>Achievements Earned:</div><div className="text-stone-500 font-light"> {playerAchievements.length}</div></div>
                </CardContent>
            </Card>

        </div>
    );
}