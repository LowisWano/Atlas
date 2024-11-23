import React, { useState } from "react";
import AchievementList from "./achievement-list";
import FiltersPanel from "./filters-panel";
import { useAchievements } from "@/queries/useAchievements";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function AchievementsBlock() {
    const { getAchievements } = useAchievements();
    const { isPending, error, data } = getAchievements();

    const { getUserAchievements } = useAchievements();
    const { userisPending, usererror, userdata } = getUserAchievements();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("ascending");

    console.log("UserAchievements Status:", userisPending, usererror, userdata);

    if (isPending || userisPending) {
        return <LoadingSpinner />;
    }

    if (error || usererror) {
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const queryClient = useQueryClient();
    console.log("Fetched UserAchievementsTanstack:", queryClient.getQueryData(["playerachievement"]));

    const checkedAchievements = userdata || [];
    console.log("Fetched UserAchievements:", checkedAchievements);

    const achievements = data || [];
    console.log("Fetched Achievements:", achievements);

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
                if (difficultyFilter !== "All" && achievement.iconImg !== (difficultyFilter)) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => (sortOrder === "ascending" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    };

    return (
        <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">You have {achievements.length} achievements.</h2>

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

            <AchievementList achievements={filterAchievements()} />
        </div>
    );
}