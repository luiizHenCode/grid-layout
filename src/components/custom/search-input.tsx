import {SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";

export function SearchInput() {
    return (
        <div className="relative w-full">
            <Input className="ps-9" placeholder="Pesquisar" type="text" />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} aria-hidden="true" />
            </div>
        </div>
    )
}
