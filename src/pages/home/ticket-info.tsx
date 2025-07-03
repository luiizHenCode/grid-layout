import {Button} from "@/components/ui/button.tsx";
import {ArrowLeftRightIcon, ChevronLeft, TagsIcon} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import { useRef } from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {fakerPT_BR} from "@faker-js/faker";
import {
    ArticleIcon,
    BookmarkIcon,
    BuildingsIcon,
    CalendarIcon,
    CopyIcon,
    HeadsetIcon,
    PlusIcon,
    TicketIcon
} from "@phosphor-icons/react";
import {Separator} from "@/components/ui/separator.tsx";
import {TicketTag} from "@/components/custom/ticket-tag.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import cc from "contrast-color";
import {Textarea} from "@/components/ui/textarea.tsx";

interface TicketInfoProps {
    showTicketInfo: boolean;
    onClose: () => void;
}

export function TicketInfo(props: TicketInfoProps) {

    const viewportRef = useRef<HTMLDivElement>(null);
    const fakeImage = fakerPT_BR.image.avatar();

    const bg = "orange";
    const textColor = cc.contrastColor({ bgColor: bg });


    const tags = [
        { label: "suporte", color: "blue" },
        { label: "Urgente", color: "red" },
        { label: "Financeiro", color: "green" },
        { label: "Sem conexão", color: "yellow" },
        { label: "Problema técnico", color: "orange" },
        { label: "Novo", color: "purple" },
        { label: "Revisão", color: "pink" },
        { label: "Aguardando resposta", color: "#f90f90" },
        { label: "Prioridade alta", color: "indigo" },
        { label: "Feedback do cliente", color: "teal" }
    ];


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
            <ScrollArea viewportRef={viewportRef} className="h-full overflow-y-auto bg-sidebar">

                    <div className="flex flex-col w-full p-3 gap-3 max-w-lg mx-auto">

                        <div className="w-full flex gap-3 p-3 items-center bg-muted-foreground/10 rounded-md">
                            <Avatar className="size-9">
                                <AvatarImage src={fakeImage}/>
                                <AvatarFallback>LH</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col h-fit">
                                <span className="text-sm">Luiz Henrique</span>
                                <small className="text-muted-foreground">+55 19 9 9995-9932</small>
                            </div>

                            <Button variant="ghost" size="icon" className="ml-auto">
                                <CopyIcon className="size-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col bg-muted-foreground/10 rounded-md">

                            <div className="group w-full flex gap-3 items-center p-3">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <CalendarIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit">
                                    <small className="text-muted-foreground">Iniciou a conversa</small>
                                    <span className="text-sm">02/07/2025 15:57:59 (há 7 horas)</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="group w-full flex gap-3 items-center p-3">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <TicketIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit">
                                    <small className="text-muted-foreground">Conversa Nº</small>
                                    <span className="text-sm">2487</span>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto">
                                    <CopyIcon className="size-4" />
                                </Button>
                            </div>

                        </div>
                        <div className="flex flex-col bg-muted-foreground/10 rounded-md">

                            <div className="group w-full flex gap-3 items-center p-3">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <HeadsetIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit">
                                    <small className="text-xs text-muted-foreground">Conversando com</small>
                                    <span className="text-sm">Augusto Oliveira</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="group w-full flex gap-3 items-center p-3">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <BuildingsIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit">
                                    <small className="text-muted-foreground">Setor</small>
                                    <span className="text-sm">Financeiro</span>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto">
                                    <ArrowLeftRightIcon className="size-4" />
                                </Button>
                            </div>

                        </div>

                        <div className="flex flex-col p-3 bg-muted-foreground/10 rounded-md">

                            <div className="group w-full flex gap-4 items-start">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <TagsIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit gap-2">
                                    <small className="text-muted-foreground">Etiquetas</small>
                                    <div className="flex flex-wrap gap-1.5">
                                        {
                                            tags.map((tag, i) => (
                                                <TicketTag key={i} label={tag.label} color={tag.color} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto">
                                    <PlusIcon className="size-4" />
                                </Button>
                            </div>

                        </div>

                        <div className="flex flex-col gap-3 p-3 bg-muted-foreground/10 rounded-md">

                            <div className="group w-full flex gap-3 items-start">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <BookmarkIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit gap-2">
                                    <small className="text-muted-foreground">Tipo de atendimento</small>
                                    <div className="flex flex-wrap gap-1.5">
                                      <Badge style={{ backgroundColor: bg, color: textColor }}>
                                          Financeiro com contato
                                      </Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto size-8 hover:bg-muted-foreground/10">
                                    <PlusIcon className="size-4" />
                                </Button>
                            </div>

                        </div>

                        <div className="flex flex-col gap-3 p-3 bg-muted-foreground/10 rounded-md">

                            <div className="group w-full flex gap-3 items-start">
                                <Avatar className="size-9">
                                    <AvatarImage/>
                                    <AvatarFallback className="group-hover:bg-primary group-hover:text-white bg-muted-foreground/10">
                                        <ArticleIcon className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col h-fit gap-2 flex-1">
                                    <small className="text-muted-foreground">Observação</small>
                                    <div className="w-full">
                                        <Textarea className="h-32 resize-none border-none bg-muted-foreground/10 dark:bg-muted-foreground/10" />
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>

            </ScrollArea>
        </div>
    )
}
