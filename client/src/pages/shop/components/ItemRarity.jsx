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
  // Transform category text while maintaining original value
  const displayCategory = (category) => {
    if (category === "ALL") return category;
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <Select onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Category" className="text-slate-500"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem disabled value="Rarity">
            Rarity
          </SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {displayCategory(category)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}