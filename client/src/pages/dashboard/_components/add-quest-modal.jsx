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

export default function AddQuestModal() {
  const [date, setDate] = useState(null);

  const addQuestHandler = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      questType: formData.get('questType'),
      dueDate: date,
      difficulty: formData.get('selectDifficulty'),
    };
    console.log(data);
  }

  return (
    <Dialog>
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
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add a description"
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