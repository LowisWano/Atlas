import React, { useState } from "react";
import AchievementList from "./achievement-list";
import FiltersPanel from "./filters-panel";
import { useAchievements } from "@/queries/useAchievements";
import LoadingSpinner from "@/components/custom-ui/loading-spinner";

export default function AchievementsBlock() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const { getAchievements } = useAchievements();
    const { isPending, error, data } = getAchievements();

    const { getUserAchievements } = useAchievements();
    const userA = getUserAchievements();

    if (isPending || userA.isPending) {
        return <LoadingSpinner />;
    }

    if (error || userA.error) {
        return (
            <div className="flex justify-center items-center p-20">
                Sorry, an error has occurred. {error.message}
            </div>
        );
    }

    const achievements = data || [];
    const userAchievements = userA.data || [];

    const filterAchievements = () => {
        return achievements
            .filter((achievement) => {
                if (searchQuery && !achievement.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                }
                if (statusFilter === "Obtained" && !userAchievements.some(ua => ua.achievementId === achievement.id)) {
                    return false;
                }
                if (statusFilter === "Unobtained" && userAchievements.some(ua => ua.achievementId === achievement.id)) {
                    return false;
                }
                return true;
            })
    };

    return (
        <div className="rounded-lg shadow-md">

            <FiltersPanel
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            <AchievementList achievements={filterAchievements()} userAchievements={userAchievements} />
        </div>
    );
}