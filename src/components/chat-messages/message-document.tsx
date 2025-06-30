import {cn} from "@/lib/utils.ts";

import documentIcon from "@/assets/file.svg";
import {ArrowDownIcon} from "@phosphor-icons/react";

interface MessageDocumentProps {
    side: 'left' | 'right';
}

export function MessageDocument(props: MessageDocumentProps) {
    return (
        <div
            data-side={props.side}
            className="flex flex-col gap-1 data-[side=right]:items-end data-[side=left]:items-start">
            <div
                data-side={props.side}
                className="p-1 rounded-xl data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white w-fit">
               <div className="bg-black/20 rounded-lg p-2 pr-4 flex items-center gap-2 h-14 w-64">
                   <div className="flex items-center justify-center relative scale-70">
                       <img src={documentIcon} alt="Documento" className="object-contain"/>
                       <span className="text-xs uppercase font-bold text-black/50 absolute bottom-3 scale-80">pdf</span>
                   </div>
                   <div className="flex flex-col flex-1">
                       <span className="text-sm line-clamp-1">nome-do-arquivo.pdf</span>
                       <small className="text-xs text-current/50 uppercase">pdf • 1.3mb</small>
                   </div>
                   <div className="bg-current/15 size-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-current/25">
                       <ArrowDownIcon className="size-4" />
                   </div>
               </div>
            </div>

            <div
                // hidden
                data-side={props.side}
                className={
                    cn("p-3 rounded-lg text-sm shadow-sm",
                        "data-[side=left]:bg-secondary data-[side=right]:bg-primary data-[side=right]:text-white"
                    )}
            >
                Caption do documento para finalidade de teste.
            </div>
        </div>
    )
}
