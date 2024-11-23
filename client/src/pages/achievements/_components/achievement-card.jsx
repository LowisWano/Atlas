import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const AchievementCard = ({ achievement, isFirst, isLast }) => (
        <div
        className={`p-4 flex items-center border border-gray-700 
            ${isFirst ? 'rounded-t-lg' : ''} 
            ${isLast ? 'rounded-b-lg' : ''}`}
    >
        <div className="mr-4"><img src={achievement.iconImg} alt={achievement.title} className="w-16 h-16 object-cover" />
        </div>
        <div className="flex-1">
            <CardHeader className="text-xl font-semibold p-1">{achievement.title}</CardHeader>
            <CardContent className="text-gray-600 p-1">{achievement.description}</CardContent>
            <CardFooter className="text-sm text-gray-400 p-1"><img src="sprites/GoldCoins-Sprites.png"/>{achievement.rewardGold} <img src="sprites/Experience-Sprites.png"/> {achievement.rewardExp} </CardFooter>
        </div>
        <div className="ml-auto">
            {/* <Checkbox
            id={`achievement-${achievement.id}`}
            checked={checkedAchievement}
            className="w-10 h-10"
            disabled
            /> */}
        </div>
    </div>
);

export default AchievementCard;