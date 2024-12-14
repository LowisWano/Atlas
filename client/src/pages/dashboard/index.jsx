import { useUserStore } from "@/hooks/auth-hooks";
import { useState } from 'react';
import { H1, P } from "@/components/Typography";
import QuestsBlock from "./_components/quests-block";
import QuestCategories from "./_components/quest-categories";
import { useQuests } from "@/queries/useQuests"

export default function Dashboard() {
  // const { user } = useUserStore()
  // console.log(user)
  const { getQuests } = useQuests();
  const { isPending, error, data } = getQuests();
  const [selectedCategory, setSelectedCategory] = useState('NORMAL_QUEST');
  
  return (
    <div className="p-4 md:p-1">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between mb-6">
        <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-0">
          <H1>Greetings, Adventurer!</H1>
          <P>Ready to embark on today&apos;s quests?</P>
        </div>
        <img 
          src="/hero-sprite.png" 
          alt="hero" 
          className="h-24 sm:h-32 mx-auto sm:mx-4 object-contain"
        />
      </div>
      
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-7">
        <QuestCategories 
          quests={data} 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <QuestsBlock 
          questsData={{ 
            isPending, 
            error, 
            data, 
          }}
          selectedCategory={selectedCategory} 
        />
      </div>
    </div>
  )
}

