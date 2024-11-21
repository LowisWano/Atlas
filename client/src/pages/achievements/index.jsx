import { useUserStore } from "@/hooks/auth-hooks";
import { H1, P } from "@/components/Typography";
import AchievementsBlock from './_components/achievements-block';

export default function Achievements(){
    const { user } = useUserStore()
    console.log(user)
    return (
    <div className="p-10">
        <H1>Greetings, Adventurer!</H1>
        <P>Here are all of your Achivements:</P>
        <AchievementsBlock />
    </div>
    )
}