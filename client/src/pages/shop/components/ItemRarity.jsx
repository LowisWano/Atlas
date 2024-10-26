import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ItemRarity({ categories, setSelectedCategory }) {
  return (
    <Select>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem disabled value="Rarity">
            Rarity
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category}
              onClick={() => setSelectedCategory(category)}
              value={category}
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}