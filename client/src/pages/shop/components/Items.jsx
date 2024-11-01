import * as React from "react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import DialogCard from "./Dialog-Card";

export default function Items({ items }) {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap justify-center gap-2 border-2 border-transparent">
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <DialogCard item={item} />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-100 text-slate-950 zoom-in-0">
              <span className="text-s">{item.item_name}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
