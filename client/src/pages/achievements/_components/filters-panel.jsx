import React from "react";
import SearchInput from "./search-input";
import DropdownFilter from "./dropdown-filter";

const FiltersPanel = ({
    searchQuery,
    onSearch,
    statusFilter,
    onStatusChange,
}) => {
    return (
        <div className="mb-4 space-y-1 md:space-x-2 md:flex md:space-y-0">
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