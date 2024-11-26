import { Card } from "@/components/ui/card";
import AchievementCard from "./achievement-card";

const AchievementList = ({ achievements , userAchievements }) => {
    return (
    <Card style={{ border: 'none' }} className="flex flex-col gap-1 shadow-md">
        {achievements.map((achievement, index) => (
            <AchievementCard
                key={achievement.id}
                achievement={achievement}
                userAchievements={userAchievements}
                isFirst={index === 0}
                isLast={index === achievements.length - 1}
            />
        ))}
    </Card>);
};

export default AchievementList;