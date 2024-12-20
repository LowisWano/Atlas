import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectQuestType({ questType, setQuestType, defaultValue, disabled }) {
  return (
    <Select 
      id="questType" 
      name="questType" 
      required
      value={questType}
      onValueChange={(value) => setQuestType(value)}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className="w-full text-muted-foreground">
        <SelectValue placeholder="Select quest type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="NORMAL_QUEST">Normal Quest</SelectItem>
          <SelectItem value="DAILY_QUEST">Daily Quest</SelectItem>
          <SelectItem value="MAIN_QUEST">Main Quest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
