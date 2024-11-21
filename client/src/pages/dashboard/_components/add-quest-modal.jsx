import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CopyPlus } from "lucide-react"

import DueDatePicker from "./due-date-picker"
import SelectDifficulty from "./select-difficulty"
import SelectQuestType from "./select-quest-type"

import { useQuests } from "@/queries/useQuests"
import { useUserStore } from "@/hooks/auth-hooks";
import { useToast } from "@/hooks/use-toast"

export default function AddQuestModal() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const { createQuestMutate } = useQuests();
  const { toast } = useToast();

  const addQuestHandler = async (e) => {
    e.preventDefault()
    
    try{
      const formData = new FormData(e.target);
      const newQuest = {
        title: formData.get('title'),
        description: formData.get('description'),
        questType: formData.get('questType'),
        dueDate: (new Date(date)).toISOString(),
        difficulty: formData.get('selectDifficulty'),
      };
      await createQuestMutate(newQuest);
      toast({
        title: "Quest Created!",
        description: "Your new quest has been added successfully.",
      })
      setOpen(false);
    }catch(err){
      toast({
        variant: "destructive",
        title: "Login Failed!",
        description: err.response.data.error,
      })
    }
    setDate(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <span className="hidden sm:inline">Add Quest</span>
          <CopyPlus className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Quest</DialogTitle>
          <DialogDescription>
            Create a new quest by filling out the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addQuestHandler}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Add a title"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add a description"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quest Type</Label>
              <SelectQuestType/>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                <Label>Due Date</Label>
                  <DueDatePicker 
                    date={date} 
                    setDate={setDate}
                  />
                </div>
                <div className="">
                  <Label>Difficulty</Label>
                  <SelectDifficulty />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}