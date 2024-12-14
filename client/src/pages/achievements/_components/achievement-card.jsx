import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
                    disableds
                />
                </div>
                <CardContent className="text-sm md:text-base text-gray-600 p-1">{achievement.description}</CardContent>
                <CardFooter className="text-sm text-gray-400 p-1">
                <div className="space-x-1 pt-1">
                    <Badge variant="secondary" className="rounded-xl">
                        <img src="chinese-coin.png" className="w-3" />{achievement.rewardGold}
                    </Badge>
                    <Badge variant="secondary" className="rounded-xl">
                        <img src="levelup.png" className="w-3" /> {achievement.rewardExp}
                    </Badge>
                </div>
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