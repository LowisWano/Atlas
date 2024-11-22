import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import DueDatePicker from "./due-date-picker"
import SelectDifficulty from "./select-difficulty"
import SelectQuestType from "./select-quest-type"


export default function EditQuestModal({ open, setOpen, isDropdownOpen, quest }) {
  const [editedQuest, setEditedQuest] = useState(quest);
  const [date, setDate] = useState(quest.dueDate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedQuest((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };
  console.log(editedQuest)
  return (
    <>
      <Dialog open={open && !isDropdownOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Quest</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Add a title"
                value={editedQuest.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add a description"
                value={editedQuest.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quest Type</Label>
              <SelectQuestType 
                defaultValue={editedQuest.questType}
                disabled={true}
              />
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
                  <SelectDifficulty
                    defaultValue={editedQuest.difficulty}
                  />
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
    </>
  )
}