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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="outline">Add Quest <CopyPlus className="h-4 w-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Quest</DialogTitle>
          <DialogDescription>
            Create a new quest by filling out the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Add a title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a description..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quest-type">Quest Type</Label>
              <SelectQuestType/>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                <Label htmlFor="due-date">Due Date</Label>
                  <DueDatePicker />
                </div>
                <div className="">
                  <Label htmlFor="difficulty">Difficulty</Label>
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