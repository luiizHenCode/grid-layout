import { cn } from "@/lib/utils.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {TicketInfo} from "@/pages/home/ticket-info.tsx";
import {ChatHeader} from "@/components/custom/chat-header.tsx";
import {ChatBody} from "@/components/custom/chat-body.tsx";
import {ChatFooter} from "@/components/custom/chat-footer.tsx";
import {useChatActions} from "@/hooks/use-chat-actions.ts";
import {RecordCard} from "@/components/custom/record-card.tsx";

export function Chat() {

    const params = useParams() as {ticketId?: string};
    const hasTicketId = !!params.ticketId;

    const [showTicketInfo, setShowTicketInfo] = useState<boolean>(true);

    const {showRecord, setShowRecord} = useChatActions();


    const toggleTicketInfo = () => {
        setShowTicketInfo(prev => !prev);
    }

    useEffect(() => {
        if(showRecord && hasTicketId) {
            setShowRecord(false); // Hide ticket info when recording starts
        }
    }, [params.ticketId])

    if (!hasTicketId) {
        return (
            <div
                className={
                cn(
                    "flex items-center justify-center h-full bg-[url(/src/assets/bg-chat.svg)] dark:bg-[url(/src/assets/bg-chat-dark.svg)]",
                    !hasTicketId && "max-md:hidden",
                )
                }>
                <span className="text-muted-foreground">Selecione uma conversa para iniciar o chat</span>
            </div>
        );
    }

    return (
        <div
            data-showinfo={showTicketInfo}
            className={cn(
                "grid data-[showinfo=true]:grid-cols-[1fr_minmax(300px,25rem)] h-full min-h-0 bg-[url(/src/assets/bg-chat.svg)]",
                "max-xl:data-[showinfo=true]:grid-cols-[1fr] bg-blend-multiply bg-repeat dark:bg-[url(/src/assets/bg-chat-dark.svg)]",
            )}>

        <div
            data-showrecord={showRecord}
            data-showinfo={showTicketInfo}
            className={
            cn(
                "grid h-full min-h-0 overflow-hidden relative",
                "grid-rows-[64px_minmax(0,1fr)_minmax(64px,auto)]",
                "data-[showrecord=true]:grid-rows-[64px_minmax(0,1fr)_minmax(0px,auto)]",
                "max-xl:data-[showinfo=true]:hidden"
            )
        }>

            <ChatHeader toggleTicketInfo={toggleTicketInfo} />

            <ChatBody
                showTicketInfo={showTicketInfo}
                toggleTicketInfo={toggleTicketInfo}
                ticketId={params.ticketId}
            />

            <ChatFooter />

            {showRecord && <RecordCard />}

        </div>

            <TicketInfo
                showTicketInfo={showTicketInfo}
                onClose={toggleTicketInfo}
            />

        </div>
    )
}
