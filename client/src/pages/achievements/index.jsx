import { useUserStore } from "@/hooks/auth-hooks";
import AchievementsBlock from './_components/achievements-block';
import { useAchievements } from "@/queries/useAchievements";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";

export default function Achievements(){
    const { user } = useUserStore()
    console.log(user)

    const { getAchievements } = useAchievements();
    const { isPending, error, data } = getAchievements();

    const { getUserAchievements } = useAchievements();
    const userA = getUserAchievements();

    if (isPending || userA.isPending) {
        return <LoadingSpinner />;
    }

    if (error || userA.error) {
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const achievements = data || [];
    const checkedAchievements = userA.data || [];

    console.log("Index Checked Achievements", checkedAchievements)

    const completionPercentage = achievements.length > 0 ? ((checkedAchievements.length / achievements.length) * 100).toFixed(2) : '0.00';
    return (
    <div className="p-10">
        <div className="flex justify-between">
            <div className="text-white text-5xl font-bold">Achievements</div>
            <div className="flex flex-col">
                <span className="text-white text-5xl font-bold text-center">{completionPercentage}%</span>
                <span className="text-gray-700">Completed ({checkedAchievements.length} / {achievements.length})</span>
            </div>
        </div>
        <AchievementsBlock achievements={achievements} userAchievements={checkedAchievements}/>
    </div>
    )
}