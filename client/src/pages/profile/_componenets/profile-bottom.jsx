import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

export default function ProfileBottom() {
  const [activeTab, setActiveTab] = useState('showcase');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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

function Showcase() {
    return (
        <div className="flex border border-red-500">
            <TooltipProvider>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Item Showcase</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Card
                    </CardContent>
                </Card>
            </TooltipProvider>
            

            {/* <h1 className="text-center py-4">Showcase Content</h1> */}
        </div>
    );
}

function Stats() {
    return (
        <div className="flex border border-red-500">
            <h1 className="text-center py-4">Stats Content</h1>
        </div>
    );
}