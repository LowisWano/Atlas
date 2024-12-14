import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Search, SquareCheck } from "lucide-react";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import Quest from "./quest"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import AddQuestModal from "./add-quest-modal";
import { useQuests } from "@/queries/useQuests";

export default function QuestsBlock(){
  
  const { getQuests } = useQuests();
  const { isPending, error, data } = getQuests();

  if (isPending){
    return (
      <LoadingSpinner/>
    );
  }

  if (error){
    return (
      <div className="flex justify-center items-center p-20">
        Sorry, an error has occured. {error.message}
      </div> 
    );
  }
  
  const quests = data;
  const active = quests.filter(q => q.status === "ACTIVE");
  const completed = quests.filter(q => q.status === "COMPLETED");
  
  return(
    <div className="pt-5 flex-1">
      <Tabs defaultValue="active" className="">
        <Card>
          <CardHeader className="pb-1">
          <div className="pb-3 flex justify-between items-center">
            <div>
              <CardTitle className="scroll-m-20 text-4xl font-semibold tracking-tight">Quests</CardTitle>
              <CardDescription>Accomplish your quests!</CardDescription>
            </div>
            <AddQuestModal/>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 flex-1 md:grow-0">
            <TabsList className="grid w-full md:w-1/4 grid-cols-2 mb-3">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="active" className="">
          <div className="flex flex-col gap-5">
              {
                (active.length === 0) ? 
                  <div className="text-gray-500 flex items-center justify-center flex-col gap-1 h-72">
                    <SquareCheck className="h-14 w-14 mb-1" />
                    <p className="text-lg">These are your Quests</p>
                    <p>Quests need to be completed once. Earn exp and gold as you complete them.</p>
                  </div>
                : active.filter(q => q.status === "ACTIVE").map((q) => <Quest key={q.id} quest={q} />)
              }
            </div>
          </TabsContent>
          <TabsContent value="completed" className="">
            <div className="flex flex-col gap-5">
              {
                (completed.length === 0) ? 
                  <div className="text-gray-500 flex items-center justify-center flex-col gap-1 h-72">
                    <SquareCheck className="h-14 w-14 mb-1" />
                    <p className="text-lg">These are your Quests</p>
                    <p>Quests need to be completed once. Earn exp and gold as you complete them.</p>
                  </div>
                : completed.map((q) => <Quest key={q.id} quest={q} />)
              }
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
    </div>
  )
}