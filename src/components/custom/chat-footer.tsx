import {Button} from "@/components/ui/button.tsx";
import { MicIcon, Plus, Smile} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useRef, useState, type ChangeEvent} from "react";
import {
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
import {OverlayFilesPreview} from "@/pages/home/overlay-files-preview.tsx";

export interface FilesForm {
    file: File;
    caption: string;
}

export function ChatFooter() {

    const {toggleShowRecord, showRecord} = useChatActions();
    const inputFileRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState<string>("");
    const {value, setValue} = useBoolean(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleSendMessage = () => {
        if (message.trim() === "") return; // Prevent sending empty messages
        // Here you would typically handle sending the message, e.g., via an API call
        console.log("Sending message:", message);
        setMessage(""); // Clear the input after sending
    }

    const handleFileSelection = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click(); // Trigger the file input click
        }
    }

    const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const getFiles = event.target.files;
        if (getFiles && getFiles.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...getFiles]);
        }

    }

    const onCloseFilesPreview = () => {
        setFiles([]); // Clear files when closing the preview
    }

    const handleSendFiles = (files: FilesForm[]) => {
        onCloseFilesPreview();
        alert(`Sending message... ${files.map(file => file.file.name).join(", ")}`);
    }


    return (
        <div
            data-hidden={showRecord}
            className="min-h-16 bg-side-content flex items-end p-4 gap-2 data-[hidden=true]:hidden">

            <input ref={inputFileRef} className="hidden" type="file" multiple onChange={handleFilesChange} />
            <DropdownMenu open={value} onOpenChange={setValue}>
                <DropdownMenuTrigger asChild>
                    <Button size="icon-rounded" variant="secondary" className="hover:bg-muted-foreground/10">
                        <Plus
                            data-open={value}
                            className="data-[open=true]:rotate-45 transition-all"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" sideOffset={8} className="w-52" align="start">
                    <DropdownMenuItem onClick={handleFileSelection}>
                        Selecionar arquivo
                        <DropdownMenuShortcut>
                            <FileIcon className="size-4" />
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

            {
                files.length && (
                    <OverlayFilesPreview
                        files={files}
                        onClose={onCloseFilesPreview}
                        onAddFiles={handleFileSelection}
                        onSendFiles={handleSendFiles}
                    />
                )
            }

        </div>
    )
}
