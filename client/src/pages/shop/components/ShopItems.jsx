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
      <div className="flex gap-5 mt-20 mb-3 justify-center content-center">
        <div className="flex justify-center content-center gap-5">
          <div>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></Input>
          </div>
          <div>
            <ItemRarity
              categories={categories}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </div>
      <div className="px-10">
        <Items items={filteredItems} />
      </div>
    </>
  );
}
