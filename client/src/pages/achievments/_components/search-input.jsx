import { Input } from "@/components/ui/input";

const SearchInput = ({ query, onSearch }) => (
    <div className="mb-4">
        <Input
            type="text"
            placeholder="Search Achievements"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            className="h-16 w-full p-2"
        />
    </div>
);

export default SearchInput;