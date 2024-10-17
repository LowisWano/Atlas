import { useState } from "react"

import {
  Card,
  CardContent,
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
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Trash, Edit, EllipsisVerticalIcon } from "lucide-react"

export default function Quest({ title, description }){
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row justify-between pl-2">
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
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
        </div>
        <Checkbox className="h-10 w-10"/>
      </CardHeader>
    </Card>
  )
}