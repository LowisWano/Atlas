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
            <p className="block md:hidden text-base">Search</p>
            <SearchInput query={searchQuery} onSearch={onSearch} />
            <p className="block md:hidden text-base">Completion</p>
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