// ShopItems.jsx
import * as React from "react";
import { useState } from "react";
import Items from "./Items";
import { Input } from "@/components/ui/input";
import ItemRarity from "./ItemRarity";
import ItemOwnership from "./ItemOwnership";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { useItems } from "@/queries/useItems";

export default function ShopItems() {
  const { getItems } = useItems();
  const { isPending, error, data } = getItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedOwnership, setSelectedOwnership] = useState("NOT_OWNED");
  
  const categories = ["ALL", "COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"];
  const ownerships = ["NOT_OWNED", "CLAIMED"];

  if (isPending) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="flex justify-center items-center p-20">
        Sorry, an error has occurred. {error.message}
      </div>
    );
  }

  const filteredItems = data?.filter((item) => {
    const matchesSearchQuery = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || item.rarity === selectedCategory;
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
            categories={ownerships}
            setSelectedOwnership={setSelectedOwnership}
          />
        </div>
      </div>
      <div className="">
        <Items items={filteredItems || []} />
      </div>
    </>
  );
}