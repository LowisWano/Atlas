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

export default function Items({ photos }) {
  return (
    <div className="flex flex-wrap justify-between">
      {photos.map((photo, index) => (
        <Card key={index} className="w-80 m-2">
          <CardHeader>
            <CardTitle className="flex justify-center">
              Create project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src="https://global-sensors.com/wp-content/uploads/2021/07/test.jpg"
              alt={`Photo ${index}`}
              className="w-full h-auto"
            />
          </CardContent>
          <CardFooter className="flex justify-center bg-slate-900 pt-3 pb-3">
          <div className="flex justify-center items-center">
              <img src="/chinese-coin.png" alt="" className="h-9" />
              <div className="flex align-middle justify-center mx-3">
                <H4 className="self-center">{photo.price}</H4>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
