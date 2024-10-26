import * as React from "react";
import { useState, useEffect } from "react";
import Items from "./Items";
import { H1, H2, H3, H4, P, TypographyLead } from "@/components/Typography";
import { Input } from "@/components/ui/input";
import ItemRarity from "./ItemRarity";
import { items } from "../data";

export default function ShopItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const categories = ["ALL", "common", "uncommon", "rare", "legendary"];

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
      <div className="flex flex-col md:flex-row justify-between gap-5 mt-20 mb-5 mx-4 md:mx-32">
        <div>
          <Input
            className="w-full md:w-64" // Fixed width for the input
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
      </div>
      <div className="px-4 md:px-10">
        <Items items={filteredItems} />
      </div>
    </>
  );
}