import {Badge} from "@/components/ui/badge.tsx";
import cc from "contrast-color";

interface TicketCardProps {
    label: string;
    color: string;
}

export function TicketTag(props: TicketCardProps) {

    const textColor = cc.contrastColor({ bgColor: props.color });

    return (
        <Badge variant="small" className="rounded-sm" style={{color: textColor, backgroundColor: props.color}}>
            <small className="uppercase leading-3 scale-95">{props.label}</small>
        </Badge>
    )
}
