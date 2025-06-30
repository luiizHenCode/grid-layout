import {cn} from "@/lib/utils.ts";
import {PlayIcon} from "@phosphor-icons/react";

interface MessageVideoProps {
    side: 'left' | 'right';
}

export function MessageVideo(props: MessageVideoProps) {
    return (
        <div
            data-side={props.side}
            className="flex flex-col gap-1 data-[side=right]:items-end data-[side=left]:items-start">
            <div
                data-side={props.side}
                className={cn(
                    "p-1 rounded-xl w-fit relative flex items-center justify-center cursor-pointer",
                    "data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white"
                )}>

                <video className="max-h-80 rounded-lg">
                    <source src="https://www.w3schools.com/html/movie.mp4"/>
                </video>

                <div className="size-12 flex items-center justify-center absolute bg-white rounded-full">
                    <PlayIcon weight="fill" className="size-6 fill-black" />
                </div>
            </div>

            <div
                data-side={props.side}
                className={
                    cn("p-3 rounded-lg text-sm shadow-sm",
                        "data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white"
                    )}
            >
                Oi, tudo bem? Esse é o caption.
            </div>
        </div>
    )
}
