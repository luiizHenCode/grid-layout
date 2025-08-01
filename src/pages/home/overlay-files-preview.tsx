import {Button} from "@/components/ui/button.tsx";
import {PaperPlaneRightIcon, PlayCircleIcon, PlusSquareIcon, TrashIcon, XIcon} from "@phosphor-icons/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {fakerPT_BR} from "@faker-js/faker";
import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction} from "react";
import {Input} from "@/components/ui/input.tsx";
import {SmileIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import documentIcon from "@/assets/file.svg";
import type { FileForm } from "@/components/custom/chat-footer";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";



interface OverlayFilesPreviewProps {
    formFiles: FileForm[];
    setFormFiles:  Dispatch<SetStateAction<FileForm[]>>
    onClose: () => void;
    onAddFiles: () => void;
    onSendFiles: (files: FileForm[]) => void;
}

export function OverlayFilesPreview(props: OverlayFilesPreviewProps) {
    const { formFiles, setFormFiles, onClose } = props;

    const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
    const [caption, setCaption] = useState<string>("");
    const refScrollArea = useRef<HTMLDivElement>(null);


    const fakeImage = fakerPT_BR.image.avatar();

    const onChangeCaption = (index: number, caption: string) => {
        setFormFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index].caption = caption;
            return updatedFiles;
        });
    }

    const onSetCurrentFileIndex = (index: number) => {
        if (index < 0 || index >= formFiles.length) {
            return; // Prevent setting an invalid index
        }
        setCurrentFileIndex(index);
        setCaption(formFiles[index].caption); // Update caption when changing file
    }

    const getExtension = (file: File) => {
        const parts = file.name.split('.');
        return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
    }

    const getFileSize = (file: File) => {
        const sizeInBytes = file.size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        const sizeInMB = (Number(sizeInKB) / 1024).toFixed(2);

        return Number(sizeInMB) > 1 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
    }

    const fileUrls = useMemo(() => {
        return formFiles.map(f => URL.createObjectURL(f.file) as string);
    }, [formFiles]);

    const renderFilePreview = (file: FileForm) => {
        const fileUrl = file.fileUrl
        const fileType = file.file.type.split('/')[0]; // Get the type (e.g., 'image', 'video', etc.)
        const fileName = file.file.name;

        switch (fileType) {
            case 'image':
                return <img src={fileUrl} alt={fileName} className="max-h-[80%] object-contain max-w-[90%]" />;
            case 'video':
                return <video src={fileUrl} controls className="w-full max-w-[90%] max-h-100 h-auto" />;
            case 'audio':
                return <audio src={fileUrl} controls className="w-full" />;
            default:
                return (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center relative">
                            <img src={documentIcon} alt="Documento" className="object-contain h-32"/>
                            <span className="text-lg uppercase font-bold text-black/50 absolute -mb-4">{getExtension(file.file)}</span>
                        </div>
                        <span className="text-md">{fileName}</span>
                        <small className="text-muted-foreground">{getFileSize(file.file)}</small>
                    </div>
                )
        }
    }

    const renderMinifiedFilePreview = (file: FileForm) => {
        const fileUrl = file.fileUrl
        const fileType = file.file.type.split('/')[0]; // Get the type (e.g., 'image', 'video', etc.)
        const fileName = file.file.name;

        switch (fileType) {
            case 'image':
                return <img src={fileUrl} alt={fileName} className="w-full h-full object-cover" />;
            case 'video':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <video src={fileUrl} className="w-full h-full object-cover" />
                        <PlayCircleIcon weight="fill" className="size-6 absolute"/>
                    </div>
                );
            case 'audio':
                return <span>Audio</span>;
            default:
                return (
                    <div className="flex items-center justify-center relative scale-70">
                        <img src={documentIcon} alt="Documento" className="object-contain"/>
                        <span className="text-xs uppercase font-bold text-black/50 absolute bottom-3 scale-80">{getExtension(file.file)}</span>
                    </div>
                )
        }
    };

    const onRemoveFile = (index: number) => {
        setFormFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });

        if (formFiles.length === 1) {
           return onClose(); // Close the overlay if no files are left
        }

        const newIndex = index > 0 ? index - 1 : 0
        setCurrentFileIndex(newIndex);
        setCaption(formFiles[newIndex].caption);
    }


    useEffect(() => {
        return () => {
            fileUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [fileUrls]);

    return (
        <div className="fixed inset-0 bg-background/70 backdrop-blur-lg z-50 flex items-center justify-center select-none">
            <div className="flex flex-col h-dvh w-full justify-center items-center">
                <div className="absolute flex items-center justify-center top-0 left-0 right-0 h-20">
                    <Button variant="ghost"
                            onClick={onClose} size="icon"
                            className="size-10 bg-secondary backdrop-blur-xs absolute left-4 shadow-sm">
                        <XIcon className="size-4" />
                    </Button>

                    <div className="h-10 px-3 flex items-center bg-secondary rounded-md gap-3 shadow-sm">
                        <Avatar className="size-6">
                            <AvatarImage src={fakeImage} />
                            <AvatarFallback>LH</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                            Luiz Henrique
                        </span>
                    </div>
                </div>
                {
                    formFiles.length > 0 && formFiles[currentFileIndex] && (
                        <div className="flex items-center justify-center">
                            {renderFilePreview(formFiles[currentFileIndex])}
                        </div>
                    )
                }
                <div className="absolute bottom-10 md:bottom-20 left-0 right-0 flex flex-col items-center gap-2">
                    <ScrollArea viewportRef={refScrollArea} className="w-full h-16 overflow-x-auto">
                        <div className="flex items-center gap-1 flex-nowrap px-4 justify-center">
                            {formFiles.map((item, index) => {
                                const isCurrent = currentFileIndex === index;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => isCurrent ? onRemoveFile(index) : onSetCurrentFileIndex(index)}
                                        className={
                                            cn(
                                                'size-13 min-w-13 bg-muted-foreground/50 rounded-md overflow-clip',
                                                'border-2 border-transparent flex justify-center items-center relative',
                                                isCurrent && 'bg-muted-foreground/20',
                                                isCurrent && 'border-white'
                                            )
                                        }
                                    >
                                        {renderMinifiedFilePreview(item)}
                                        {
                                            isCurrent && (
                                                <div className="absolute bg-black/50 flex items-center justify-center size-13">
                                                    <TrashIcon weight="bold" className="size-7 text-white" />
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                    <div className="w-full flex items-center justify-center px-4">
                    <div className="flex gap-2 max-w-sm w-full">
                        <div className="w-full relative flex items-center">
                            <Button onClick={props.onAddFiles} variant="ghost" size="icon-rounded" className="absolute left-1">
                                <PlusSquareIcon className="size-4" />
                            </Button>
                            <Input
                                value={caption}
                                onChange={(event) => setCaption(event.target.value)}
                                onBlur={(e) => onChangeCaption(currentFileIndex, e.target.value)}
                                className="rounded-full px-10 dark:bg-background bg-background h-11"
                                placeholder="Adicione uma legenda..."/>
                            <Button variant="ghost" size="icon-rounded" className="absolute right-1">
                                <SmileIcon className="size-4" />
                            </Button>
                        </div>
                        <Button
                            onClick={() => props.onSendFiles(formFiles)}
                            variant="default" size="icon-rounded" className="size-11">
                            <PaperPlaneRightIcon weight="fill" className="size-4 text-white" />
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
