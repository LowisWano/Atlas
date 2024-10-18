import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DueDatePicker() {
  const [date, setDate] = useState(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal text-muted-foreground",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Select due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        style={{ zIndex: 9999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}