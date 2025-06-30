import {Button} from "@/components/ui/button.tsx";
import { ChevronLeft } from "lucide-react";

interface TicketInfoProps {
    showTicketInfo: boolean;
    onClose: () => void;
}

export function TicketInfo(props: TicketInfoProps) {
    return (
        <div
            data-hidden={!props.showTicketInfo}
            className="bg-side-content border-l data-[hidden=true]:hidden max-xl:border-none">
            <div className="flex items-center px-4 h-16 gap-4">
                <Button
                    size="icon"
                    variant="secondary"
                    className="xl:hidden"
                    onClick={props.onClose}>
                    <ChevronLeft className="size-5" />
                </Button>
                <span className="text-sm font-semibold ">Informações do Ticket</span>

            </div>
        </div>
    )
}
