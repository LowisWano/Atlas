import { usePlayer } from "@/queries/usePlayer";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { Progress } from "@/components/ui/progress"
import { useItems } from "@/queries/useItems";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

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
        <div className="flex flex-row justify-center gap-5 justify-self-center">
            
            <div className="flex flex-col w-7/12 gap-3">

                <div className="flex flex-col gap-3 ">
                    <span className="text-label tracking-wider text-5xl">
                        <strong>{userData?.name || "Unknown"}</strong>
                    </span>
                    <span className="text-label tracking-wider text-xl text-gray-500">
                        Coolest dude in the world!
                    </span>
                </div>

                <div className="flex flex-row space-x-10">
                    <div className="flex flex-col gap-2 w-6/12">
                        <span className="text-3xl font-bold">Level</span>
                        <span className="text-label tracking-wider text-xl text-gray-500">
                            Level: {playerData?.level || 1}
                        </span>
                        <div className="inline-flex relative object-center">
                            <Progress value={expProgress} className="h-[12px] w-9/12"/> 
                            <div className="absolute -inset-y-1.5 right-1">
                                {playerData?.experience} / {playerData?.level * 1000}
                            </div>
                        </div>
                        <span className="text-label tracking-wider text-xl text-gray-500">
                            Rank: {playerData?.adventurerRank || 1}
                        </span>
                        <div className="inline-flex relative object-center">
                            <Progress value={expProgress} className="h-[12px] w-9/12"/> 
                            <div className="absolute -inset-y-1 right-1">
                                {playerData?.experience} / {playerData?.level * 1000}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-3/12">
                        <h2 className="text-3xl font-bold">Wealth</h2>
                        <div className="flex flex-col gap-2">
                            <span className="text-label tracking-wider text-lg text-gray-500">
                                Wallet:
                            </span>   
                            <div className="inline-flex gap-2">
                                <img src="chinese-coin.png" className="h-5"/> {playerData?.gold?.toLocaleString() || 0}
                            </div>
                            <span className="text-label tracking-wider text-lg text-gray-500">
                                Total Net Worth:
                            </span>   
                            <div className="inline-flex gap-2">
                                <img src="chinese-coin.png" className="h-5"/> {playerData?.gold?.toLocaleString() || 0}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2  w-3/12">
                        <h2 className="text-3xl font-bold">Items</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <span className="text-label tracking-wider text-base text-gray-500">
                                    Unique:
                                </span>   
                                <span className="text-label tracking-wider text-base text-gray-500">
                                    Total:
                                </span>   
                            </div>
                            
                            <span className="text-label tracking-wider text-lg text-gray-500">
                                Valiue:
                            </span>   
                            <div className="inline-flex gap-2">
                                <img src="chinese-coin.png" className="h-5"/> {playerData?.gold?.toLocaleString() || 0}
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>

            <div className="flex justify-center items-center">
                <div className="h-96">
                    <img
                        src={playerInfo?.profilePic || "https://github.com/shadcn.png"}
                        alt="avatar"
                        className="rounded-xl h-full w-full object-cover"
                    />
                </div>
            </div>


        </div>
    );
}