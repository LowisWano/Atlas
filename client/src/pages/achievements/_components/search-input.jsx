import { Input } from "@/components/ui/input";

const SearchInput = ({ query, onSearch }) => (
    <div className="w-">
        <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            className="w-9/12 h-10"
        />
    </div>
);

export default SearchInput;