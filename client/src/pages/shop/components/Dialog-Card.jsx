// DialogCard.jsx
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
import { cn } from "@/lib/utils";

export default function DialogCard({
  item,
  playerGold,
  onPurchase,
  isPurchasing,
}) {
  const isOwned = item.isOwned;
  const canAfford = item.canAfford;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-36 m-2 transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-5">
              <img
                src={item.itemImg}
                alt={`Photo ${item.itemName}`}
                className="w-full h-auto rounded-t-lg"
              />
            </CardContent>
            <CardFooter className="flex justify-center pt-0 pb-0 rounded-b-xl transition-colors duration-300 bg-purple-700 hover:bg-purple-600 text-white">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex">
              <img src="/chinese-coin.png" alt="" className="h-5 mt-1 mb-1" />
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
                className="w-full md:w-6/12 h-auto rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4 items-center mt-4">
              <p className="text-justify">{item.description}</p>
              {!isOwned && !canAfford && (
                <p className="font-bold text-red-500">
                  You don't have enough gold to purchase this item!
                </p>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-center gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {isOwned ? (
              <Button disabled className="ml-2 bg-green-600">
                Owned
              </Button>
            ) : (
              <Button
                onClick={() => onPurchase(item.id)}
                disabled={!canAfford || isPurchasing}
                className={cn(
                  "ml-2",
                  !canAfford
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-purple-700 hover:bg-purple-600"
                )}
              >
                <img src="/chinese-coin.png" alt="" className="h-5 mr-2" />
                {item.price}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
