import ShopHeader from "./components/ShopHeader";
import ShopItems from "./components/ShopItems";
import { useUserStore } from "@/hooks/auth-hooks";
import { H1, P } from "@/components/Typography";

export default function Shop() {
  const { user } = useUserStore()
  console.log(user)
  return (
    <div className="p-0 md:p-10">
      <ShopHeader />
      <ShopItems />
    </div>
  );
}