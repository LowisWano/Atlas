import { useUserStore } from "@/hooks/auth-hooks";
import ProfileBlock from "./_componenets/profile-block";

export default function Achievements(){
    const { user } = useUserStore()
    console.log(user)
    return (
    <div>
        <ProfileBlock />
    </div>
    )
}