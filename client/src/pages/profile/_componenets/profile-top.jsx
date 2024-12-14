import { usePlayer } from "@/queries/usePlayer";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { Progress } from "@/components/ui/progress"
import { useItems } from "@/queries/useItems";

export default function ProfileTop(){
    const { getPlayerData } = usePlayer();
    const { playerInfo, userInfo, isLoading, error } = getPlayerData();

    const { getItems } = useItems();
    const itemsData = getItems();
    
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
    console.log("Fetched itemsData: ", itemsData);

    const expProgress = (playerData?.experience + 270 || 0) / (playerData?.level * 1000) * 100;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <span className="text-label tracking-wider text-5xl">
                    <strong>{userData?.name || "Unknown"}</strong>
                </span>
            </div>
            <div>
                <span className="text-label tracking-wider text-xl text-gray-500">
                    Coolest dude in the world!
                </span>
            </div>


            <div className="flex flex-row border border-red-500 w-2/3">

                <div className="flex flex-col gap-2 w-2/5 border border-red-500">
                    <span className="text-3xl font-bold">Level</span>
                    <span className="text-label tracking-wider text-xl text-gray-500">
                        Level: {playerData?.level || 1}
                    </span>
                    <div className="inline-flex relative object-center">
                        <Progress value={expProgress} className="h-[12px] w-9/12"/> 
                        <div className="absolute -inset-y-1 right-1">
                            {playerData?.experience} / {playerData?.level * 1000}
                        </div>
                    </div>
                    <span className="text-label tracking-wider text-xl text-gray-500">
                        Rank: {playerData?.rank || 1}
                    </span>
                    <div className="inline-flex relative object-center">
                        <Progress value={expProgress} className="h-[12px] w-9/12"/> 
                        <div className="absolute -inset-y-1 right-1">
                            {playerData?.experience} / {playerData?.level * 1000}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-2/5 border border-red-500">
                    <h2 className="text-3xl font-bold">Wealth</h2>
                    <div className="flex flex-col gap-2">
                        <span className="text-label tracking-wider text-lg text-gray-500">
                            Wallet:
                        </span>   
                        <div className="inline-flex">
                            <img src="chinese-coin.png" className="h-5"/> {playerData?.gold?.toLocaleString() || 0}
                        </div>
                        <span className="text-label tracking-wider text-lg text-gray-500">
                            Total Net Worth:
                        </span>   
                        <div className="inline-flex">
                            <img src="chinese-coin.png" className="h-5"/> {playerData?.gold?.toLocaleString() || 0}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}