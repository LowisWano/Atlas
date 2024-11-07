import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ItemOwnership({ ownership, setSelectedOwnership }) {
  return (
    <Select onValueChange={setSelectedOwnership}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Ownership" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem disabled value="Ownership">
            Ownership
          </SelectItem>
          {ownership.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}