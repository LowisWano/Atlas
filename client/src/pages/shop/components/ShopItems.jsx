import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Items from "./Items";

export default function ShopItems() {
  let items = [
    {
      item_id: 1,
      item_name: "Test 1",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "common",
      price: 100,
    },
    {
      item_id: 2,
      item_name: "Test 2",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "uncommon",
      price: 150,
    },
    {
      item_id: 3,
      item_name: "Test 3",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "rare",
      price: 200,
    },
    {
      item_id: 4,
      item_name: "Test 4",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "legendary",
      price: 250,
    },
    {
      item_id: 5,
      item_name: "Test 5",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "common",
      price: 100,
    },
    {
      item_id: 6,
      item_name: "Test 6",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "uncommon",
      price: 150,
    },
    {
      item_id: 7,
      item_name: "Test 7",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "rare",
      price: 200,
    },
    {
      item_id: 8,
      item_name: "Test 8",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "legendary",
      price: 250,
    },
    {
      item_id: 9,
      item_name: "Test 9",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "common",
      price: 100,
    },
    {
      item_id: 10,
      item_name: "Test 10",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "uncommon",
      price: 150,
    },
    {
      item_id: 11,
      item_name: "Test 11",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "rare",
      price: 200,
    },
    {
      item_id: 12,
      item_name: "Test 12",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "legendary",
      price: 250,
    },
    {
      item_id: 13,
      item_name: "Test 13",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "common",
      price: 100,
    },
    {
      item_id: 14,
      item_name: "Test 14",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "uncommon",
      price: 150,
    },
    {
      item_id: 15,
      item_name: "Test 15",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "rare",
      price: 200,
    },
    {
      item_id: 16,
      item_name: "Test 16",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "legendary",
      price: 250,
    },
    {
      item_id: 17,
      item_name: "Test 17",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "common",
      price: 100,
    },
    {
      item_id: 18,
      item_name: "Test 18",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "uncommon",
      price: 150,
    },
    {
      item_id: 19,
      item_name: "Test 19",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "rare",
      price: 200,
    },
    {
      item_id: 20,
      item_name: "Test 20",
      item_img: "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium rutrum metus id pretium. Vestibulum consequat, quam id imperdiet tristique, ante ex condimentum leo, quis ullamcorper turpis lorem vel diam.",
      rarity: "legendary",
      price: 250,
    }
  ];
  

  return (
    <div className="px-10">
      <Items items={items} />
    </div>
  );
}
