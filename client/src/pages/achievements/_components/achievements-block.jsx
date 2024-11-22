import React, { useState } from "react";
import AchievementList from "./achievement-list";
import FiltersPanel from "./filters-panel";

export default function AchievementsBlock() {
    // const { getQuests } = useAchievements();
    // const { isPending, error, data } = getQuests();

    // if (isPending) {
    //     return (
    //         <LoadingSpinner />
    //     );
    // }

    // if (error){
    //     return (
    //       <div className="flex justify-center items-center p-20">
    //         Sorry, an error has occured. {error.message}
    //       </div> 
    //     );
    // }

    // const initialAchievements = data.achievements;

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

            <AchievementList achievements={filterAchievements()} getDifficultyIcon={getDifficultyIcon} />
        </div>
    );
}