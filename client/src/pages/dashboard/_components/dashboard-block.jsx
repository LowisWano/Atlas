import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { H4 } from "@/components/Typography";

import Quest from "./quest"

export default function DashboardBlock(){
  const quests = [
    {
      title: "Defeat the Dragon",
      description: "Slay the dragon terrorizing the village and save the townspeople.",
      rewards: {
        gold: 500,
        exp: 1500,
      },
    },
    {
      title: "Gather Herbs for the Healer",
      description: "Collect 10 healing herbs from the forest for the town healer.",
      rewards: {
        gold: 100,
        exp: 300,
      },
    },
    {
      title: "Escort the Merchant",
      description: "Safeguard the merchant on their journey through the dangerous mountains.",
      rewards: {
        gold: 200,
        exp: 600,
      },
    },
    {
      title: "Explore the Ancient Ruins",
      description: "Uncover the secrets hidden in the ruins of an ancient civilization.",
      rewards: {
        gold: 300,
        exp: 900,
      },
    },
    {
      title: "Retrieve the Stolen Artifact",
      description: "Recover the magical artifact stolen by bandits from the local museum.",
      rewards: {
        gold: 250,
        exp: 800,
      },
    },
    {
      title: "Rescue the Captive Villagers",
      description: "Free the villagers captured by a group of marauding thieves.",
      rewards: {
        gold: 350,
        exp: 1000,
      },
    },
    {
      title: "Investigate the Haunted Mansion",
      description: "Investigate reports of strange occurrences in the abandoned mansion.",
      rewards: {
        gold: 150,
        exp: 500,
      },
    },
    {
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
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {
          quests.map((q) => <Quest key={q.title} title={q.title} description={q.description} rewards={q.rewards} />)
        }
      </CardContent>
    </Card>
    </div>
  )
}