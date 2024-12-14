import { useUserStore } from "@/hooks/auth-hooks";
import AchievementsBlock from './_components/achievements-block';
import AchievementsHeader from './_components/achievement-header';

export default function Achievements(){
    const { user } = useUserStore()
    console.log(user)
    return (
    <div>
        <AchievementsHeader />
        <AchievementsBlock />
    </div>
    )
}