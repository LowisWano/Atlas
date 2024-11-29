import { useUserStore } from "@/hooks/auth-hooks";
import AchievementsBlock from './_components/achievements-block';
import AchievementsHeader from './_components/achievement-header';

export default function Achievements(){
    const { user } = useUserStore()
    console.log(user)
    return (
    <div className="p-0 md:p-10">
        <AchievementsHeader />
        <AchievementsBlock />
    </div>
    )
}