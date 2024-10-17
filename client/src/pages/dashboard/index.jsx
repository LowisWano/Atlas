import { useUserStore } from "@/hooks/auth-hooks";
import { H1, P } from "@/components/Typography";
import DashboardBlock from "./_components/dashboard-block";

export default function Dashboard() {
  const { user } = useUserStore()
  console.log(user)
  return (
    <div className="p-10">
      <H1>Greetings, Adventurer!</H1>
      <P>Ready to embark on today&apos;s quests?</P>
      <DashboardBlock/>
    </div>
  )
}

