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
        <div className="mb-4">
            <SearchInput query={searchQuery} onSearch={onSearch} />
            <div className="flex gap-4 mt-4">
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
                <DropdownFilter
                    label="Difficulty"
                    value={difficultyFilter}
                    options={[
                        { label: "All Difficulties", value: "All" },
                        { label: "Difficulty 1", value: "1" },
                        { label: "Difficulty 2", value: "2" },
                        { label: "Difficulty 3", value: "3" },
                    ]}
                    onChange={onDifficultyChange}
                />
                <DropdownFilter
                    label="Sort Order"
                    value={sortOrder}
                    options={[
                        { label: "Alphabetical Ascending", value: "ascending" },
                        { label: "Alphabetical Descending", value: "descending" },
                    ]}
                    onChange={onSortOrderChange}
                />
            </div>
        </div>
    );
};

export default FiltersPanel;