import ShopHeader from "./components/ShopHeader";
import ShopItems from "./components/ShopItems";
import { useUserStore } from "@/hooks/auth-hooks";
import { H1, P } from "@/components/Typography";

export default function Shop() {
  const { user } = useUserStore()
  return (
    <div className="md:p-0 p-5">
      <ShopHeader />
      <ShopItems />
    </div>
  );
}