import { useAchievements } from "@/queries/useAchievements";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";

export default function AchievementsBlock(){
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
    const completionPercentage = achievements.length > 0 ? ((checkedAchievements.length / achievements.length) * 100).toFixed(2) : '0.00';

    return(
        <>
<       div className="flex justify-between">
            <div className="text-2xl md:text-5xl font-bold">Achievements</div>
            <div className="flex flex-col">
                <span className="md:text-5xl font-bold text-2xl ml-4 text-center">{completionPercentage}%</span>
                <span className="md:text-sm text-xs ml-2 text-center text-muted-foreground">Completed ({checkedAchievements.length} / {achievements.length})</span>
            </div>
        </div>
        <blockquote className="text-sm md:text-base mb-3 mt-3">Explore the journey of dedication, hard work, and perseverance that has led to these remarkable accomplishments.</blockquote>
        </>
    );
}

