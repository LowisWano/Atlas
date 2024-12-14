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
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <H1>Greetings, Adventurer!</H1>
          <P>Ready to embark on today&apos;s quests?</P>
        </div>
        <img src="/hero-sprite.png" alt="hero" className="h-32 mx-4"/>
      </div>
      

      <div className="flex w-full gap-7">
        <QuestCategories 
          quests={data} 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <QuestsBlock 
          questsData={
            { 
              isPending, 
              error, 
              data, 
            }
          }
          selectedCategory={selectedCategory} 
        />
      </div>
        
   
      
    </div>
  )
}

