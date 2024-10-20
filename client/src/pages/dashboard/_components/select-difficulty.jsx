import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDifficulty() {
  return (
    <Select>
      <SelectTrigger className="w-full text-muted-foreground">
        <SelectValue placeholder="Select difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Easy</SelectItem>
          <SelectItem value="banana">Medium</SelectItem>
          <SelectItem value="blueberry">Hard</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
