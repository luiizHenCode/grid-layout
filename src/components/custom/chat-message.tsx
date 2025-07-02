import { cn } from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ChevronRight, ChevronRightIcon, Mic, MicIcon, MoreVertical, ReplyIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Components
import {MessageText} from "@/components/chat-messages/message-text.tsx";
import {MessageImage} from "@/components/chat-messages/message-image.tsx";
import {MessageVideo} from "@/components/chat-messages/message-video.tsx";
import {MessageAudio} from "@/components/chat-messages/message-audio.tsx";
import {MessageList} from "@/components/chat-messages/message-list.tsx";
import {MessageDocument} from "@/components/chat-messages/message-document.tsx";

import {useMemo} from "react";
import {faker} from "@faker-js/faker/locale/pt_BR";
import {motion} from "framer-motion";
import {
    ArrowBendUpRightIcon,
    ArrowDownIcon,
    CopyIcon, ImageIcon,
    RobotIcon,
    SparkleIcon,
    StarIcon
} from "@phosphor-icons/react";
import {useBoolean} from "usehooks-ts";

interface ChatMessageProps {
    side: 'left' | 'right';
    type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'list';
    hash: string;
}

export function ChatMessage(props: ChatMessageProps) {

    const {value, setValue} = useBoolean(false);



    const fakeAvatar = useMemo(() => faker.image.avatar(), []);

    const renderMessage = useMemo(() => {
        switch (props.type) {
            case 'text':
                return <MessageText side={props.side} />;
            case 'image':
                return <MessageImage side={props.side} />;
            case 'video':
                return <MessageVideo side={props.side} />;
            case 'audio':
                return <MessageAudio side={props.side} />;
            case 'document':
                return <MessageDocument side={props.side} />;
            case 'list':
                return <MessageList side={props.side} />;
            default:
                return null;
        }
    }, [props.type, props.side]);


    return (
        <div
            id={`#${props.hash}`}
            data-side={props.side}
            className={
            cn(
                "group w-full px-4 flex gap-2 justify-start items-start",
                "data-[side=right]:flex-row-reverse data-[side=left]:flex-row",
                "hover:bg-muted-foreground/3 py-2 overflow-clip relative"
            )
        }>
            <div className="sticky top-3 gap-2 flex flex-col h-fit z-2 ">


                <DropdownMenu open={value} onOpenChange={setValue}>
                    <DropdownMenuTrigger asChild>
                        <Button data-open={value} size="icon"
                                className="relative delay-200 rounded-full size-6 md:opacity-0 data-[open=true]:opacity-100 data-[open=true]:mt-0 group-hover:opacity-100 group-hover:mt-0 hover:bg-foreground/10 overflow-clip md:-mt-8">
                            <MoreVertical className="text-white size-3"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" sideOffset={8} className="w-52" align="start">
                        <DropdownMenuItem>
                            Baixar arquivo
                            <DropdownMenuShortcut>
                                <ArrowDownIcon className="size-4" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Copiar mensagem
                            <DropdownMenuShortcut>
                                <CopyIcon className="size-4" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Responder
                            <DropdownMenuShortcut>
                                <ReplyIcon className="size-4" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Favoritar
                            <DropdownMenuShortcut>
                                <StarIcon className="size-4" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Avatar className="size-6 relative">
                    <AvatarImage src={fakeAvatar} />
                    <AvatarFallback>
                        <span className="text-xs">LH</span>
                    </AvatarFallback>
                </Avatar>

            </div>
            <div
                data-side={props.side}
                className="max-w-md flex flex-col gap-1 data-[side=right]:items-end data-[side=left]:items-start"
            >
                    <span data-side={props.side} className="text-xs text-muted-foreground flex gap-1 px-3 data-[side=right]:flex-row-reverse leading-3">
                        <ArrowBendUpRightIcon mirrored={props.side === "right"} className="size-4" />
                        <span>
                            Resposta para <b>Luiz Herique</b>
                        </span>
                    </span>
                {renderMessage}
                <div
                    data-side={props.side}
                    className={
                        cn(
                            "text-muted-foreground text-sm gap-2 flex items-center px-1",
                            "data-[side=right]:flex-row-reverse data-[side=left]:flex-row"
                        )
                    }>
                    <small
                        data-side={props.side}
                        className={
                            cn(
                                "md:opacity-0 group-hover:opacity-100 transition-all",
                                "md:data-[side=right]:-mr-15 data-[side=right]:-ml-1 md:data-[side=right]:group-hover:mr-0",
                                "md:data-[side=left]:-ml-15 data-[side=left]:-mr-1 md:data-[side=left]:group-hover:ml-0",
                            )
                        }>
                        25/06/2025
                    </small>
                    <small>10:45</small>
                    <small>•</small>
                    <div className="flex items-center gap-1">
                        <RobotIcon className="size-3.5" />
                        <small>BOT</small>
                    </div>
                    <small>•</small>
                     <div className="flex items-center gap-1">
                        <SparkleIcon className="size-3.5" />
                         <small>Gerada com IA</small>
                     </div>

                </div>

                <div
                    data-side={props.side}
                    className="w-px bg-muted-foreground/20 absolute top-2 bottom-12.5 z-0 data-[side=left]:left-7 data-[side=right]:right-7" />
                <div
                    data-side={props.side}
                    className="flex flex-col data-[side=right]:items-end data-[side=left]:items-start mt-3 justify-center">

                    <div
                        data-side={props.side}
                        className={
                            cn(
                                "absolute h-5 w-4 bg-transparent border-muted-foreground/20 -mt-4 border-b",
                                "data-[side=left]:rounded-bl-lg data-[side=left]:border-l data-[side=left]:left-7",
                                "data-[side=right]:rounded-br-lg data-[side=right]:border-r data-[side=right]:right-7",
                            )
                        }>
                        <ChevronRightIcon
                            data-side={props.side}
                            className={
                                cn(
                                    "size-4 absolute -bottom-[8.5px] text-muted-foreground/20",
                                    "data-[side=left]:-right-[7px] data-[side=right]:-left-[7px] data-[side=right]:rotate-y-180"
                                )
                            } />
                    </div>

                    <div
                        data-side={props.side}
                        className="p-1 bg-foreground/5 rounded-md flex gap-2">
                        <div className="flex flex-col justify-center pl-2 text-sm w-32 relative">
                            <small className="font-bold leading-3">Luiz</small>
                            <span className="text-sm text-muted-foreground leading-5">Audio</span>
                        </div>
                        <div className="size-10 bg-foreground rounded-sm flex items-center justify-center">
                            <MicIcon className="size-5 text-white dark:text-black" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
