import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { H1, H2, H3, H4, P } from "@/components/Typography";

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
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <DialogCard item={item} />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-100 text-slate-950 zoom-in-0">
              <span className="text-s">Item name</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
