import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { H1, H2, H3, H4, P } from "@/components/Typography";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function DialogCard({ item }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {/* Card content is here */}
          <Card className="w-36 m-2 transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-0">
              <img
                src={item.item_img}
                alt={`Photo ${item.index}`}
                className="w-full h-auto rounded-t-lg"
              />
            </CardContent>
            <CardFooter className="flex justify-center pt-0 pb-0 rounded-b-xl transition-colors duration-300 bg-purple-700 hover:bg-purple-600 text-white">
              <div className="flex justify-center items-center">
                <img src="/chinese-coin.png" alt="" className="h-5 mt-1 mb-1" />
                <div className="flex align-middle justify-center mx-3">
                  <p className="self-center">{item.price}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        {/* Dialog or Modal content here */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex">
              {/* User Gold amount goes here */}
              <img src="/chinese-coin.png" alt="" className="h-5 mt-1 mb-1" />
              <div className="flex align-middle justify-center mx-1">
                <P className="self-center">0</P>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex justify-center">
              <img
                src={item.item_img}
                alt={`Photo ${item.index}`}
                className="w-full md:w-6/12 h-auto rounded-lg"
              />
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-justify">{item.description}</p>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-center">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => console.log("Buy")} className="ml-2">
              <img src="/chinese-coin.png" alt="" className="h-5 mt-1 mb-1" />
              {item.price}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}