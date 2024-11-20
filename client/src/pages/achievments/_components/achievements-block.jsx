import React, { useState } from "react";
import SearchInput from "./search-input";
import DropdownFilter from "./dropdown-filter";
import AchievementList from "./achievement-list";

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
            .sort((a, b) => (sortOrder === "ascending" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    };

    return (
        <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">You have {achievements.length} achievements.</h2>
            <SearchInput query={searchQuery} onSearch={setSearchQuery} />
            <div className="flex gap-4 mb-4">
                <DropdownFilter
                    label="Status"
                    value={statusFilter}
                    options={[
                        { label: "All Status", value: "All" },
                        { label: "Obtained", value: "Obtained" },
                        { label: "Unobtained", value: "Unobtained" },
                    ]}
                    onChange={setStatusFilter}
                />
                <DropdownFilter
                    label="Difficulty"
                    value={difficultyFilter}
                    options={[
                        { label: "All Difficulties", value: "All" },
                        { label: "Difficulty 1", value: "1" },
                        { label: "Difficulty 2", value: "2" },
                        { label: "Difficulty 3", value: "3" },
                    ]}
                    onChange={setDifficultyFilter}
                />
                <DropdownFilter
                    label="Sort Order"
                    value={sortOrder}
                    options={[
                        { label: "Alphabetical Ascending", value: "ascending" },
                        { label: "Alphabetical Descending", value: "descending" },
                    ]}
                    onChange={setSortOrder}
                />
            </div>
            <AchievementList achievements={filterAchievements()} getDifficultyIcon={getDifficultyIcon} />
        </div>
    );
}