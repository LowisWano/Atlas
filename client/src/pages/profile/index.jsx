import { useUserStore } from "@/hooks/auth-hooks";
import ProfileBlock from "./_componenets/profile-block";

export default function Achievements(){
    const { user } = useUserStore()
 
    return (
    <div>
        <ProfileBlock />
    </div>
    )
}