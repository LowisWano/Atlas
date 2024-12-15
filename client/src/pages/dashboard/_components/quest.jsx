/* eslint-disable react/prop-types */
import { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, Edit, EllipsisVerticalIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useQuests } from "@/queries/useQuests";
import { useToast } from "@/hooks/use-toast";

import EditQuestModal from "./edit-quest-modal";

export default function Quest({ quest }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checked, setChecked] = useState(quest.status === "COMPLETED");
  const { deleteQuestMutate, editQuestStatusMutate} = useQuests();
  const { toast } = useToast();
  const [open, setOpen] = useState(false)

  const editModalOpener = (e) => {
    e.preventDefault()
    setDropdownOpen(false)
    setOpen(true)
  }

  const handleCheckToggle = async (newValue) => {
    setChecked(newValue);
    const updatedStatus = newValue ? "COMPLETED" : "ACTIVE";
    await editQuestStatusMutate(quest.id, updatedStatus);
  };

  const deleteQuestHandler = async () => {
    try {
      await deleteQuestMutate(quest);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Delete failed!",
        description: err.response.data.error,
      });
    }
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex items-center flex-row justify-between py-5 pl-2">
          <div className="flex gap-2">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <EllipsisVerticalIcon
                  className={`${
                    isDropdownOpen ? "visible" : "invisible group-hover:visible"
                  } transition-opacity duration-300`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-10">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={editModalOpener}>
                    <span>Edit</span>
                    <DropdownMenuShortcut>
                      <Edit className="h-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={deleteQuestHandler}>
                    <span>Delete</span>
                    <DropdownMenuShortcut>
                      <Trash className="h-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-col gap-1">
              <CardTitle>{quest.title}</CardTitle>
              <CardDescription>{quest.description}</CardDescription>
              <div className="space-x-1 pt-1">
                <Badge variant="secondary" className="rounded-xl">
                  {quest.rewardGold} <span className="ml-1"><img src="/gold.png" alt="gold" className="w-3" /></span>
                </Badge>
                <Badge variant="secondary" className="rounded-xl">
                  {quest.rewardExp} <span className="ml-1"><img src="/levelup.png" alt="gold" className="w-3" /></span>
                </Badge>
              </div>
            </div>
          </div>
          <Checkbox
            checked={checked}
            onCheckedChange={handleCheckToggle}
            className="h-10 w-10"
          />
        </CardHeader>
      </Card>
      <EditQuestModal 
        open={open} 
        setOpen={setOpen} 
        isDropdownOpen={isDropdownOpen} 
        quest={quest}
      />
    </>
  );
}
