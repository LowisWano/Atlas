import { usePlayer } from "@/queries/usePlayer";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { Progress } from "@/components/ui/progress"
import { useItems } from "@/queries/useItems";
import { SquarePen } from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProfileTop(){
    const { getPlayerData } = usePlayer();
    const { playerInfo, userInfo, isLoading, error } = getPlayerData();

    const { getPlayerItems } = useItems();
    const itemsData = getPlayerItems();
    
    if (isLoading || itemsData.isPending){
        return <LoadingSpinner />;
    }

    if (error || itemsData.error){
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const playerData = playerInfo;
    const userData = userInfo;
    const playerItems = itemsData.data;

    console.log("Fetched PlayerData: ", playerData);
    console.log("Fetched UserData: ", userData);
    console.log("Fetched itemsData: ", playerItems);

    const expProgress = (playerData?.experience || 0) / (playerData?.level * 1000) * 100;

    return (
        <div className="flex flex-row justify-center gap-5">
            
            <div className="flex flex-col w-7/12 gap-3">

                <div className="flex flex-col gap-3 ">
                    <span className="inline-flex text-label tracking-wider text-4xl gap-3">
                        <strong>{userData?.name || "Unknown"}</strong> 

                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>

                            <div className="h-7 w-7 rounded-full flex justify-center items-center bg-slate-600 cursor-pointer">
                                <SquarePen className="h-4 w-4"/>
                            </div>

                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Edit Profile</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>

                    </span>
                    <blockquote className="hidden md:block italic text-base text-muted-foreground mt-2">
                        Coolest dude in the world!
                    </blockquote>
                </div>

                <div className="flex flex-row space-x-10">
                    <div className="flex flex-col gap-2 w-6/12">
                        <span className="text-xl font-bold">Level</span>
                        <span className="text-label tracking-wider text-base text-gray-500">
                            Level: {playerData?.level || 1}
                        </span>
                        <div className="inline-flex relative object-center">
                            <Progress value={expProgress} className="h-[12px] w-9/12"/> 
                            <div className="absolute -inset-y-1 right-1 text-sm">
                                {playerData?.experience} / {playerData?.level * 1000}
                            </div>
                        </div>
                        <span className="text-label tracking-wider text-base text-gray-500">
                            Rank: {playerData?.adventurerRank || 1}
                        </span>
                        <div className="inline-flex relative object-center">
                            <Progress value={expProgress} className="h-[12px] w-9/12"/> 
                            <div className="absolute -inset-y-1 right-1 text-sm">
                                {playerData?.experience} / {playerData?.level * 1000}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-3/12">
                        <h2 className="text-xl font-bold">Wealth</h2>
                        <div className="flex flex-col gap-2">
                            <span className="text-label tracking-wider text-base text-gray-500">
                                Wallet:
                            </span>   
                            <div className="inline-flex gap-2 relative">
                                <img src="chinese-coin.png" className="h-3"/> <span className="absolute -inset-y-1 left-5 text-sm"> {playerData?.gold?.toLocaleString() || 0} </span>
                            </div>
                            <span className="text-label tracking-wider text-base text-gray-500">
                                Total Net Worth:
                            </span>   
                            <div className="inline-flex gap-2 relative">
                                <img src="chinese-coin.png" className="h-3"/> <span className="absolute -inset-y-1 left-5 text-sm"> {((playerData.gold) + playerItems.reduce((total, item) => total + item.item.price, 0)).toLocaleString() || 0} </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-3/12">
                        <h2 className="text-xl font-bold">Items</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <span className="text-label tracking-wider text-base text-gray-500">
                                    Unique: {playerItems.filter(item => (item.item.rarity === 'EPIC' || item.rarity === 'LEGENDARY')).length}
                                </span>   
                                <span className="text-label tracking-wider text-sm text-gray-500">
                                    Total: {playerItems.length}
                                </span>   
                            </div>
                            
                            <span className="text-label tracking-wider text-base text-gray-500">
                                Value:
                            </span>   
                            <div className="inline-flex gap-2 relative">
                                <img src="chinese-coin.png" className="h-3"/> <span className="absolute -inset-y-1 left-5 text-sm"> {playerItems.reduce((total, item) => total + item.item.price, 0).toLocaleString() || 0} {/* Sum all prices */}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>

            <div className="flex justify-center items-center cursor-pointer">
                <div className="h-64">
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