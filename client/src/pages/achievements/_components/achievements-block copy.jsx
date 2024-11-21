import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input"

export default function AchievementsBlock() {
    const initialAchievements = [
        { id: 1, title: "Completed React Course", description: "Finished an online React course with a certificate.", difficulty: 1, status: 1, date: "2023-08-01" },
        { id: 2, title: "Launched Portfolio Website", description: "Developed and launched a personal portfolio site.", difficulty: 2, status: 0, date: "2024-01-15" },
        { id: 3, title: "Open Source Contributor", description: "Contributed to an open-source project on GitHub.", difficulty: 3, status: 0, date: "2024-06-20" }
    ];

    const [achievements, setAchievements] = useState(initialAchievements);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("ascending");

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 1:
                return <img src="/sprites/Challenge1.png" className="w-16 h-16" alt="Bronze" />;
            case 2:
                return <img src="/sprites/Challenge2.png" className="w-16 h-16" alt="Silver" />;
            case 3:
                return <img src="/sprites/Challenge3.png" className="w-16 h-16" alt="Gold" />;
            default:
                return null;
        }
    };

    const filterAchievements = () => {
        return achievements
            .filter((achievement) => {
                if (searchQuery && !achievement.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                if (statusFilter === "Obtained" && achievement.status !== 1) {
                    return false;
                }
                if (statusFilter === "Unobtained" && achievement.status !== 0) {
                    return false;
                }
                if (difficultyFilter !== "All" && achievement.difficulty !== parseInt(difficultyFilter)) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => sortOrder === "ascending" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
    };

    return (
        <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">You have {achievements.length} achievements.</h2>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search Achievements"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-16 w-full p-2"
                />
            </div>

            <div className="flex gap-4 mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 border rounded cursor-pointer">
                        {statusFilter} Status
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value)}
                        >
                            <DropdownMenuRadioItem value="All">All Status</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Obtained">Obtained</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Unobtained">Unobtained</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 border rounded cursor-pointer">
                        {difficultyFilter} Difficulty
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                            value={difficultyFilter}
                            onValueChange={(value) => setDifficultyFilter(value)}
                        >
                            <DropdownMenuRadioItem value="All">All Difficulties</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="1">Difficulty 1</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="2">Difficulty 2</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="3">Difficulty 3</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 border rounded cursor-pointer">
                        {sortOrder === "ascending" ? "Ascending" : "Descending"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                            value={sortOrder}
                            onValueChange={(value) => setSortOrder(value)}
                        >
                            <DropdownMenuRadioItem value="ascending">Alphabetical Ascending</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="descending">Alphabetical Descending</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Card style={{ border: 'none' }} className="flex flex-col gap-1 shadow-md">
                {filterAchievements().map((achievement, index) => (
                    <div
                        key={achievement.id}
                        className={`p-4 flex items-center border border-gray-700 
                            ${index === 0 ? 'rounded-t-lg' : ''} 
                            ${index === achievements.length - 1 ? 'rounded-b-lg' : ''}`}
                    >
                        <div className="mr-4">
                            {getDifficultyIcon(achievement.difficulty)}
                        </div>
                        <div className="flex-1">
                            <CardHeader className="text-xl font-semibold p-1">{achievement.title}</CardHeader>
                            <CardContent className="text-gray-600 p-1">{achievement.description}</CardContent>
                            <CardFooter className="text-sm text-gray-400 p-1">{new Date(achievement.date).toLocaleDateString()}</CardFooter>
                        </div>
                        <div className="ml-auto">
                            <Checkbox id={`achievement-${achievement.id}`} checked={achievement.status === 1} className="w-10 h-10" readonly />
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}
