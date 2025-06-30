import {useMemo} from "react";
import {AudioPlayer} from "@/components/custom/audio-player.tsx";

interface MessageAudioProps {
    side: 'left' | 'right';
}

export function MessageAudio(props: MessageAudioProps) {


    const className = useMemo(() => {
        switch (props.side) {
            case 'left':
                return 'bg-secondary text-foreground';
            case 'right':
                return 'bg-primary text-white';
            default:
                return '';
        }
    }, [props.side])

    return (
        <AudioPlayer
            className={className}
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"/>
    )

}
