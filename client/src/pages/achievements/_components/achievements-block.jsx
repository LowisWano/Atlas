import React, { useState } from "react";
import AchievementList from "./achievement-list";
import FiltersPanel from "./filters-panel";

export default function AchievementsBlock( {achievements , userAchievements}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("ascending");

    const filterAchievements = () => {
        return achievements
            .filter((achievement) => {
                if (searchQuery && !achievement.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                // if (statusFilter === "Obtained" && achievement.status !== 1) {
                //     return false;
                // }
                // if (statusFilter === "Unobtained" && achievement.status !== 0) {
                //     return false;
                // }
                return true;
            })
            .sort((a, b) => (sortOrder === "ascending" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    };

    return (
        <div className="p-6 rounded-lg shadow-md">

            <FiltersPanel
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                difficultyFilter={difficultyFilter}
                onDifficultyChange={setDifficultyFilter}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
            />

            <AchievementList achievements={filterAchievements()} userAchievements={userAchievements} />
        </div>
    );
}