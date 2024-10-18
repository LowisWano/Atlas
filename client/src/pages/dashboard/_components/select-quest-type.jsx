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
    <Select>
      <SelectTrigger className="w-full text-muted-foreground">
        <SelectValue placeholder="Select Quest Type" />
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
