import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QuestCategories({ quests, selectedCategory, onCategorySelect }) {
  const categories = [
    {
      name: "Normal Quests",
      type: "NORMAL_QUEST",
      count: quests?.filter(q => q.questType === "NORMAL_QUEST" && q.status === "COMPLETED").length || 0,
      total: quests?.filter(q => q.questType === "NORMAL_QUEST").length || 0,
    },
    {
      name: "Daily Quests",
      type: "DAILY_QUEST",
      count: quests?.filter(q => q.questType === "DAILY_QUEST" && q.status === "COMPLETED").length || 0,
      total: quests?.filter(q => q.questType === "DAILY_QUEST").length || 0,
    },
    {
      name: "Main Quests",
      type: "MAIN_QUEST",
      count: quests?.filter(q => q.questType === "MAIN_QUEST" && q.status === "COMPLETED").length || 0,
      total: quests?.filter(q => q.questType === "MAIN_QUEST").length || 0,
    },
  ]

  return (
    <div className="pt-5 w-1/4">
      <div className="flex flex-col gap-4">
        {categories.map((c) => (
          <Card 
            key={c.type}
            className={`cursor-pointer hover:bg-secondary/80 transition-colors
              ${selectedCategory === c.type ? 'bg-secondary' : ''}`}
            onClick={() => onCategorySelect(c.type)}
          >
            <CardHeader className="p-4">
              <div className="font-bold">{c.name}</div>
              <div>{c.count}/{c.total}</div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}