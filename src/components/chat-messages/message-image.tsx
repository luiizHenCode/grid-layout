import {cn} from "@/lib/utils.ts";

interface MessageImageProps {
    side: 'left' | 'right';
}

export function MessageImage(props: MessageImageProps) {
    return (
        <div
            data-side={props.side}
            className="flex flex-col gap-1 data-[side=right]:items-end data-[side=left]:items-start">
            <div
                data-side={props.side}
                className="p-1 rounded-xl data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white w-fit">
                <img
                    src="https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg"
                    alt="Imagem do usuário"
                    className="max-h-80 rounded-lg"
                />
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
