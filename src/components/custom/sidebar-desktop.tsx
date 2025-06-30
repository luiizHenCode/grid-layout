import {Button} from "@/components/ui/button";
import {Clock, MessagesSquare, Moon, Settings, Sun} from "lucide-react";
import {useTheme} from "@/components/theme-provider";
import {NavLink} from "react-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export function SidebarDesktop() {

    const {setTheme, theme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const isDarkTheme = theme === "dark";

    const menuTop = [
        {
            label: 'Minhas conversas',
            icon: MessagesSquare,
            to: '/minhas-conversas',
        },
        {
            label: 'Aguardando atendimento',
            icon: Clock,
            to: '/aguardando-atendimento',
        },
    ];

    const menuBottom = [
        {
            label: 'Configurações',
            icon: Settings,
            to: '/configuracoes',
        },

    ];

    return (
        <div className="hidden lg:flex flex-col border-r items-center py-4 justify-between bg-secondary/95">
            <div className="flex flex-col gap-2">
                {
                    menuTop.map((item, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <NavLink to={{pathname: item.to}}>
                                    {
                                        ({isActive}) => (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                data-active={isActive}
                                                className={
                                                    cn(
                                                        "size-10 hover:bg-foreground/5 dark:hover:bg-foreground/5",
                                                        "data-[active=true]:bg-primary data-[active=true]:text-white"
                                                    )}>
                                                <item.icon className="size-4"/>
                                            </Button>
                                        )
                                    }
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent showArrow side="right" className="bg-primary text-sm text-white">{item.label}</TooltipContent>
                        </Tooltip>
                    ))
                }
            </div>

            <div className="flex flex-col gap-2">
                {
                    menuBottom.map((item, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <NavLink to={{pathname: item.to}}>
                                    {
                                        ({isActive}) => (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                data-active={isActive}
                                                className={
                                                    cn(
                                                        "size-10 hover:bg-foreground/5 dark:hover:bg-foreground/5",
                                                        "data-[active=true]:bg-primary data-[active=true]:text-white"
                                                    )}>
                                                <item.icon className="size-4"/>
                                            </Button>
                                        )
                                    }
                                </NavLink>
                            </TooltipTrigger>
                            <TooltipContent showArrow side="right" className="bg-primary text-sm text-white">{item.label}</TooltipContent>
                        </Tooltip>
                    ))
                }

                <Button
                    onClick={toggleTheme}
                    size="icon"
                    variant="ghost"
                    className="size-10 hover:bg-primary/10">
                    {
                        isDarkTheme ? (
                            <Moon className="size-4" />
                        ) : (
                            <Sun className="size-4" />
                        )
                    }
                </Button>

                <Button size="icon" variant="ghost" className="size-10 hover:bg-primary/10">
                    <Avatar className="size-6 bg-primary">
                        <AvatarImage />
                        <AvatarFallback className="bg-primary text-white">
                            <span className="text-xs scale-75 font-bold">LH</span>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </div>
        </div>
    )
}
