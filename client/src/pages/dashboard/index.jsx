import { Toaster } from "@/components/ui/toaster";
import { useUserStore } from "@/hooks/auth-hooks";

export default function Dashboard() {
  const { user } = useUserStore()
  console.log(user)
  return (
    <div>
      dashboard
      <Toaster />
    </div>
  )
}

