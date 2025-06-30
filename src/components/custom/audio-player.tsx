import {useRef, useState, useEffect, type ChangeEvent} from 'react';
import { cn } from '@/lib/utils';
import {PauseIcon, PlayIcon} from "@phosphor-icons/react";

interface AudioPlayerProps {
    src: string;
    className?: string;
}

export function AudioPlayer(props: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [rate, setRate] = useState<string>("1");

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleProgress = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
        setCurrentTime(value);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const formatTime = (time: number) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const togglePlaybackRate = () => {
        if (!audioRef.current) return;

        const rates = [1, 1.5, 2];
        const currentRate = audioRef.current.playbackRate;

        const nextIndex = rates.indexOf(currentRate) + 1;
        const newRate = nextIndex >= rates.length ? rates[0] : rates[nextIndex];

        audioRef.current.playbackRate = newRate;

        // Se quiser apenas mostrar a taxa atual no estado:
        setRate(newRate.toString());
    };

    return (
        <div className={cn(
            "shadow-sm rounded-lg pl-3 pr-4 h-16 flex items-center gap-3 max-w-76 w-full select-none",
            props.className,
        )}>
            <audio ref={audioRef} src={props.src} preload="metadata" />



            <button
                onClick={togglePlay}
                className="focus:outline-none cursor-pointer"
            >
                {isPlaying ? <PauseIcon weight="fill" size={20} /> : <PlayIcon weight="fill" size={20}/>}
            </button>

            <span className="text-xs min-w-6">{formatTime(currentTime)}</span>

            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgress}
                className="accent-white h-1 w-full mx-1 outline-0"
            />

            <span className="text-xs min-w-6">{formatTime(duration)}</span>

            {
                isPlaying && (
                    <div
                        onClick={togglePlaybackRate}
                        className="cursor-pointer min-w-10 size-7 bg-foreground/15 flex items-center justify-center rounded-full select-none">
                        <span className="text-xs uppercase font-bold scale-80">{rate}x</span>
                    </div>
                )
            }

        </div>
    );
}
