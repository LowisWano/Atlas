import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QuestCategories() {
  const categories = [
    {
      name: "Normal Quests",
      count: 0,
      total: 5,
    },
    {
      name: "Daily Quests",
      count: 0,
      total: 5,
    },
    {
      name: "Main Quests",
      count: 0,
      total: 5,
    },
  ]

  return (
    <div className="pt-5 w-1/4">
      <div className="flex flex-col gap-4">
        {
          categories.map((c) => (
            <Card key={c.name}>
              <CardHeader>
                <div>{c.name}</div>
                <div>{c.count}/{c.total}</div>
              </CardHeader>
            </Card>
          ))
        }
      </div>
      
    </div>
  )
}