import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, PanelRight} from "lucide-react";
import { useNavigate } from "react-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

interface ChatHeaderProps {
    toggleTicketInfo: () => void;
}

export function ChatHeader(props: ChatHeaderProps) {

    const navigate = useNavigate();

    return (
        <div className="flex items-center px-4 bg-side-content leading-4.5 min-h-16">
            <Button
                onClick={()  => navigate(-1)}
                size="icon" variant="secondary" className="hover:bg-foreground/10 mr-2 md:hidden">
                <ChevronLeft className="size-5" />
            </Button>
            <Avatar className="size-9">
                <AvatarImage src={`https://i.pravatar.cc/50`} />
                <AvatarFallback>
                    <span className="text-xs">LH</span>
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-3 mr-auto">
                <span className="text-sm">Luiz Henrique</span>
                <small className="text-xs text-muted-foreground">Iniciado em 27/06/2025</small>
            </div>

            <Button
                onClick={props.toggleTicketInfo}
                size="icon" variant="ghost">
                <PanelRight />
            </Button>
        </div>
    );
}
