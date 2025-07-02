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

        if (scrollElement) scrollElement.scrollTo({ top: scrollElement.scrollHeight });

        if(props.showTicketInfo) props.toggleTicketInfo();

    }, [props.ticketId]);



    return (
        <ScrollArea viewportRef={scrollRef} className="overflow-y-auto h-full min-h-0 max-h-full relative">
            <div
            data-showrecord={showRecord}
            className="flex flex-col py-4 pb-10 data-[showrecord=true]:pb-30">

                <ChatMessage hash="msg-1" side="left" type="text" />
                <ChatMessage hash="msg-2"  side="left" type="image" />
                <ChatMessage hash="msg-3"  side="right" type="text" />
                <ChatMessage hash="msg-4"  side="right" type="audio" />
                <ChatMessage hash="msg-5"  side="left" type="document" />
                <ChatMessage hash="msg-6"  side="left" type="text" />
                <ChatMessage hash="msg-7"  side="left" type="document" />
                <ChatMessage hash="msg-8"  side="right" type="list" />
                <ChatMessage hash="msg-9"  side="left" type="video" />
                <ChatMessage hash="msg-10"  side="left" type="audio" />
                <ChatMessage hash="msg-11" side="right" type="text" />

            </div>

        </ScrollArea>
    )
}
