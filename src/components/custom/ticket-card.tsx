import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeftRightIcon, ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {TicketTag} from "@/components/custom/ticket-tag.tsx";
import {faker} from "@faker-js/faker/locale/pt_BR";
import { useMemo } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {HeadsetIcon, XCircleIcon} from "@phosphor-icons/react";
import {useBoolean} from "usehooks-ts";


interface TicketCardProps {
    customTicket?: boolean;
    hasTags?: boolean;
    hasNotifications?: boolean;
    isCurrent?: boolean;
}

export function TicketCard(props: TicketCardProps) {

    const {value, setValue} = useBoolean(false);

    const date = new Date();
    const lastSevenDays = new Date().setDate(date.getDate() - 7);


    const fakeAvatar = useMemo(() => faker.image.avatar(), []);
    const fakeName = useMemo(() => faker.person.fullName(), []);
    const fakeLastMessage = useMemo(() => faker.lorem.words(10), []);
    const fakeDate = useMemo(() => faker.date.between({ from: lastSevenDays, to: date }).toLocaleDateString("pt-BR", {weekday: "long"}), []);


    const tags = [
        { label: "suporte", color: "blue" },
        { label: "Urgente", color: "red" },
        { label: "Financeiro", color: "green" },
        { label: "Sem conexão", color: "yellow" },
        { label: "Problema técnico", color: "orange" }
    ];

    return (
        <div className={
            cn(props.customTicket && `p-0.5 rounded-lg bg-gradient-to-b from-blue-600 to-75% to-foreground/5`)
        }>
            <div
                hidden={!props.customTicket}
                className="flex pl-2 py-1">
                <span className="text-xs uppercase font-bold text-white">Tipo de atendimento</span>
            </div>

            <div
                className="bg-side-content rounded-lg overflow-clip flex flex-col">

            <div
                data-current={props.isCurrent}
                className="group w-full min-h-18 hover:bg-foreground/5 flex flex-col p-2 gap-2 justify-center data-[current=true]:bg-foreground/10">
                <div className="flex items-center gap-2">

                    <Avatar className="size-10">
                        <AvatarImage src={fakeAvatar} />
                        <AvatarFallback className="bg-primary text-white">
                            <span className="text-sm font-semibold">LH</span>
                        </AvatarFallback>
                    </Avatar>

                    <div className="w-full">
                        <div className="flex relative">
                            <span className="flex-1 text-sm font-semibold text-foreground line-clamp-1">
                                {fakeName}
                            </span>
                            <span className="text-xs text-muted-foreground leading-5 ml-auto">
                                {fakeDate}
                            </span>
                            <DropdownMenu open={value} onOpenChange={setValue}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="icon"
                                        data-open={value}
                                        variant="secondary"
                                        className={cn(
                                                "delay-200 size-4.5 rounded-sm bg-muted-foreground/50 ml-2 flex md:-mr-5 md:opacity-0",
                                                "group-hover:mr-0 group-hover:opacity-100 data-[open=true]:mr-0 data-[open=true]:opacity-100 hover:bg-muted-foreground/30 dark:hover:bg-muted-foreground/30"
                                            )}>
                                        <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="left" sideOffset={8} className="w-52" align="center">
                                    <DropdownMenuItem>
                                        Iniciar conversa
                                        <DropdownMenuShortcut>
                                            <HeadsetIcon className="size-4" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Transferir conversa
                                        <DropdownMenuShortcut>
                                            <ArrowLeftRightIcon className="size-4" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        Finalizar conversa
                                        <DropdownMenuShortcut>
                                            <XCircleIcon className="size-4 text-destructive" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <small
                                hidden={!props.hasNotifications}
                                className="absolute right-0 -bottom-5 size-4 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-semibold scale-70">12</span>
                            </small>
                        </div>
                        <span className="text-xs text-muted-foreground/80 line-clamp-1 w-[90%]">
                           {fakeLastMessage}
                        </span>


                    </div>

                </div>

                <div
                    hidden={!props.hasTags}
                    className="flex flex-row gap-1 flex-wrap"
                >
                    {
                        tags.map((tag, i) => (
                            <TicketTag key={i} label={tag.label} color={tag.color} />
                        ))
                    }
                </div>
            </div>
            </div>

        </div>

    );
}
