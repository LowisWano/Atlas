// ItemOwnership.jsx
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ItemOwnership({ categories, setSelectedOwnership }) {
  return (
    <Select onValueChange={setSelectedOwnership} defaultValue="NOT_OWNED">
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Select Ownership" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((status) => (
            <SelectItem key={status} value={status}>
              {status === "NOT_OWNED" ? "Unclaimed" : "Claimed"}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

ItemOwnership.defaultProps = {
  categories: ["NOT_OWNED", "CLAIMED"]
};