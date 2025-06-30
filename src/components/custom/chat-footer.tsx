import {Button} from "@/components/ui/button.tsx";
import { MicIcon, Plus, Smile} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import { useState } from "react";
import {
    CameraIcon,
    ChatCenteredDotsIcon,
    FileIcon,
    PaperPlaneRightIcon
} from "@phosphor-icons/react";
import {useChatActions} from "@/hooks/use-chat-actions.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useBoolean} from "usehooks-ts";

export function ChatFooter() {

    const {toggleShowRecord, showRecord} = useChatActions();

    const [message, setMessage] = useState<string>("");
    const {value, setValue} = useBoolean(false);

    const handleSendMessage = () => {
        if (message.trim() === "") return; // Prevent sending empty messages
        // Here you would typically handle sending the message, e.g., via an API call
        console.log("Sending message:", message);
        setMessage(""); // Clear the input after sending
    }

    return (
        <div
            data-hidden={showRecord}
            className="min-h-16 bg-side-content flex items-end p-4 gap-2 data-[hidden=true]:hidden">
            <DropdownMenu open={value} onOpenChange={setValue}>
                <DropdownMenuTrigger asChild>
                    <Button size="icon-rounded" variant="secondary" className="hover:bg-muted-foreground/10">
                        <Plus
                            data-open={value}
                            className="data-[open=true]:rotate-45 transition-all"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" sideOffset={8} className="w-52" align="start">
                    <DropdownMenuItem>
                        Selecionar arquivo
                        <DropdownMenuShortcut>
                            <FileIcon className="size-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Selecionar foto
                        <DropdownMenuShortcut>
                            <CameraIcon className="size-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Mensagem padrão
                        <DropdownMenuShortcut>
                            <ChatCenteredDotsIcon className="size-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Textarea
                value={message}
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="max-h-24 rounded-2xl border-none bg-muted-foreground/10"
            />
            <Button size="icon-rounded" variant="secondary" className="hover:bg-muted-foreground/10">
                <Smile />
            </Button>
            {
                message ? (
                    <Button
                        onClick={handleSendMessage}
                        size="icon-rounded" className="hover:bg-primary/90">
                        <PaperPlaneRightIcon weight="fill" className="text-white"/>
                    </Button>
                ) : (
                    <Button
                        onClick={toggleShowRecord}
                        size="icon-rounded" variant="secondary" className="hover:bg-muted-foreground/10">
                        <MicIcon />
                    </Button>
                )
            }
        </div>
    )
}
