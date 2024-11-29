import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const SearchInput = ({ query, onSearch }) => (
    <div className="relative">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 h-10"
        />
    </div>
);

export default SearchInput;