import { cn } from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import { MoreVertical, ReplyIcon} from "lucide-react";
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
import {ArrowDownIcon, CopyIcon, RobotIcon, StarIcon} from "@phosphor-icons/react";
import {useBoolean} from "usehooks-ts";

interface ChatMessageProps {
    side: 'left' | 'right';
    type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'list';
}

export function ChatMessage(props: ChatMessageProps) {

    const {value, setValue} = useBoolean(false);


    const fakeDate = useMemo(() => faker.date.recent().toLocaleDateString('pt-BR', {}), []);
    const fakeAvatar = useMemo(() => faker.image.avatar(), []);
    const fakeName = useMemo(() => faker.person.firstName(), []);

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
            data-side={props.side}
            className={
            cn(
                "group w-full px-4 flex gap-2 justify-start items-start",
                "data-[side=right]:flex-row-reverse data-[side=left]:flex-row",
                "hover:bg-muted-foreground/3 py-2 overflow-clip"
            )
        }>
            <div className="sticky top-3 gap-2 flex flex-col h-fit">


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



                <Avatar className="size-6">
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
                {renderMessage}
                <div
                    data-side={props.side}
                    className="text-muted-foreground text-md gap-2 flex scale-90 items-center data-[side=right]:flex-row-reverse data-[side=left]:flex-row">
                    <StarIcon className="size-3.5" />
                    <small className="block group-hover:hidden">10:45</small>
                    <small className="hidden group-hover:block">{fakeDate}</small>
                    <small>•</small>
                    <small>{fakeName}</small>
                    <small>•</small>
                    <RobotIcon className="size-3.5" />
                </div>
            </div>
        </div>
    )
}
