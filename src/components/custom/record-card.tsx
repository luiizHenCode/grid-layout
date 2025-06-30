import {CircleIcon, PauseIcon, StopIcon} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button.tsx";
import {useChatActions} from "@/hooks/use-chat-actions.ts";

export function RecordCard() {

    const {toggleShowRecord} = useChatActions();


    return (
        <div className="absolute left-0 right-0 bottom-0 p-4 z-10 flex justify-center bg-gradient-to-t from-[var(--chat)] to-75% to-transparent">

        <div className="w-72 rounded-xl bg-secondary p-4 bottom-6  flex flex-col border shadow-md overflow-clip">
            <div className="flex justify-between items-center relative">
                <div className="flex items-center gap-2">
                    <CircleIcon weight="fill" className="fill-red-500 size-6 animate-pulse"/>

                    <div className="flex flex-col">
                        <small className="text-xs">Gravando...</small>
                        <span className="text-base">00:00:00</span>
                    </div>
                </div>

                <CircleIcon weight="fill" className="fill-red-500 size-6 absolute left-0 animate-ping delay-100 scale-400 -z-1 opacity-20"/>



                <div className="flex items-center gap-2">
                    <Button
                        onClick={toggleShowRecord}
                        variant="ghost" size="icon" className="hover:bg-muted-foreground/10 dark:hover:bg-muted-background/10">
                        <StopIcon weight="fill"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-muted-foreground/10 dark:hover:bg-muted-background/10">
                        <PauseIcon weight="fill"/>
                    </Button>
                </div>
            </div>
        </div>
        </div>

    )
}
