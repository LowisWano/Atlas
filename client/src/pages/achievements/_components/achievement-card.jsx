import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const AchievementCard = ({ achievement, isFirst, isLast, userAchievements }) => {
    const checkedAchievement = userAchievements.some(userAchievement => userAchievement.achievementId === achievement.id);

    return (
        <div
            className={`p-4 flex items-center border border-gray-700 
                ${isFirst ? 'rounded-t-lg' : ''} 
                ${isLast ? 'rounded-b-lg' : ''}`}
        >
            <div className="mr-0 md:mr-4">
                <img src={achievement.iconImg} alt={achievement.title} className="hidden md:block w-16 h-16 object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                <CardHeader className="text-l md:text-xl font-semibold p-1">{achievement.title}</CardHeader>
                <Checkbox
                    id={`achievement-${achievement.id}`}
                    checked={checkedAchievement}
                    className="w-4 h-4 md:hidden"
                    disabled
                />
                </div>
                <CardContent className="text-sm md:text-base text-gray-600 p-1">{achievement.description}</CardContent>
                <CardFooter className="text-sm text-gray-400 p-1">
                    <img src="sprites/GoldCoins-Sprites.png" className="h-6 md:h-10" />{achievement.rewardGold}
                    <img src="sprites/Experience-Sprites.png" className="h-6 md:h-10" /> {achievement.rewardExp}
                </CardFooter>
            </div>
            <div className="ml-auto hidden md:block">
                <Checkbox
                    id={`achievement-${achievement.id}`}
                    checked={checkedAchievement}
                    className="w-10 h-10"
                    disabled
                />
            </div>
        </div>
    );
};

export default AchievementCard;