import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter, MoreVertical, Plus, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useRef} from "react";
import {NavLink, useParams} from "react-router";
import {TicketCard} from "@/components/custom/ticket-card.tsx";

export function MyTicketsList() {

    const params = useParams() as {ticketId?: string};
    const hasTicketId = !!params.ticketId;

    const ref = useRef<HTMLDivElement | null>(null);

    return(
        <div className={
            cn("bg-side-content border-r",
                "grid grid-rows-[60px_auto_minmax(0,1fr)] h-full min-h-0 overflow-hidden",
                hasTicketId && "max-md:hidden" // Hide on small screens if ticketId is present
            )
        }>
            <div className="flex flex-row items-center px-4 justify-between">
                <span className="text-sm font-medium">Minhas conversas</span>
                <div className="flex flex-row gap-1">
                    <Button size="icon" variant="ghost">
                        <ListFilter />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <MoreVertical />
                    </Button>
                </div>
            </div>
            <div className="flex justify-center items-center px-4 pb-2">
                <div className="relative w-full">
                    <Input className="ps-9" placeholder="Pesquisar" type="text" />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <Search size={16} aria-hidden="true" />
                    </div>
                </div>

            </div>

                <ScrollArea viewportRef={ref} className="overflow-y-auto h-full min-h-0 max-h-full relative">
                    <div className="flex flex-col gap-2 px-4 pt-2 pb-20 ">

                {
                    Array.from({length: 30}).map((_, index) => (
                        <NavLink key={index}  to={{pathname: `/minhas-conversas/${++index}`}}>
                            <TicketCard
                                isCurrent={params.ticketId === String(index)}
                                customTicket={index === 3} hasNotifications={index % 5 === 0}  hasTags={index === 2}/>
                        </NavLink>
                    ))
                }
                    </div>

                    <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-[#1E1E1E] to-transparent flex justify-end">
                        <Button className="md:w-full text-white" size="lg">
                            <Plus />
                            Nova conversa
                        </Button>
                    </div>

                </ScrollArea>
        </div>
    )
}
