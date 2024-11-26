import React from "react";
import SearchInput from "./search-input";
import DropdownFilter from "./dropdown-filter";

const FiltersPanel = ({
    searchQuery,
    onSearch,
    statusFilter,
    onStatusChange,
    difficultyFilter,
    onDifficultyChange,
    sortOrder,
    onSortOrderChange,
}) => {
    return (
        <div className="mb-4 flex w-full border border-red-600">
            <SearchInput query={searchQuery} onSearch={onSearch} />
            <DropdownFilter
                label="Status"
                value={statusFilter}
                options={[
                    { label: "All Status", value: "All" },
                    { label: "Obtained", value: "Obtained" },
                    { label: "Unobtained", value: "Unobtained" },
                ]}
                onChange={onStatusChange}
            />
        </div>
    );
};

export default FiltersPanel;