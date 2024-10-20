<<<<<<< HEAD
import { useState } from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Trash, Edit, EllipsisVerticalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Quest({ quest }){
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex items-center flex-row justify-between py-5 pl-2">
        <div className="flex gap-2">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <EllipsisVerticalIcon className={`${
                  isDropdownOpen ? "visible" : "invisible group-hover:visible"
                } transition-opacity duration-300`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Edit</span>
                  <DropdownMenuShortcut><Edit className="h-4"/></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delete</span>
                  <DropdownMenuShortcut><Trash className="h-4"/></DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col gap-1">
            <CardTitle>{quest.title}</CardTitle>
            <CardDescription>{quest.description}</CardDescription>
            <div className="space-x-1 pt-1">
              <Badge variant="secondary" className="rounded-xl">{quest.rewards.gold} gold</Badge>
              <Badge variant="secondary" className="rounded-xl">{quest.rewards.exp} exp</Badge>
            </div>
          </div>
        </div>
        <Checkbox className="h-10 w-10"/>
      </CardHeader>
    </Card>
  )
=======
import { useState } from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Trash, Edit, EllipsisVerticalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Quest({ quest }){
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checked, setChecked] = useState(quest.status === "completed");

  const handleCheckToggle = (newValue) => {
    setChecked(newValue);
    const updatedStatus = newValue ? "completed" : "active";
    console.log(`Quest "${quest.title}" is now marked as ${updatedStatus}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex items-center flex-row justify-between py-5 pl-2">
        <div className="flex gap-2">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <EllipsisVerticalIcon className={`${
                  isDropdownOpen ? "visible" : "invisible group-hover:visible"
                } transition-opacity duration-300`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Edit</span>
                  <DropdownMenuShortcut><Edit className="h-4"/></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delete</span>
                  <DropdownMenuShortcut><Trash className="h-4"/></DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col gap-1">
            <CardTitle>{quest.title}</CardTitle>
            <CardDescription>{quest.description}</CardDescription>
            <div className="space-x-1 pt-1">
              <Badge variant="secondary" className="rounded-xl">{quest.rewards.gold} gold</Badge>
              <Badge variant="secondary" className="rounded-xl">{quest.rewards.exp} exp</Badge>
            </div>
          </div>
        </div>
        <Checkbox checked={checked} onCheckedChange={handleCheckToggle} className="h-10 w-10"/>
      </CardHeader>
    </Card>
  )
>>>>>>> cb994f1909cc53292308ba9d0fda67ec4e17bd72
}