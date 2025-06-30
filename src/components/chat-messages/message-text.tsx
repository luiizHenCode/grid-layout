import { cn } from "@/lib/utils";

interface MessageTextProps {
    side: 'left' | 'right';
}

export function MessageText(props: MessageTextProps) {
    return (
        <div
            data-side={props.side}
            className={
            cn("p-3 rounded-lg text-sm shadow-sm",
                "data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white"
            )}
        >
            Oi, tudo bem? Como posso ajudar você hoje? Tenho algumas informações que podem ser úteis para você. Se precisar de algo mais, é só me avisar!
        </div>
    )
}
