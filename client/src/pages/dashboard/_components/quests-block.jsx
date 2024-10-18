import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Search } from "lucide-react";
import Quest from "./quest"
import { Input } from "@/components/ui/input";

export default function QuestsBlock(){
  const quests = [
    {
      id: 1,
      title: "Defeat the Dragon",
      description: "Slay the dragon terrorizing the village and save the townspeople.",
      rewards: {
        gold: 500,
        exp: 1500,
      },
    },
    {
      id: 2,
      title: "Gather Herbs for the Healer",
      description: "Collect 10 healing herbs from the forest for the town healer.",
      rewards: {
        gold: 100,
        exp: 300,
      },
    },
    {
      id: 3,
      title: "Escort the Merchant",
      description: "Safeguard the merchant on their journey through the dangerous mountains.",
      rewards: {
        gold: 200,
        exp: 600,
      },
    },
    {
      id: 4,
      title: "Explore the Ancient Ruins",
      description: "Uncover the secrets hidden in the ruins of an ancient civilization.",
      rewards: {
        gold: 300,
        exp: 900,
      },
    },
    {
      id: 5,
      title: "Retrieve the Stolen Artifact",
      description: "Recover the magical artifact stolen by bandits from the local museum.",
      rewards: {
        gold: 250,
        exp: 800,
      },
    },
    {
      id: 6,
      title: "Rescue the Captive Villagers",
      description: "Free the villagers captured by a group of marauding thieves.",
      rewards: {
        gold: 350,
        exp: 1000,
      },
    },
    {
      id: 7,
      title: "Investigate the Haunted Mansion",
      description: "Investigate reports of strange occurrences in the abandoned mansion.",
      rewards: {
        gold: 150,
        exp: 500,
      },
    },
    {
      id: 8,
      title: "Find the Lost Treasure",
      description: "Search for the legendary treasure hidden deep in the enchanted forest.",
      rewards: {
        gold: 600,
        exp: 2000,
      },
    },
  ];
  
  return(
    <div className="pt-5">
      <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-3xl font-semibold tracking-tight">Quests</CardTitle>
        <CardDescription>Accomplish your quests!</CardDescription>
        <div className="relative mr-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {
          quests.map((q) => <Quest key={q.id} quest={q} />)
        }
      </CardContent>
    </Card>
    </div>
  )
}