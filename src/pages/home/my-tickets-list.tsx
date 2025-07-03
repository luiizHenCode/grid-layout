import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter, LogOutIcon, MoreVertical, Plus, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useRef, useState} from "react";
import {NavLink, useParams} from "react-router";
import {TicketCard} from "@/components/custom/ticket-card.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";

export function MyTicketsList() {

    const params = useParams() as {ticketId?: string};
    const [transferStatus, setTransferStatus] = useState(false);
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="icon" variant="ghost" className="size-10 hover:bg-primary/10 lg:hidden">
                                <Avatar className="size-6 bg-primary">
                                    <AvatarImage />
                                    <AvatarFallback className="bg-primary text-white">
                                        <span className="text-xs scale-75 font-bold">LH</span>
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="end" className="p-0 lg:hidden">
                            <div className="flex flex-col">

                                <div className="flex items-center gap-2 p-3">
                                    <Avatar className="size-8 bg-primary">
                                        <AvatarImage />
                                        <AvatarFallback className="bg-primary text-white">
                                            <span className="text-xs font-bold">LH</span>
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm leading-3">Luiz Henrique</span>
                                        <small className="text-muted-foreground leading-3">@username</small>
                                    </div>
                                </div>

                                <Separator />

                                <div className="p-3 gap-3 flex flex-col">

                                    <div className="bg-muted-foreground/5 rounded-md">

                                        <div className="flex flex-col p-3 gap-1">
                                            <small className="text-muted-foreground">Permitir transferencia de conversas?</small>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <Switch id="transfer-status"
                                                            checked={transferStatus}
                                                            onCheckedChange={(checked) => setTransferStatus(checked)}
                                                            className="scale-80 -ml-0.5"/>
                                                    <Label htmlFor="transfer-status" className="text-sm">
                                                        {transferStatus ? "Permitir transferências" : "Negar transferências"}
                                                    </Label>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <Button variant="destructive" className="w-full justify-between">
                                        Sair da conta
                                        <LogOutIcon />
                                    </Button>

                                </div>



                            </div>
                        </PopoverContent>
                    </Popover>
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
