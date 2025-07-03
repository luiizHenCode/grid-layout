import {Button} from "@/components/ui/button.tsx";
import { ChevronLeft } from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import { useRef } from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {fakerPT_BR} from "@faker-js/faker";

interface TicketInfoProps {
    showTicketInfo: boolean;
    onClose: () => void;
}

export function TicketInfo(props: TicketInfoProps) {

    const viewportRef = useRef<HTMLDivElement>(null);

    const fakeImage = fakerPT_BR.image.avatar();

    return (
        <div
            data-hidden={!props.showTicketInfo}
            className="border-l data-[hidden=true]:hidden max-xl:border-none grid grid-rows-[64px_1fr] h-full min-h-0 overflow-hidden">
            <div className="flex items-center px-4 h-16 gap-4 relative justify-center bg-side-content">
                <Button
                    size="icon"
                    variant="secondary"
                    className="xl:hidden absolute left-4"
                    onClick={props.onClose}>
                    <ChevronLeft className="size-5" />
                </Button>
                <span className="text-sm font-semibold ">Informações da conversa</span>
            </div>

            <ScrollArea viewportRef={viewportRef} className="flex flex-col h-full overflow-y-auto bg-chat">
                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <Avatar>
                            <AvatarImage src={fakeImage}/>
                            <AvatarFallback>LH</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
