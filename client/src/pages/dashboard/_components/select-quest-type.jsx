import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectQuestType() {
  return (
    <Select id="quest-type">
      <SelectTrigger className="w-full text-muted-foreground">
        <SelectValue placeholder="Select quest type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Normal Quest</SelectItem>
          <SelectItem value="banana">Daily Quest</SelectItem>
          <SelectItem value="blueberry">Main Quest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
