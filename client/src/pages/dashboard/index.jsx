import { useUserStore } from "@/hooks/auth-hooks";
import { H1, P } from "@/components/Typography";
import QuestsBlock from "./_components/quests-block";

export default function Dashboard() {
  const { user } = useUserStore()
  console.log(user)
  return (
    <div>
      <H1>Greetings, Adventurer!</H1>
      <P>Ready to embark on today&apos;s quests?</P>
      <QuestsBlock/>
    </div>
  )
}

