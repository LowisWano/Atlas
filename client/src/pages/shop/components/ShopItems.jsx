import * as React from "react";
import { useState, useEffect } from "react";
import Items from "./Items";
import { H1, H2, H3, H4, P, TypographyLead } from "@/components/Typography";
import { Input } from "@/components/ui/input";
import ItemRarity from "./ItemRarity";
import ItemOwnership from "./itemOwnership";
import { items } from "../data";

export default function ShopItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedOwnership, setSelectedOwnership] = useState("UNCLAIMED");
  const ownership = ["CLAIMED", "UNCLAIMED"];
  const categories = ["ALL", "COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"];

  const filteredItems = items.filter((item) => {
    const matchesSearchQuery = item.item_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || item.rarity === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-start gap-5 mt-20 mb-5">
        <div>
          <Input
            className="w-full md:w-64"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <ItemRarity
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div>
          <ItemOwnership
            ownership={ownership}
            setSelectedOwnership={setSelectedOwnership}
          />
        </div>
      </div>
      <div className="">
        <Items items={filteredItems} />
      </div>
    </>
  );
}