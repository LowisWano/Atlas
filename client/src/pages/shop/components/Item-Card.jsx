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
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export default function ItemCard({photos}) {
  return (
    
              <Card className="w-36 m-2 transition-transform duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <img
                    src="https://global-sensors.com/wp-content/uploads/2021/07/test.jpg"
                    alt={`Photo ${photos.index}`}
                    className="w-full h-auto rounded-t-lg"
                  />
                </CardContent>
                <CardFooter className="flex justify-center bg-slate-900 pt-0 pb-0 rounded-b-xl transition-colors duration-300 hover:bg-slate-800">
                  <div className="flex justify-center items-center">
                    <img src="/chinese-coin.png" alt="" className="h-5 mt-1 mb-1" />
                    <div className="flex align-middle justify-center mx-3">
                      <p className="self-center">{photos.price}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            
  );
}
