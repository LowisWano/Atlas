import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const DropdownFilter = ({ label, value, options, onChange }) => {
    const selectedOption = options.find((option) => option.value === value);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-2 border rounded cursor-pointer h-10 flex text-sm w-full md:w-auto">
                {selectedOption ? selectedOption.label : label} <ChevronDown className="ml-auto md:ml-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                    {options.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownFilter;