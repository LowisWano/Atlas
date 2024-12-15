import React, { useState } from 'react';
import { useItems } from "@/queries/useItems";
import { usePlayer } from "@/queries/usePlayer";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import Showcase from './showcase'; 
import Stats from './stats';

export default function ProfileBottom() {
  const [activeTab, setActiveTab] = useState('showcase');
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const playerData = playerInfo;
  const userData = userInfo;
  const playerItems = itemsData.data;

  return (
    <div>
      <div className="tabs space-x-3 flex justify-center font-bold">
        <button
          className={`tab-button ${activeTab === 'showcase' ? 'underline decoration-purple-800 decoration-4 underline-offset-8' : ''}`}
          onClick={() => handleTabChange('showcase')}
        >
          Showcase
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'underline decoration-purple-800 decoration-4 underline-offset-8' : ''}`}
          onClick={() => handleTabChange('stats')}
        >
          Stats
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'showcase' && <Showcase />}
        {activeTab === 'stats' && <Stats />}
      </div>
    </div>
  );
}