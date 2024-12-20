import * as React from "react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import DialogCard from "./Dialog-Card";
import { useItems } from "@/queries/useItems";

export default function Items({ items }) {
  const { getPlayerData, purchaseItemMutate, isPurchasing } = useItems();
  const { gold } = getPlayerData();

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 md:justify-start justify-center">
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <DialogCard 
                item={item} 
                playerGold={gold}
                onPurchase={purchaseItemMutate}
                isPurchasing={isPurchasing}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-100 text-slate-950 zoom-in-0">
              <span className="text-s">{item.itemName}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
