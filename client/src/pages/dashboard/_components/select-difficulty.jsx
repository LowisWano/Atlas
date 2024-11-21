import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDifficulty() {
  return (
    <Select id="selectDifficulty" name="selectDifficulty">
      <SelectTrigger className="w-full text-muted-foreground">
        <SelectValue placeholder="Select difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="EASY">Easy</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HARD">Hard</SelectItem>
          <SelectItem value="INSANE">Insane</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
