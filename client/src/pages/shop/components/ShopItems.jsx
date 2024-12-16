// ShopItems.jsx
import * as React from "react";
import { useState, useMemo } from "react";
import Items from "./Items";
import { Input } from "@/components/ui/input";
import ItemRarity from "./ItemRarity";
import ItemOwnership from "./ItemOwnership";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { useItems } from "@/queries/useItems";

export default function ShopItems() {
  const { getItems, getPlayerData } = useItems();
  const { isPending, error, data: allItems } = getItems();
  const { purchases } = getPlayerData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedOwnership, setSelectedOwnership] = useState("NOT_OWNED");

  const categories = ["ALL", "COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"];
  const ownerships = ["NOT_OWNED", "CLAIMED"];

  const { claimedItems, unclaimedItems, filteredItems } = useMemo(() => {
    if (!allItems || !purchases) {
      return {
        claimedItems: [],
        unclaimedItems: [],
        filteredItems: []
      };
    }

    const purchasedItemIds = purchases.map(purchase => purchase.itemId);

    const claimed = allItems.filter(item => purchasedItemIds.includes(item.id));
    const unclaimed = allItems.filter(item => !purchasedItemIds.includes(item.id));
    

    const itemsToFilter = selectedOwnership === "CLAIMED" ? claimed : unclaimed;

    const filtered = itemsToFilter.filter((item) => {
      const matchesSearchQuery = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || item.rarity === selectedCategory;
      
      return matchesSearchQuery && matchesCategory;
    });

    return {
      claimedItems: claimed,
      unclaimedItems: unclaimed,
      filteredItems: filtered.map(item => ({
        ...item,
        isOwned: selectedOwnership === "CLAIMED"
      }))
    };
  }, [allItems, purchases, selectedOwnership, searchQuery, selectedCategory]);

  if (isPending) return <LoadingSpinner />;
  if (error) {
    console.error("Error in ShopItems:", error);
    return (
      <div className="flex justify-center items-center p-20">
        Sorry, an error has occurred. {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-12 mb-5">
        <div className="w-full md:w-auto">
          <Input
            className="w-full md:w-64"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <ItemRarity
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
          <ItemOwnership
            categories={ownerships}
            setSelectedOwnership={setSelectedOwnership}
          />
        </div>
      </div>
      <div className="">
        <Items 
          items={filteredItems}
        />
      </div>
    </>
  );
}