import { useState } from 'react';
import { usePlayer } from '@/queries/usePlayer';
import LoadingSpinner from '@/components/custom-ui/loading-spinner';
import { Progress } from '@/components/ui/progress';
import { useItems } from '@/queries/useItems';
import { SquarePen } from 'lucide-react';
import EditProfileModal from './edit-profile-modal';

const calculateLevelThreshold = (level) => {
  return Math.pow(level, 2) * 1000;
};

const calculateExpProgress = (level, currentExp) => {
  const prevLevelThreshold = Math.pow(level - 1, 2) * 1000;
  const currentLevelThreshold = calculateLevelThreshold(level);
  
  const expInCurrentLevel = currentExp - prevLevelThreshold;
  const expNeededForLevel = currentLevelThreshold - prevLevelThreshold;
  
  const progressPercentage = Math.floor((expInCurrentLevel / expNeededForLevel) * 100);
  
  return {
    progress: Math.max(0, Math.min(100, progressPercentage)),
    actualExp: expInCurrentLevel,
    neededExp: expNeededForLevel
  };
};

const calculateRankProgress = (playerData, rankPoints) => {
  const thresholds = {
    COPPER: { min: 0, max: 9 },
    IRON: { min: 10, max: 29 },
    SILVER: { min: 30, max: 59 },
    GOLD: { min: 60, max: 99 },
    PLATINUM: { min: 100, max: 149 },
    MYTHRIL: { min: 150, max: 209 },
    ADAMANTITE: { min: 210, max: 210 }
  };

  const currentRank = playerData?.adventurerRank || 'COPPER';
  const currentThreshold = thresholds[currentRank];
  const nextRankNeeded = currentRank === 'ADAMANTITE' ? 
    currentThreshold.max : 
    thresholds[Object.keys(thresholds)[Object.keys(thresholds).indexOf(currentRank) + 1]].min;
  
  const progress = ((rankPoints - currentThreshold.min) / (nextRankNeeded - currentThreshold.min)) * 100;
  
  return {
    progress: Math.max(0, Math.min(100, progress)),
    currentPoints: rankPoints,
    neededPoints: nextRankNeeded
  };
};


export default function ProfileTop() {
  const [open, setOpen] = useState(false);
  const { getPlayerData } = usePlayer();
  const { playerInfo, userInfo, isLoading, error } = getPlayerData();

  const { getPlayerItems } = useItems();
  const itemsData = getPlayerItems();

  if (isLoading || itemsData.isPending) {
    return <LoadingSpinner />;
  }

  if (error || itemsData.error) {
    return (
      <div className="flex justify-center items-center p-20">
        Sorry, an error has occurred. {error.message}
      </div>
    );
  }

  const playerData = playerInfo;
  const userData = userInfo;
  const playerItems = itemsData.data;

  const rankProgress = (playerData?.rankPoints || 0) / (playerData?.level * 1000) * 100;

  const { progress, actualExp, neededExp } = calculateExpProgress(playerData?.level || 1, playerData?.experience || 0);
  const rankProgressData = calculateRankProgress(playerData, playerData.rankPoints || 0);
 

  const editModalOpener = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-5 p-5">
      <div className="flex flex-col w-full md:w-7/12 gap-3">
        <div className="flex flex-col gap-3">
          <span className="inline-flex text-lg md:text-4xl tracking-wider gap-3">
            <strong>{userData?.name || 'Unknown'}</strong>
            <div
              className="h-7 w-7 rounded-full flex justify-center items-center bg-slate-600 cursor-pointer"
              onClick={editModalOpener}
            >
              <SquarePen className="h-4 w-4" />
            </div>
          </span>
          <blockquote className="block italic text-sm md:text-base text-muted-foreground mt-2">
            {playerData?.bio}
          </blockquote>
        </div>

        <div className="flex justify-center items-center md:hidden">
          <div className="h-40 w-40 md:h-64 md:w-64 rounded-xl overflow-hidden">
            <img
              src={playerInfo?.profilePic || 'src/assets/profile/noPfp.jpg'}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10">
          <div className="flex flex-col gap-2 w-full md:w-6/12">
            <span className="text-lg md:text-xl font-bold">Level</span>
            <span className="text-base text-gray-500">Level: {playerData?.level || 1}</span>
            <div className="relative">
              <div>
                <Progress value={progress} className="h-[12px] w-full" />
              </div>
              <div className="absolute -inset-y-1 right-1 text-sm">
                {actualExp.toLocaleString()} / {neededExp.toLocaleString()}
              </div>
            </div>
            <span className="text-base text-gray-500">Rank: {playerData?.adventurerRank || 'COPPER'}</span>
            <div className="relative">
              <div>
                <Progress value={rankProgressData.progress} className="h-[12px] w-full" />
              </div>
              <div className="absolute -inset-y-1 right-1 text-sm">
                {rankProgressData.currentPoints} / {rankProgressData.neededPoints}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-3/12">
            <h2 className="text-lg md:text-xl font-bold">Wealth</h2>
            <div className="flex flex-col gap-2">
              <span className="text-base text-gray-500">Wallet:</span>
              <div className="flex items-center gap-2">
                <img src="chinese-coin.png" className="h-3" />
                <span>{playerData?.gold?.toLocaleString() || 0}</span>
              </div>
              <span className="text-base text-gray-500">Total Net Worth:</span>
              <div className="flex items-center gap-2">
                <img src="chinese-coin.png" className="h-3" />
                <span>
                  {((playerData.gold) + playerItems.reduce((total, item) => total + item.item.price, 0)).toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-3/12">
            <h2 className="text-lg md:text-xl font-bold">Items</h2>
            <div className="flex flex-col gap-2">
              <span className="text-base text-gray-500">
                Unique: {playerItems.filter(item => item.item.rarity === 'EPIC' || item.item.rarity === 'LEGENDARY').length}
              </span>
              <span className="text-sm text-gray-500">Total: {playerItems.length}</span>
              <span className="text-base text-gray-500">Value:</span>
              <div className="flex items-center gap-2">
                <img src="chinese-coin.png" className="h-3" />
                <span>
                  {playerItems.reduce((total, item) => total + item.item.price, 0).toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center items-center hidden md:flex">
        <div className="h-40 w-40 md:h-64 md:w-64 rounded-xl overflow-hidden">
          <img
            src={playerInfo?.profilePic || 'src/assets/profile/noPfp.jpg'}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <EditProfileModal open={open} setOpen={setOpen} playerData={playerData} userData={userData} />
    </div>
  );
}