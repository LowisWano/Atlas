import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DueDatePicker({ date, setDate, disabled }) {
  const initialTime = date ? 
    format(date, 'HH:mm') :
    '12:00';
  const [selectedTime, setSelectedTime] = useState(initialTime);
  console.log(date)
  const handleDateTimeChange = (newDate, newTime) => {
    if (newDate) {
      const [hours, minutes] = newTime.split(':');
      newDate.setHours(parseInt(hours), parseInt(minutes));
      setDate(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal text-muted-foreground",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            <span>
              {format(date, "MM/dd/yyyy")} at {format(date, "hh:mm a")}
            </span>
          ) : (
            <span>Select Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        style={{ zIndex: 9999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => handleDateTimeChange(newDate, selectedTime)}
            initialFocus
          />
          <div className="border-t border-border mt-3 pt-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e.target.value);
                if (date) {
                  handleDateTimeChange(new Date(date), e.target.value);
                }
              }}
              className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}