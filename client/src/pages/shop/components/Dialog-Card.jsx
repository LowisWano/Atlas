// DialogCard.jsx
import * as React from "react";
import { useState } from "react";
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
import { cn } from "@/lib/utils";

export default function DialogCard({
  item,
  playerGold,
  onPurchase,
  isPurchasing,
}) {
  const isOwned = item.isOwned;
  const canAfford = item.canAfford;
  const [open,setOpen] = useState(false);
  return (
    <>
      <Dialog open = {open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="w-[50px] h-[70px] md:w-36 md:h-[170px] m-1 transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-1 md:p-5 h-full md:h-auto">
              <img
                src={item.itemImg}
                alt={`Photo ${item.itemName}`}
                className="w-full h-full object-contain rounded-lg md:rounded-t-lg"
              />
            </CardContent>
            <CardFooter className="hidden md:flex justify-center pt-0 pb-0 rounded-b-xl transition-colors duration-300 bg-zinc-900 dark:bg-purple-700 hover:bg-gray-300 dark:hover:bg-purple-600 text-white dark:text-white">
              <div className="flex justify-center items-center">
                {isOwned ? (
                  <p className="self-center py-1">Owned</p>
                ) : (
                  <>
                    <img
                      src="/chinese-coin.png"
                      alt=""
                      className="h-5 mt-1 mb-1"
                    />
                    <div className="flex align-middle justify-center mx-3">
                      <p className="self-center">{item.price}</p>
                    </div>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-[90vw] max-w-md md:w-full p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center text-base md:text-lg">
              <img src="/chinese-coin.png" alt="" className="h-4 md:h-5" />
              <div className="flex align-middle justify-center mx-1">
                <P className="self-center">{playerGold}</P>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex justify-center">
              <img
                src={item.itemImg}
                alt={`Photo ${item.itemName}`}
                className="w-full max-w-[200px] md:max-w-[250px] h-auto rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 md:gap-4 items-center mt-3 md:mt-4">
              <p className="text-sm md:text-base text-justify">
                {item.description}
              </p>
              {!isOwned && !canAfford && (
                <p className="text-sm md:text-base font-bold text-red-500">
                  You don't have enough gold to purchase this item!
                </p>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-center gap-2 pt-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="text-sm md:text-base px-3 md:px-4"
              >
                Cancel
              </Button>
            </DialogClose>
            {isOwned ? (
              <Button
                disabled
                className="ml-2 bg-green-600 text-sm md:text-base"
              >
                Owned
              </Button>
            ) : (
              <Button
                onClick={() => {onPurchase(item.id);setOpen(false);}}
                disabled={!canAfford || isPurchasing}
                className={cn(
                  "ml-2 text-sm md:text-base",
                  !canAfford
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-zinc-900 dark:bg-purple-700 hover:bg-gray-300 dark:hover:bg-purple-600 text-white dark:text-white"
                )}
              >
                <img
                  src="/chinese-coin.png"
                  alt=""
                  className="h-4 md:h-5 mr-2"
                />
                {item.price}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
