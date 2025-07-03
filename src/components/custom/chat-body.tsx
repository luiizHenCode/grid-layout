import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useEffect, useRef} from "react";
import {ChatMessage} from "@/components/custom/chat-message.tsx";
import { useChatActions } from "@/hooks/use-chat-actions";

interface ChatBodyProps {
    showTicketInfo: boolean;
    toggleTicketInfo: () => void;
    ticketId?: string;
}

export function ChatBody(props: ChatBodyProps) {

    const scrollRef = useRef<HTMLDivElement>(null);

    const {showRecord} = useChatActions();


    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTo({ top: scrollElement.scrollHeight });
        }

        if(props.showTicketInfo) {
            props.toggleTicketInfo();
        }

    }, [props.ticketId]);

    return (
        <ScrollArea
            viewportRef={scrollRef}
            className="overflow-y-auto h-full min-h-0 max-h-full relative">
            <div
            data-showrecord={showRecord}
            className="flex flex-col py-4 pb-10 data-[showrecord=true]:pb-30">

                <ChatMessage side="left" type="text" />
                <ChatMessage side="left" type="image" />
                <ChatMessage side="right" type="text" />
                <ChatMessage side="right" type="audio" />
                <ChatMessage side="left" type="document" />
                <ChatMessage side="left" type="text" />
                <ChatMessage side="left" type="document" />
                <ChatMessage side="right" type="list" />
                <ChatMessage side="left" type="video" />
            </div>
        </ScrollArea>
    )
}
