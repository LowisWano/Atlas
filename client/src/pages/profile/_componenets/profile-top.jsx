import { usePlayer } from "@/queries/usePlayer";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { Progress } from "@/components/ui/progress"

export default function ProfileTop(){
    const { getPlayerData } = usePlayer();
    const { playerInfo, userInfo, isLoading, error } = getPlayerData();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const playerData = playerInfo;
    const userData = userInfo;

    console.log("Fetched PlayerData: ", playerData);
    console.log("Fetched UserData: ", userData);

    const expProgress = (playerData?.experience || 0) / (playerData?.level * 1000) * 100;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h1 className="text-label tracking-wider text-5xl">
                    <strong>{userData?.name || "Unknown"}</strong>
                </h1>
            </div>
            <div>
                <h2 className="text-label tracking-wider text-xl text-gray-500">
                    Coolest dude in the world!
                </h2>
            </div>
            <h2 className="text-3xl font-bold">Level</h2>
            <div className="flex flex-col gap-2 w-3/12">
                <h2 className="text-label tracking-wider text-xl text-gray-500">
                    Level: {playerData?.level || 1}
                </h2>
                <div className="inline-flex relative object-center">
                    <Progress value={expProgress} className="h-[12px] w-9/12" /> 
                    <div className="absolute -inset-y-1 right-1">
                        {playerData?.experience} / {playerData?.level * 1000}
                    </div>
                </div>
            </div>
        </div>
    );
}